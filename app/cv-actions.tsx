"use client";

export function CvActions() {
  return (
    <nav className="cv-actions" aria-label="履歷操作">
      <a href="/dickson-lo-software-cv.pdf" download>
        下載 PDF
      </a>
      <button type="button" onClick={() => window.print()}>
        列印
      </button>
      <a
        href="https://www.linkedin.com/in/lo-chun-hin-dickson-094180141/"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a className="cv-actions__primary" href="mailto:dicksonlo901019@gmail.com">
        聯絡我
      </a>
    </nav>
  );
}
