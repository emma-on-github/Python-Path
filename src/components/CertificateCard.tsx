import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Award, Download, Loader2, ShieldCheck } from "lucide-react";
import { downloadCertificatePdf } from "../lib/certificate";

interface CertificateCardProps {
  ukDate: string;
  credentialId: string;
  onBackToChallenges: () => void;
}

const CORE_SKILLS = [
  "Print Output & Variables",
  "Strings",
  "Lists & Indexing",
  "len()",
  "if / else Conditionals",
  "for Loops & Filtering",
  "Dictionaries",
  "Functions",
];

interface CertificateCanvasProps {
  learnerName: string;
  ukDate: string;
  credentialId: string;
}

function CertificateCanvas({
  learnerName,
  ukDate,
  credentialId,
}: CertificateCanvasProps) {
  const displayName = learnerName.trim() || "Your Full Name";
  const isPlaceholder = learnerName.trim().length === 0;

  return (
    <div
      style={{
        width: "990px",
        height: "700px",
        backgroundColor: "#fcfbf7",
        color: "#0f172a",
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        position: "relative",
      }}
    >
      {/* Thick Deep-Navy Outer Frame */}
      <div
        style={{
          width: "100%",
          height: "100%",
          border: "6px solid #1e3a8a",
          padding: "10px",
          boxSizing: "border-box",
          backgroundColor: "#fcfbf7",
        }}
      >
        {/* Thin Metallic-Gold Inner Frame */}
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "1.5px solid #d97706",
            padding: "40px 54px 36px 54px",
            boxSizing: "border-box",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Top-Right Gold-and-Navy Circular Seal */}
          <div
            style={{
              position: "absolute",
              top: "28px",
              right: "34px",
              width: "106px",
              height: "106px",
              borderRadius: "9999px",
              border: "3px solid #d97706",
              backgroundColor: "#1e3a8a",
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
                border: "1px solid #fbbf24",
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
                  color: "#fde68a",
                  lineHeight: 1.25,
                }}
              >
                VERIFIED •
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: "#ffffff",
                  marginTop: "2px",
                  lineHeight: 1.2,
                }}
              >
                10/10 PASSED
              </span>
            </div>
          </div>

          {/* Header Section */}
          <div style={{ textAlign: "center", paddingRight: "48px", paddingLeft: "48px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#1e3a8a",
                margin: 0,
              }}
            >
              Python Path · Python Foundations Assessment
            </p>

            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                fontSize: "44px",
                fontWeight: 700,
                color: "#0f172a",
                margin: "12px 0 0 0",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Certificate of Achievement
            </h3>

            <p
              style={{
                fontSize: "14px",
                color: "#475569",
                margin: "18px 0 0 0",
                fontWeight: 500,
              }}
            >
              This credential is proudly presented to
            </p>
          </div>

          {/* Recipient Name & Gold Divider Rule */}
          <div style={{ textAlign: "center", margin: "8px 0" }}>
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
                fontSize: "14px",
                lineHeight: 1.6,
                color: "#334155",
                maxWidth: "700px",
                margin: "18px auto 0 auto",
              }}
            >
              for successfully completing all 10 interactive challenges in the Python Foundations browser sandbox,
              demonstrating practical proficiency across the following core programming skills:
            </p>

            {/* Core Skills Summary */}
            <div
              style={{
                marginTop: "14px",
                padding: "12px 20px",
                borderTop: "1px solid #e2e8f0",
                borderBottom: "1px solid #e2e8f0",
                backgroundColor: "#f8f6f0",
                fontSize: "12.5px",
                fontWeight: 600,
                color: "#1e293b",
                lineHeight: 1.6,
              }}
            >
              {CORE_SKILLS.join("  •  ")}
            </div>
          </div>

          {/* Balanced Two-Column Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "40px",
              paddingTop: "12px",
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

            {/* Right Column: UK Date, Monospaced Credential ID & Zero-Storage Note */}
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
                    Issue Date (UK)
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
                    {ukDate}
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
                    Credential ID
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
                    {credentialId}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#047857",
                }}
              >
                Zero-Storage Privacy Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CertificateCard({
  ukDate,
  credentialId,
  onBackToChallenges,
}: CertificateCardProps) {
  const [learnerName, setLearnerName] = useState("");
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
    if (!learnerName.trim() || isExporting) return;

    setIsExporting(true);
    setExportError(null);
    try {
      await downloadCertificatePdf({
        learnerName: learnerName.trim(),
        ukDate,
        credentialId,
      });
      setDownloaded(true);
    } catch {
      setExportError("Could not generate the PDF certificate. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section aria-label="Completion Certificate" className="mx-auto max-w-5xl space-y-6">
      {/* Control & Privacy Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7">
        <div className="mb-5 flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700">
              <Award className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-emerald-700">
                10 of 10 Challenges Completed
              </p>
              <h2 className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900">
                Claim Your Certificate of Achievement
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onBackToChallenges}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Review Challenges</span>
          </button>
        </div>

        <div className="mb-5 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50/70 p-4 text-sm text-emerald-950">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
          <div>
            <p className="font-semibold text-emerald-900">UK GDPR Zero-Storage Privacy Notice</p>
            <p className="mt-0.5 text-xs leading-relaxed text-emerald-800">
              Your name stays strictly in local browser memory to render the live preview and export the PDF. Nothing is
              transmitted to or stored on any backend server.
            </p>
          </div>
        </div>

        <form onSubmit={handleDownloadPdf} className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="learner-name" className="mb-1.5 block text-sm font-medium text-slate-800">
              Full Name (updates live on your certificate below)
            </label>
            <input
              id="learner-name"
              type="text"
              value={learnerName}
              onChange={(e) => {
                setLearnerName(e.target.value);
                if (downloaded) setDownloaded(false);
                if (exportError) setExportError(null);
              }}
              placeholder="e.g., Jordan Taylor"
              maxLength={80}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600/20"
            />
          </div>

          <button
            type="submit"
            disabled={!learnerName.trim() || isExporting}
            className="inline-flex h-[46px] items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 whitespace-nowrap shrink-0"
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Download className="h-4 w-4" aria-hidden="true" />
            )}
            <span>{isExporting ? "Generating PDF..." : "Download PDF Certificate"}</span>
          </button>
        </form>

        {downloaded && (
          <p className="mt-3 text-xs font-medium text-emerald-700">
            High-resolution landscape PDF generated locally and saved to your downloads folder.
          </p>
        )}

        {exportError && (
          <p className="mt-3 text-xs font-medium text-red-700">{exportError}</p>
        )}
      </div>

      {/* Live Styled Landscape Certificate Preview */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">Live Certificate Preview</span>
          <span className="font-mono tabular-nums">
            {credentialId} · {ukDate}
          </span>
        </div>

        <div
          ref={previewContainerRef}
          className="w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
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
              learnerName={learnerName}
              ukDate={ukDate}
              credentialId={credentialId}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
