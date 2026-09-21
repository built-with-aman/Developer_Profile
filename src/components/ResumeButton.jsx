import { Download } from "lucide-react";
import Magnetic from "@/components/Magnetic";

/**
 * "Download Résumé" CTA. Points at /public/resume.pdf — drop a new file at
 * that path (same name) any time the résumé is updated; nothing else needs
 * to change.
 */
export default function ResumeButton({ variant = "outline", className = "", testid = "resume-download" }) {
  const filled = variant === "filled";
  return (
    <Magnetic>
      <a
        href="/resume.pdf"
        download="Aman-Soni-Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        data-testid={testid}
        data-cursor="GET"
        className={
          "group inline-flex items-center gap-2.5 border px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 " +
          (filled
            ? "border-acc bg-acc text-onacc hover:bg-transparent hover:text-acc"
            : "border-lin text-ink hover:border-acc hover:text-acc") +
          " " +
          className
        }
      >
        Download Résumé
        <Download size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
      </a>
    </Magnetic>
  );
}
