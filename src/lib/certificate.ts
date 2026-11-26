import { jsPDF } from "jspdf";
import { ExamBand } from "../data/examQuestions";

export interface CertificateData {
  recipientName: string;
  awardedLevel: ExamBand;
  completionDate: string;
  certificateId: string;
}

export function formatUkDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function generateCertificateId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const code = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `CERT-${code}`;
}

export function getCompetencyLines(level: ExamBand): [string, string] {
  switch (level) {
    case "Beginner":
      return [
        "Variables & Arithmetic  •  Strings & f-strings  •  Lists, Indexing & len()",
        "if / elif / else Conditionals  •  for Loops  •  Reusable Functions",
      ];
    case "Intermediate":
      return [
        "Beginner Foundations  •  List Comprehensions  •  Dictionaries & Sets",
        "try / except Error Handling  •  OOP Classes  •  JSON & collections",
      ];
    case "Advanced":
      return [
        "Beginner & Intermediate Foundations  •  Decorators  •  Generators (yield)",
        "Context Managers (with)  •  Custom Iterators & Dataclasses  •  Algorithms",
      ];
  }
}

export function getCompetencyParagraph(level: ExamBand): string {
  switch (level) {
    case "Beginner":
      return "for passing the Beginner Band of the Python Path Certification Exam, demonstrating solid command of core Python foundations:";
    case "Intermediate":
      return "for passing the Beginner and Intermediate Bands of the Python Path Certification Exam, demonstrating proficiency across:";
    case "Advanced":
      return "for passing all three tiers of the Python Path Certification Exam, demonstrating mastery across:";
  }
}

/**
 * Renders the executive certificate directly onto a 2x high-resolution HTML5 Canvas
 * (1980 x 1400 px) and embeds it into a single-page A4 landscape PDF via jsPDF.
 */
export async function downloadCertificatePdf({
  recipientName,
  awardedLevel,
  completionDate,
  certificateId,
}: CertificateData): Promise<void> {
  if ("fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Proceed with fallback fonts if FontFaceSet check fails
    }
  }

  const logicalW = 990;
  const logicalH = 700;
  const scale = 2;

  const canvas = document.createElement("canvas");
  canvas.width = logicalW * scale;
  canvas.height = logicalH * scale;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not create 2D drawing context for PDF export.");
  }

  ctx.scale(scale, scale);

  // 1. Crisp off-white parchment background (#fcfbf7)
  ctx.fillStyle = "#fcfbf7";
  ctx.fillRect(0, 0, logicalW, logicalH);

  // 2. Thick deep-navy outer frame (#1e3a8a)
  ctx.strokeStyle = "#1e3a8a";
  ctx.lineWidth = 6;
  ctx.strokeRect(23, 23, logicalW - 46, logicalH - 46);

  // 3. Thin metallic-gold inner frame (#d97706)
  ctx.strokeStyle = "#d97706";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(36, 36, logicalW - 72, logicalH - 72);

  // 4. Top-right gold-and-navy circular seal
  const sealX = 864;
  const sealY = 118;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 51, 0, Math.PI * 2);
  ctx.fillStyle = "#1e3a8a";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#d97706";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(sealX, sealY, 44, 0, Math.PI * 2);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#fbbf24";
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fde68a";
  ctx.font = "700 8.5px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText("VERIFIED •", sealX, sealY - 9);

  ctx.fillStyle = "#ffffff";
  ctx.font = "700 10.5px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText(`${awardedLevel.toUpperCase()}`, sealX, sealY + 8);

  // 5. Header Section
  const centerX = logicalW / 2;
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#1e3a8a";
  ctx.font = "700 14.5px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText(`PYTHON PATH — ${awardedLevel.toUpperCase()} PYTHON CERTIFICATE`, centerX, 102);

  ctx.fillStyle = "#0f172a";
  ctx.font = "700 44px 'Playfair Display', Georgia, 'Times New Roman', serif";
  ctx.fillText("Certificate of Completion", centerX, 160);

  ctx.fillStyle = "#475569";
  ctx.font = "500 14px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText("This certificate is proudly presented to", centerX, 200);

  // 6. Recipient Name & Gold Divider Rule
  const cleanName = recipientName.trim() || "Recipient";
  let nameFontSize = 42;
  ctx.font = `700 ${nameFontSize}px 'Playfair Display', Georgia, 'Times New Roman', serif`;
  while (ctx.measureText(cleanName).width > 740 && nameFontSize > 24) {
    nameFontSize -= 2;
    ctx.font = `700 ${nameFontSize}px 'Playfair Display', Georgia, 'Times New Roman', serif`;
  }
  ctx.fillStyle = "#1e3a8a";
  ctx.fillText(cleanName, centerX, 270);

  ctx.fillStyle = "#d97706";
  ctx.fillRect(centerX - 190, 288, 380, 2);

  // 7. Tailored Competency Summary & Skills Band
  ctx.fillStyle = "#334155";
  ctx.font = "400 13.5px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText(getCompetencyParagraph(awardedLevel), centerX, 336);

  const [line1, line2] = getCompetencyLines(awardedLevel);
  ctx.fillStyle = "#f8f6f0";
  ctx.fillRect(90, 366, logicalW - 180, 66);
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(90, 366);
  ctx.lineTo(logicalW - 90, 366);
  ctx.moveTo(90, 432);
  ctx.lineTo(logicalW - 90, 432);
  ctx.stroke();

  ctx.fillStyle = "#1e293b";
  ctx.font = "600 12.5px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText(line1, centerX, 394);
  ctx.fillText(line2, centerX, 415);

  // 8. Balanced Two-Column Footer + Verification Note
  ctx.textAlign = "left";
  ctx.fillStyle = "#1e3a8a";
  ctx.font = "italic 600 26px 'Playfair Display', Georgia, 'Times New Roman', serif";
  ctx.fillText("Emma Hicks", 90, 548);

  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(90, 558);
  ctx.lineTo(390, 558);
  ctx.stroke();

  ctx.fillStyle = "#334155";
  ctx.font = "600 12px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText("Lead Systems & Data Instructor", 90, 578);

  ctx.textAlign = "right";
  ctx.fillStyle = "#64748b";
  ctx.font = "700 10px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText("COMPLETION DATE", 730, 540);
  ctx.fillText("CERTIFICATE ID", 900, 540);

  ctx.fillStyle = "#0f172a";
  ctx.font = "700 14px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText(completionDate, 730, 562);

  ctx.fillStyle = "#1e3a8a";
  ctx.font = "600 14px 'JetBrains Mono', 'Courier New', monospace";
  ctx.fillText(certificateId, 900, 562);

  // Bottom Certificate Verification Footer Note
  ctx.textAlign = "center";
  ctx.fillStyle = "#475569";
  ctx.font = "600 11px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText("Verified Client-Side Execution  ·  Zero-Storage UK GDPR Compliant", centerX, 634);

  // Export single-page A4 landscape PDF
  const imgData = canvas.toDataURL("image/png", 1.0);
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = doc.internal.pageSize.getWidth();
  const pdfHeight = doc.internal.pageSize.getHeight();
  doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");

  const safeSlug =
    cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "learner";
  const filename = `python-path-${awardedLevel.toLowerCase()}-certificate-${safeSlug}.pdf`;

  const pdfBlob = doc.output("blob");
  const blobUrl = URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
}
