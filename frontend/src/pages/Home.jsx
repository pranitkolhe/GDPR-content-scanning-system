import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><path d="M11 8v6M8 11h6" />
      </svg>
    ),
    tag: "Detection",
    title: "Automatic PII Detection",
    desc: "Detect emails, phone numbers, Aadhaar, credit cards, and other personal identifiers automatically across all your documents.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    tag: "Configuration",
    title: "Rule-Based Scanning",
    desc: "Configure custom regex rules to detect organisation-specific sensitive information and tailor compliance to your needs.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    tag: "Management",
    title: "Violation Management",
    desc: "Track violations, redact sensitive information, and manage full compliance workflows from a centralised dashboard.",
  },
];

export default function Home() {
  return (
    <div className="bg-white min-h-screen text-gray-900 overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-50 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36 px-4 sm:px-6 lg:px-8">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-100 rounded-full opacity-40 blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-violet-100 rounded-full opacity-30 blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center w-full">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 border border-violet-200 rounded-full text-xs font-medium tracking-wide px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 inline-block flex-shrink-0" />
            GDPR Article 25 Compliant
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-5 leading-tight">
            Protect{" "}
            <span className="italic text-violet-600 font-normal">Personal Data</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 max-w-xl mx-auto font-normal px-2 sm:px-0">
            Automatically detect sensitive personal information in documents,
            ensure compliance with GDPR regulations, and manage violations
            from one powerful dashboard.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-xs sm:max-w-none mx-auto">
            <Link
              to="/scan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-7 py-3 rounded-lg text-sm font-medium shadow-lg shadow-violet-200 hover:shadow-violet-300 transition-all duration-200 hover:-translate-y-0.5 no-underline"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              Start Scanning
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-7 py-3 rounded-lg text-sm font-medium border border-gray-300 hover:border-gray-400 shadow-sm transition-all duration-200 hover:-translate-y-0.5 no-underline"
            >
              View Dashboard
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>
      </section>

      {/* ── Features ── */}
      <section className="pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 px-4 sm:px-6 lg:px-8 bg-gray-50" id="features">
        <div className="max-w-5xl mx-auto">

          {/* Section header */}
          <div className="mb-10 sm:mb-14">
            <p className="text-xs font-medium tracking-widest uppercase text-violet-600 mb-3">
              Platform Capabilities
            </p>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-gray-900 mb-4 max-w-lg leading-snug">
              Everything you need for GDPR compliance
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed max-w-md font-normal">
              From automatic detection to violation tracking — built to handle real-world data compliance at scale.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="group bg-white rounded-xl border border-gray-200 p-5 sm:p-6 lg:p-7 hover:border-violet-200 hover:shadow-md hover:shadow-violet-50 transition-all duration-200 relative"
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-lg bg-violet-50 border border-violet-100 text-violet-600 flex items-center justify-center mb-5 flex-shrink-0">
                  {f.icon}
                </div>

                {/* Tag */}
                <p className="text-xs font-semibold tracking-widest uppercase text-purple-600 mb-2">
                  {f.tag}
                </p>

                {/* Title */}
                <h3 className="text-base font-semibold text-gray-900 mb-3 leading-snug">
                  {f.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-700 leading-relaxed font-normal pr-6">
                  {f.desc}
                </p>

                {/* Arrow */}
                <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 text-gray-300 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pt-14 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl px-6 py-14 sm:px-8 sm:py-16 lg:py-20 text-center overflow-hidden">

            {/* Glow decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-white opacity-10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-36 h-36 sm:w-48 sm:h-48 bg-purple-400 opacity-20 rounded-full blur-2xl pointer-events-none translate-x-1/4 translate-y-1/4" />

            <div className="relative">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-white mb-4">
                Ready to ensure compliance?
              </h2>
              <p className="text-violet-100 text-sm leading-relaxed max-w-sm mx-auto mb-8 font-normal px-2 sm:px-0">
                Upload your document and get a full GDPR compliance report in under a few seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-xs sm:max-w-none mx-auto">
                <Link
                  to="/scan"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-violet-700 hover:bg-violet-50 px-7 py-3 rounded-lg text-sm font-medium shadow-lg transition-all duration-200 hover:-translate-y-0.5 no-underline"
                >
                  Start Free Scan →
                </Link>
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 px-7 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 no-underline"
                >
                  Explore Dashboard
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row flex-wrap items-center sm:justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <span className="w-2 h-2 rounded-full bg-violet-500 inline-block flex-shrink-0" />
            GDPR Scanner Platform
          </div>
          <div className="flex gap-5 sm:gap-6">
            <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">Docs</a>
            <a href="#" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">Support</a>
          </div>
          <p className="text-xs text-gray-600">Built for Secure Data Compliance</p>
        </div>
      </footer>

    </div>
  );
}