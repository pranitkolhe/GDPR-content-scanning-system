import { Link } from "react-router-dom";

export default function Home() {

  return (

  <div className="min-h-screen bg-gray-50">

    {/* HERO SECTION */}

    <div className="bg-gray-900 text-white py-20">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h1 className="text-4xl font-bold mb-4">
          GDPR Content Compliance Scanner
        </h1>

        <p className="text-lg text-gray-300 mb-8">
          Automatically detect sensitive personal information in documents,
          ensure compliance with GDPR regulations, and manage violations
          efficiently.
        </p>

        <div className="flex justify-center gap-4">

          <Link
            to="/scan"
            className="bg-blue-500 px-6 py-3 rounded text-white hover:bg-blue-600"
          >
            Start Scanning
          </Link>

          <Link
            to="/dashboard"
            className="bg-gray-700 px-6 py-3 rounded hover:bg-gray-600"
          >
            View Dashboard
          </Link>

        </div>

      </div>

    </div>


    {/* FEATURES */}

    <div className="max-w-6xl mx-auto px-6 py-16">

      <h2 className="text-2xl font-bold text-center mb-10">
        Platform Features
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-white shadow p-6 rounded">

          <h3 className="font-semibold text-lg mb-2">
            Automatic PII Detection
          </h3>

          <p className="text-gray-600">
            Detect sensitive data like emails, phone numbers, Aadhaar,
            credit cards, and other personal information automatically.
          </p>

        </div>


        <div className="bg-white shadow p-6 rounded">

          <h3 className="font-semibold text-lg mb-2">
            Rule Based Scanning
          </h3>

          <p className="text-gray-600">
            Configure custom regex rules to detect organization-specific
            sensitive information in documents.
          </p>

        </div>


        <div className="bg-white shadow p-6 rounded">

          <h3 className="font-semibold text-lg mb-2">
            Violation Management
          </h3>

          <p className="text-gray-600">
            Track violations, redact sensitive information, and manage
            compliance directly from the dashboard.
          </p>

        </div>

      </div>

    </div>


    {/* FOOTER */}

    <div className="bg-gray-900 text-gray-400 text-center py-6">

      <p>
        GDPR Scanner Platform • Built for Secure Data Compliance
      </p>

    </div>

  </div>

  );

}