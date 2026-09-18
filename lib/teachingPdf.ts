import PDFDocument from "pdfkit";
import type { CaseProfession } from "@/lib/caseStudyContent";
import type { CountryCode } from "@/lib/countryContext";
import type { TeachingContent } from "@/lib/tutorTeachingContent";

interface TeachingPdfMeta {
  profession: CaseProfession;
  category: string;
  jurisdiction?: CountryCode;
}

/**
 * Renders a teaching-content entry as a downloadable PDF: overview, each
 * concept (title, explanation, why it matters, example), connections, and
 * a numbered Sources section matching the "[N]" markers already inline in
 * the text (see lib/tutorTeachingContent.ts's TeachingSource). Uses
 * pdfkit's built-in Helvetica — no font files to bundle — since the layout
 * is plain running text, not anything that needs custom typography.
 */
export function generateTeachingPdf(teaching: TeachingContent, meta: TeachingPdfMeta): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 56, size: "A4", bufferPages: true });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const subtitle = [meta.profession, meta.jurisdiction?.toUpperCase()].filter(Boolean).join(" · ");

    doc.font("Helvetica-Bold").fontSize(20).text(meta.category);
    if (subtitle) doc.font("Helvetica").fontSize(11).fillColor("#555555").text(subtitle).fillColor("#000000");
    doc.moveDown(1);

    doc.font("Helvetica").fontSize(11).text(teaching.overview, { align: "left" });
    doc.moveDown(1.2);

    for (const concept of teaching.concepts) {
      doc.font("Helvetica-Bold").fontSize(13).text(concept.title);
      doc.moveDown(0.3);
      doc.font("Helvetica").fontSize(10.5).text(concept.explanation);
      doc.moveDown(0.3);
      doc.font("Helvetica-Bold").fontSize(10.5).text("Why it matters", { continued: false });
      doc.font("Helvetica").fontSize(10.5).text(concept.whyItMatters);
      doc.moveDown(0.3);
      doc.font("Helvetica-Bold").fontSize(10.5).text("Example", { continued: false });
      doc.font("Helvetica").fontSize(10.5).text(concept.example);
      doc.moveDown(1);
    }

    doc.font("Helvetica-Bold").fontSize(13).text("Putting it together");
    doc.moveDown(0.3);
    doc.font("Helvetica").fontSize(10.5).text(teaching.connections);

    if (teaching.sources?.length) {
      doc.moveDown(1.2);
      doc.font("Helvetica-Bold").fontSize(13).text("Sources");
      doc.moveDown(0.3);
      for (const source of teaching.sources) {
        const parts = [source.author, source.title + (source.year ? ` (${source.year})` : "")].filter(Boolean);
        const label = `[${source.id}] ${parts.join(" — ")}`;
        doc.font("Helvetica").fontSize(10).text(label, { link: source.url, underline: Boolean(source.url) });
        doc.moveDown(0.2);
      }
    }

    doc.end();
  });
}
