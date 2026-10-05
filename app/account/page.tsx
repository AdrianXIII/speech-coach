import { PageHeader } from "@/components/PageHeader";
import { AccountSettings } from "@/components/AccountSettings";
import { requireSignedIn } from "@/lib/requireUser";
import { isPremium } from "@/lib/subscription";

const TITLE = {
  en: "Account",
  de: "Konto",
  fr: "Compte",
  es: "Cuenta",
  sv: "Konto",
};

const SUBTITLE = {
  en: "Manage your MasterSpeak account.",
  de: "Verwalte dein MasterSpeak-Konto.",
  fr: "Gérez votre compte MasterSpeak.",
  es: "Gestiona tu cuenta de MasterSpeak.",
  sv: "Hantera ditt MasterSpeak-konto.",
};

export default async function AccountPage() {
  const user = await requireSignedIn();
  const premium = await isPremium(user.id);

  return (
    <div className="min-h-screen bg-paper px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-md flex-col gap-8">
        <PageHeader title={TITLE} subtitle={SUBTITLE} />
        <AccountSettings email={user.email} premium={premium} />
      </div>
    </div>
  );
}
