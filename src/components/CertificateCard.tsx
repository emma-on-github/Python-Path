import React, { useEffect, useRef, useState } from "react";
import { Award, Download, Loader2, Printer } from "lucide-react";
import {
  CertificateAwardLevel,
  downloadCertificatePdf,
  getCertificateTitle,
  getCompetencyLines,
  getCompetencyParagraph,
} from "../lib/certificate";

interface CertificateCardProps {
  awardedLevel: CertificateAwardLevel;
  recipientName: string;
  onRecipientNameChange: (name: string) => void;
  completionDate: string;
  certificateId: string;
}

interface CertificateCanvasProps {
  recipientName: string;
  awardedLevel: CertificateAwardLevel;
  completionDate: string;
  certificateId: string;
}

function CertificateCanvas({
  recipientName,
  awardedLevel,
  completionDate,
  certificateId,
}: CertificateCanvasProps) {
  const displayName = recipientName.trim() || "Your Full Name";
  const isPlaceholder = recipientName.trim().length === 0;
  const [line1, line2] = getCompetencyLines(awardedLevel);
  const isComplete = awardedLevel === "Complete";

  return (
    <div
      style={{
        width: "990px",
        height: "700px",
        backgroundColor: isComplete ? "#fefcf5" : "#fcfbf7",
        color: "#0f172a",
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        position: "relative",
      }}
    >
      {/* Outer Frame */}
      <div
        style={{
          width: "100%",
          height: "100%",
          border: isComplete ? "6px solid #b45309" : "6px solid #1e3a8a",
          padding: "10px",
          boxSizing: "border-box",
          backgroundColor: isComplete ? "#fefcf5" : "#fcfbf7",
        }}
      >
        {/* Inner Frame */}
        <div
          style={{
            width: "100%",
            height: "100%",
            border: isComplete ? "2.5px solid #1e3a8a" : "1.5px solid #d97706",
            outline: isComplete ? "1px solid #f59e0b" : "none",
            outlineOffset: isComplete ? "-7px" : "0px",
            padding: "40px 54px 26px 54px",
            boxSizing: "border-box",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Top-Right Circular Seal */}
          <div
            style={{
              position: "absolute",
              top: "26px",
              right: "34px",
              width: "106px",
              height: "106px",
              borderRadius: "9999px",
              border: isComplete ? "3px solid #1e3a8a" : "3px solid #d97706",
              backgroundColor: isComplete ? "#b45309" : "#1e3a8a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "5px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "9999px",
                border: isComplete ? "1px solid #fef3c7" : "1px solid #fbbf24",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "4px",
                boxSizing: "border-box",
              }}
            >
              <span
                style={{
                  fontSize: "8.5px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: isComplete ? "#fef3c7" : "#fde68a",
                  lineHeight: 1.25,
                }}
              >
                {isComplete ? "ALL 3 TIERS" : "VERIFIED •"}
              </span>
              <span
                style={{
                  fontSize: "10.5px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: "#ffffff",
                  marginTop: "2px",
                  lineHeight: 1.2,
                  textTransform: "uppercase",
                }}
              >
                {awardedLevel}
              </span>
            </div>
          </div>

          {/* Header Section */}
          <div style={{ textAlign: "center", paddingRight: "88px", paddingLeft: "88px" }}>
            <div
              style={
                isComplete
                  ? {
                      display: "inline-block",
                      backgroundColor: "#fef3c7",
                      border: "1px solid #f59e0b",
                      padding: "8px 26px",
                      marginBottom: "2px",
                    }
                  : undefined
              }
            >
              <p
                style={{
                  fontSize: "14.5px",
                  fontWeight: 700,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: isComplete ? "#92400e" : "#1e3a8a",
                  margin: 0,
                }}
              >
                {getCertificateTitle(awardedLevel)}
              </p>
            </div>

            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                fontSize: "44px",
                fontWeight: 700,
                color: "#0f172a",
                margin: isComplete ? "10px 0 0 0" : "12px 0 0 0",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Certificate of Completion
            </h3>

            <p
              style={{
                fontSize: "14px",
                color: "#475569",
                margin: "18px 0 0 0",
                fontWeight: 500,
              }}
            >
              This certificate is proudly presented to
            </p>
          </div>

          {/* Recipient Name & Gold Divider Rule */}
          <div style={{ textAlign: "center", margin: "4px 0" }}>
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                fontSize: "42px",
                fontWeight: 700,
                color: isPlaceholder ? "#94a3b8" : "#1e3a8a",
                fontStyle: isPlaceholder ? "italic" : "normal",
                lineHeight: 1.2,
                paddingBottom: "10px",
                wordBreak: "break-word",
              }}
            >
              {displayName}
            </div>

            <div
              style={{
                width: "380px",
                height: "2px",
                backgroundColor: "#d97706",
                margin: "0 auto",
              }}
            />

            <p
              style={{
                fontSize: "13.5px",
                lineHeight: 1.55,
                color: "#334155",
                maxWidth: "740px",
                margin: "16px auto 0 auto",
              }}
            >
              {getCompetencyParagraph(awardedLevel)}
            </p>

            {/* Core Competency Summary */}
            <div
              style={{
                marginTop: "14px",
                padding: "12px 20px",
                borderTop: isComplete ? "1px solid #fde68a" : "1px solid #e2e8f0",
                borderBottom: isComplete ? "1px solid #fde68a" : "1px solid #e2e8f0",
                backgroundColor: isComplete ? "#fef9ec" : "#f8f6f0",
                fontSize: "12.5px",
                fontWeight: 600,
                color: "#1e293b",
                lineHeight: 1.65,
              }}
            >
              <div>{line1}</div>
              <div>{line2}</div>
            </div>
          </div>

          {/* Balanced Two-Column Footer + Verification Line */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "40px",
                paddingTop: "8px",
              }}
            >
              {/* Left Column: Digital Signature & Instructor Title */}
              <div style={{ width: "300px", textAlign: "left" }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: "26px",
                    color: "#1e3a8a",
                    lineHeight: 1.1,
                    paddingBottom: "6px",
                  }}
                >
                  Emma Hicks
                </div>
                <div
                  style={{
                    borderTop: "1px solid #94a3b8",
                    paddingTop: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#334155",
                  }}
                >
                  Lead Systems &amp; Data Instructor
                </div>
              </div>

              {/* Right Column: Completion Date & Certificate ID */}
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "28px",
                    alignItems: "baseline",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#64748b",
                      }}
                    >
                      Completion Date
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#0f172a",
                        marginTop: "2px",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {completionDate}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#64748b",
                      }}
                    >
                      Certificate ID
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#1e3a8a",
                        marginTop: "2px",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {certificateId}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "18px",
                textAlign: "center",
                fontSize: "11px",
                fontWeight: 600,
                color: "#475569",
              }}
            >
              Verified Client-Side Execution · Zero-Storage UK GDPR Compliant
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CertificateCard({
  awardedLevel,
  recipientName,
  onRecipientNameChange,
  completionDate,
  certificateId,
}: CertificateCardProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const [previewScale, setPreviewScale] = useState<number>(1);

  useEffect(() => {
    const el = previewContainerRef.current;
    if (!el) return;

    const updateScale = () => {
      const availableWidth = el.clientWidth;
      if (availableWidth > 0) {
        setPreviewScale(Math.min(1, availableWidth / 990));
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleDownloadPdf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || isExporting) return;

    setIsExporting(true);
    setExportError(null);
    try {
      await downloadCertificatePdf({
        recipientName: recipientName.trim(),
        awardedLevel,
        completionDate,
        certificateId,
      });
      setDownloaded(true);
    } catch {
      setExportError("Could not generate the PDF certificate. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section aria-label="On-Device Certificate" className="space-y-6">
      {/* Recipient Name & Actions */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 print:hidden">
        <div className="mb-4 flex items-start gap-3.5 border-b border-slate-200 pb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700">
            <Award className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-700">
              Certificate Unlocked · {awardedLevel === "Complete" ? "All 3 Tiers Completed" : `${awardedLevel} Level`}
            </p>
            <h3 className="mt-0.5 text-xl font-bold tracking-tight text-slate-900">
              {getCertificateTitle(awardedLevel)}
            </h3>
          </div>
        </div>

        <form onSubmit={handleDownloadPdf} className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="certificate-recipient-name" className="mb-1.5 block text-base font-medium text-slate-800">
              Recipient Name (updates live on your certificate below)
            </label>
            <input
              id="certificate-recipient-name"
              type="text"
              value={recipientName}
              onChange={(e) => {
                onRecipientNameChange(e.target.value);
                if (downloaded) setDownloaded(false);
                if (exportError) setExportError(null);
              }}
              placeholder="e.g., Jordan Taylor"
              maxLength={80}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => window.print()}
              disabled={!recipientName.trim()}
              className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              <span>Print</span>
            </button>

            <button
              type="submit"
              disabled={!recipientName.trim() || isExporting}
              className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 whitespace-nowrap shrink-0"
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Download className="h-4 w-4" aria-hidden="true" />
              )}
              <span>{isExporting ? "Generating PDF..." : "Download PDF Certificate"}</span>
            </button>
          </div>
        </form>

        {downloaded && (
          <p className="mt-3 text-sm font-medium text-emerald-700">
            Landscape PDF certificate generated locally and saved to your downloads folder.
          </p>
        )}

        {exportError && (
          <p className="mt-3 text-sm font-medium text-red-700">{exportError}</p>
        )}
      </div>

      {/* Live Styled Landscape Certificate Preview */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 print:border-0 print:p-0">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500 print:hidden">
          <span className="font-semibold text-slate-700">Live Certificate Preview</span>
          <span className="font-mono tabular-nums">
            {certificateId} · {completionDate}
          </span>
        </div>

        <div
          ref={previewContainerRef}
          className="w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 print:border-0 print:bg-white"
          style={{ height: `${Math.round(700 * previewScale)}px` }}
        >
          <div
            style={{
              width: "990px",
              height: "700px",
              transform: `scale(${previewScale})`,
              transformOrigin: "top left",
            }}
          >
            <CertificateCanvas
              recipientName={recipientName}
              awardedLevel={awardedLevel}
              completionDate={completionDate}
              certificateId={certificateId}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
