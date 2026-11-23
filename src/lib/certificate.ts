import { jsPDF } from "jspdf";

export interface CertificateMetadata {
  learnerName: string;
  ukDate: string;
  credentialId: string;
}

export function formatUkDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function generateCredentialId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const code = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `CERT-${code}`;
}

const CORE_SKILLS_LINE_1 =
  "Print Output & Variables  •  Strings  •  Lists & Indexing  •  len()";
const CORE_SKILLS_LINE_2 =
  "if / else Conditionals  •  for Loops & Filtering  •  Dictionaries  •  Functions";

/**
 * Renders the executive certificate directly on a 2x high-resolution HTML5 Canvas
 * (1980 x 1400 px) and embeds it into a single-page A4 landscape PDF via jsPDF.
 * Using native Canvas 2D avoids Tailwind v4 oklch() stylesheet parsing failures
 * in html2canvas while keeping the exported PDF visually identical to the live preview.
 */
export async function downloadCertificatePdf({
  learnerName,
  ukDate,
  credentialId,
}: CertificateMetadata): Promise<void> {
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
  ctx.font = "700 11px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText("10/10 PASSED", sealX, sealY + 8);

  // 5. Header Section
  const centerX = logicalW / 2;
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#1e3a8a";
  ctx.font = "700 11px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText("PYTHON PATH  ·  PYTHON FOUNDATIONS ASSESSMENT", centerX, 102);

  ctx.fillStyle = "#0f172a";
  ctx.font = "700 44px 'Playfair Display', Georgia, 'Times New Roman', serif";
  ctx.fillText("Certificate of Achievement", centerX, 160);

  ctx.fillStyle = "#475569";
  ctx.font = "500 14px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText("This credential is proudly presented to", centerX, 200);

  // 6. Recipient Name & Gold Divider Rule
  const cleanName = learnerName.trim() || "Learner";
  let nameFontSize = 42;
  ctx.font = `700 ${nameFontSize}px 'Playfair Display', Georgia, 'Times New Roman', serif`;
  while (ctx.measureText(cleanName).width > 740 && nameFontSize > 24) {
    nameFontSize -= 2;
    ctx.font = `700 ${nameFontSize}px 'Playfair Display', Georgia, 'Times New Roman', serif`;
  }
  ctx.fillStyle = "#1e3a8a";
  ctx.fillText(cleanName, centerX, 272);

  ctx.fillStyle = "#d97706";
  ctx.fillRect(centerX - 190, 290, 380, 2);

  // 7. Summary & Core Skills Band
  ctx.fillStyle = "#334155";
  ctx.font = "400 14px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText(
    "for successfully completing all 10 interactive challenges in the Python Foundations browser sandbox,",
    centerX,
    334
  );
  ctx.fillText(
    "demonstrating practical proficiency across the following core programming skills:",
    centerX,
    356
  );

  ctx.fillStyle = "#f8f6f0";
  ctx.fillRect(90, 382, logicalW - 180, 64);
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(90, 382);
  ctx.lineTo(logicalW - 90, 382);
  ctx.moveTo(90, 446);
  ctx.lineTo(logicalW - 90, 446);
  ctx.stroke();

  ctx.fillStyle = "#1e293b";
  ctx.font = "600 12.5px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText(CORE_SKILLS_LINE_1, centerX, 409);
  ctx.fillText(CORE_SKILLS_LINE_2, centerX, 430);

  // 8. Balanced Two-Column Footer
  // Left column: Signature + Lead Systems & Data Instructor
  ctx.textAlign = "left";
  ctx.fillStyle = "#1e3a8a";
  ctx.font = "italic 600 26px 'Playfair Display', Georgia, 'Times New Roman', serif";
  ctx.fillText("Emma Hicks", 90, 574);

  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(90, 584);
  ctx.lineTo(390, 584);
  ctx.stroke();

  ctx.fillStyle = "#334155";
  ctx.font = "600 12px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText("Lead Systems & Data Instructor", 90, 604);

  // Right column: UK Issue Date & Credential ID
  ctx.textAlign = "right";
  ctx.fillStyle = "#64748b";
  ctx.font = "700 10px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText("ISSUE DATE (UK)", 730, 566);
  ctx.fillText("CREDENTIAL ID", 900, 566);

  ctx.fillStyle = "#0f172a";
  ctx.font = "700 14px 'Plus Jakarta Sans', Helvetica, Arial, sans-serif";
  ctx.fillText(ukDate, 730, 588);

  ctx.fillStyle = "#1e3a8a";
  ctx.font = "600 14px 'JetBrains Mono', 'Courier New', monospace";
  ctx.fillText(credentialId, 900, 588);

  // Export single-page A4 landscape PDF
  const imgData = canvas.toDataURL("image/png", 1.0);
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = doc.internal.pageSize.getWidth(); // 297mm
  const pdfHeight = doc.internal.pageSize.getHeight(); // 210mm
  doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");

  const safeSlug =
    cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "learner";
  const filename = `python-foundations-certificate-${safeSlug}.pdf`;

  // Trigger reliable client-side download via Blob URL
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
