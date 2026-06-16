import { useEffect, useState } from "react";
import {
  scanTextAPI,
  scanFileAPI,
  getRulesAPI,
} from "../services/api";

export default function Scan() {
  const [mode, setMode] = useState("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [availableRules, setAvailableRules] = useState([]);
  const [selectedRuleIds, setSelectedRuleIds] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const fetchRules = async () => {
      const res = await getRulesAPI();
      setAvailableRules(res.data.filter(r => r.enabled));
    };
    fetchRules();
  }, []);

  const startScan = () => {
    if (mode === "text" && !text.trim()) return alert("Enter text");
    if (mode === "file" && !file) return alert("Upload file");
    setShowSidebar(true);
  };

  const executeScan = async () => {
    if (!selectedRuleIds.length) return alert("Select rules");

    setShowSidebar(false);
    setLoading(true);
    setResult(null);

    try {
      let res;
      if (mode === "text") {
        res = await scanTextAPI(text, selectedRuleIds);
      } else {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("ruleIds", JSON.stringify(selectedRuleIds));
        res = await scanFileAPI(formData);
      }
      setResult(res.data);
    } catch {
      alert("Scan failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          GDPR Guardian
        </h1>
        <p className="text-gray-500">
          Smart PII Detection & Redaction System
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border p-6">

        {/* TOGGLE */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMode("text")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              mode === "text"
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            ✍️ Text
          </button>
          <button
            onClick={() => setMode("file")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              mode === "file"
                ? "bg-purple-600 text-white shadow"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            📁 File
          </button>
        </div>

        {/* INPUT */}
        {mode === "text" ? (
          <textarea
            placeholder="Paste content to scan..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-48 border border-gray-200 rounded-lg p-4 focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <div className="border-2 border-dashed border-purple-300 rounded-xl p-10 text-center hover:border-purple-500 transition">
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="fileUpload" className="cursor-pointer">
              <div className="text-4xl mb-2">
                {file ? "✅" : "📤"}
              </div>
              <p className="text-gray-700 font-medium">
                {file ? file.name : "Click to upload file"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PDF, TXT, CSV supported
              </p>
            </label>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={startScan}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md hover:scale-[1.02] transition"
        >
          🚀 Scan Content
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center mt-8">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-2">Analyzing...</p>
        </div>
      )}

      {/* RESULT */}
    {/* RESULT */}
{result && !loading && (
  <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-lg border overflow-hidden">

    {/* HEADER */}
    <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">Scan Summary</h3>
        <p className="text-xs opacity-80">
          Analysis completed successfully
        </p>
      </div>

      <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
        result.violations.length > 0
          ? "bg-red-500/20 border border-red-300"
          : "bg-green-500/20 border border-green-300"
      }`}>
        {result.violations.length > 0
          ? `${result.violations.length} Issues Detected`
          : "No Issues Found"}
      </div>
    </div>

    {/* CONTENT */}
    <div className="p-6">

      {/* REDACTED OUTPUT */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-semibold text-gray-700">
            🔒 Secure Redacted Output
          </h4>

          <button
            onClick={() => navigator.clipboard.writeText(result.redactedText)}
            className="text-xs text-blue-600 font-medium hover:underline"
          >
            Copy
          </button>
        </div>

        <div className="bg-gray-900 text-green-400 p-5 rounded-xl text-sm font-mono leading-relaxed overflow-x-auto shadow-inner border border-gray-800">
          {result.redactedText}
        </div>
      </div>

      {/* EXTRA INFO (OPTIONAL BUT NICE) */}
      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-blue-600 font-medium">
            Total Violations
          </p>
          <p className="text-xl font-bold text-blue-700">
            {result.violations.length}
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-xs text-purple-600 font-medium">
            Data Status
          </p>
          <p className="text-sm font-semibold text-purple-700">
            {result.violations.length > 0
              ? "Sensitive Data Found"
              : "Safe Content"}
          </p>
        </div>

      </div>
    </div>
  </div>
)}

      {/* SIDEBAR */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl border-l transform transition ${
        showSidebar ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="p-6 flex flex-col h-full">

          {/* HEADER */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-800">Scan Policies</h2>
            <p className="text-xs text-gray-500">
              Choose rules to detect sensitive data
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => setSelectedRuleIds(availableRules.map(r => r.id))}
              className="text-xs text-blue-600 font-medium"
            >
              Select All
            </button>
            <button
              onClick={() => setSelectedRuleIds([])}
              className="text-xs text-red-500 font-medium"
            >
              Clear
            </button>
          </div>

          {/* RULE LIST */}
          <div className="flex-grow overflow-y-auto space-y-3 pr-2">
            {availableRules.map(rule => (
              <div
                key={rule.id}
                onClick={() => {
                  setSelectedRuleIds(prev =>
                    prev.includes(rule.id)
                      ? prev.filter(id => id !== rule.id)
                      : [...prev, rule.id]
                  );
                }}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  selectedRuleIds.includes(rule.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">
                    {rule.rule_name}
                  </span>
                  {selectedRuleIds.includes(rule.id) && (
                    <span className="text-blue-600">✔</span>
                  )}
                </div>

                <div className="mt-2 flex justify-between text-xs">
                  <span className="bg-gray-200 px-2 py-0.5 rounded">
                    {rule.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <button
            onClick={executeScan}
            className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-md"
          >
            Start Scan
          </button>
        </div>
      </div>
    </div>
  );
}