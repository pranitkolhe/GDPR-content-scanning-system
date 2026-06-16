import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><path d="M11 8v6M8 11h6" />
      </svg>
    ),
    tag: "AI-Powered",
    title: "Automatic PII Detection",
    desc: "Detect emails, phone numbers, Aadhaar, credit cards, and other personal identifiers automatically across all your documents.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    tag: "Customizable",
    title: "Rule-Based Scanning",
    desc: "Configure custom regex rules to detect organisation-specific sensitive information and tailor compliance to your needs.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    tag: "Dashboard",
    title: "Violation Management",
    desc: "Track violations, redact sensitive information, and manage full compliance workflows from a centralised dashboard.",
  },
];

const STEPS = [
  { n: "01", title: "Upload Document", desc: "Upload any PDF, DOCX, or text file to begin scanning." },
  { n: "02", title: "Scan for PII", desc: "Our engine runs all active rules to detect sensitive data." },
  { n: "03", title: "Review Violations", desc: "See exactly what was flagged, where, and why." },
  { n: "04", title: "Redact & Export", desc: "Clean the document and export a GDPR-ready version." },
];

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen text-gray-900 overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-violet-100 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36 px-4 sm:px-6 lg:px-8">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(109,40,217,0.15) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        {/* Blobs */}
        <div className="absolute -top-20 -right-20 w-64 sm:w-96 h-64 sm:h-96 bg-purple-200 opacity-30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-52 sm:w-72 h-52 sm:h-72 bg-violet-300 opacity-20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center w-full">

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-5 leading-tight">
            Protect Your Data,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-500 to-purple-700">
              Stay Compliant
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto font-normal px-2 sm:px-0">
            Automatically detect sensitive personal information in documents,
            ensure compliance with GDPR regulations, and manage violations
            from one powerful dashboard.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-xs sm:max-w-none mx-auto">
            <Link
              to="/scan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-7 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-all duration-200 hover:-translate-y-0.5 no-underline"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              Start Scanning
              <span className="text-purple-200">→</span>
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-purple-50 text-purple-700 px-7 py-3 rounded-xl text-sm font-semibold border border-purple-200 hover:border-purple-400 shadow-sm transition-all duration-200 hover:-translate-y-0.5 no-underline"
            >
              View Dashboard
            </Link>
          </div>

        </div>
      </section>

      {/* ── Features ── */}
      <section className="pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 px-4 sm:px-6 lg:px-8 bg-slate-50" id="features">
        <div className="max-w-5xl mx-auto">

          <div className="mb-10 sm:mb-14 text-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-purple-600 mb-3">
              Platform Capabilities
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 mb-4 max-w-lg mx-auto leading-snug">
              Everything you need for GDPR compliance
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto font-normal">
              From automatic detection to violation tracking — built to handle real-world data compliance at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-slate-100 p-6 sm:p-7 hover:shadow-xl hover:shadow-purple-100 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-bl from-purple-50 to-transparent rounded-bl-3xl" />

                <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-4 flex-shrink-0 group-hover:bg-purple-100 transition-colors">
                  {f.icon}
                </div>

                <span className="text-xs font-bold text-purple-500 uppercase tracking-widest bg-purple-50 px-2.5 py-0.5 rounded-full">
                  {f.tag}
                </span>

                <h3 className="text-base font-bold text-slate-800 mt-3 mb-2 leading-snug">
                  {f.title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed font-normal pr-6">
                  {f.desc}
                </p>

                <div className="mt-5 text-purple-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <span>→</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-gradient-to-br from-purple-50 to-violet-100 py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-10 sm:mb-14">
            <p className="text-purple-600 font-semibold text-xs uppercase tracking-widest mb-3">
              Simple Workflow
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-12 sm:w-14 h-12 sm:h-14 mx-auto mb-3 sm:mb-4 bg-white border-2 border-purple-200 rounded-xl flex items-center justify-center text-purple-600 font-black text-sm sm:text-base shadow-sm group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all duration-300">
                  {step.n}
                </div>
                <h4 className="font-bold text-slate-800 mb-1 sm:mb-2 text-xs sm:text-sm">{step.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed hidden sm:block">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile descriptions */}
          <div className="grid grid-cols-2 gap-4 mt-6 sm:hidden">
            {STEPS.map((step, i) => (
              <p key={i} className="text-slate-500 text-xs leading-relaxed text-center">
                {step.desc}
              </p>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-slate-900 py-16 sm:py-20 px-4 sm:px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(167,139,250,0.3) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 sm:w-96 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-purple-500 opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-36 h-36 sm:w-48 sm:h-48 bg-purple-400 opacity-10 rounded-full blur-2xl pointer-events-none translate-x-1/4 translate-y-1/4" />

        <div className="relative z-10 max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight">
            Ready to ensure compliance?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mb-8 sm:mb-10 leading-relaxed">
            Upload your document and get a full GDPR compliance report in seconds. No setup required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-xs sm:max-w-none mx-auto">
            <Link
              to="/scan"
              className="w-full sm:w-auto inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl shadow-xl shadow-purple-900/40 hover:shadow-purple-800/60 transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base no-underline"
            >
              Get Started Free →
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/50 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 no-underline"
            >
              Explore Dashboard
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}