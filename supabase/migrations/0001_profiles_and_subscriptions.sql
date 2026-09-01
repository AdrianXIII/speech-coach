-- Speech Coach — premium entitlement schema.
-- Run this in the Supabase SQL editor (or via the CLI) on the new
-- speech-coach project. Not applied automatically — Claude Code has no
-- access to the Supabase dashboard/API keys.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  stripe_customer_id text unique,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  stripe_subscription_id text unique not null,
  stripe_customer_id text not null,
  status text not null,
  price_id text not null,
  current_period_end timestamptz not null,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;

-- Users can read/update their own profile row. No insert policy — rows are
-- created only by the handle_new_user() trigger below.
create policy "profiles: select own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id);

-- Subscriptions are read-only from the client. Only the Stripe webhook
-- (using the service-role key, which bypasses RLS entirely) ever writes
-- here — there is deliberately no insert/update/delete policy for regular
-- users, since letting a client mark itself "active" would be a direct
-- privilege-escalation path to free premium access.
create policy "subscriptions: select own" on public.subscriptions
  for select using (auth.uid() = user_id);

-- Auto-create a profiles row whenever a new auth user is created (e.g. on
-- first magic-link sign-in), so app code never has to check-then-insert.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
