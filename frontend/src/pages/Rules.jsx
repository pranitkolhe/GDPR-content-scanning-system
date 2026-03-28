import { useEffect, useState } from "react";
import {
  getRulesAPI,
  searchRulesAPI,
  addRuleAPI,
  toggleRuleAPI,
  updateRuleAPI
} from "../services/api";

export default function Rules() {
  const [rules, setRules] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    rule_name: "",
    regex_pattern: "",
    severity: "",
    category: ""
  });

  const [selectedRule, setSelectedRule] = useState(null);

  useEffect(() => { loadRules(); }, []);

  const loadRules = async () => {
    try {
      setLoading(true);
      const res = await getRulesAPI();
      setRules(res.data);
    } catch (err) {
      console.error("LOAD RULES ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  const searchRules = async () => {
    try {
      if (!search) { loadRules(); return; }
      const res = await searchRulesAPI(search);
      setRules(res.data);
    } catch (err) {
      console.error("SEARCH ERROR", err);
    }
  };

  const addRule = async () => {
    try {
      if (!form.rule_name || !form.regex_pattern) {
        alert("Rule name and regex required");
        return;
      }
      await addRuleAPI({
        rule_name: form.rule_name,
        description: "",
        regex_pattern: form.regex_pattern,
        severity: form.severity || "MEDIUM",
        category: form.category || "General"
      });
      setForm({ rule_name: "", regex_pattern: "", severity: "", category: "" });
      loadRules();
    } catch (err) {
      console.error("ADD RULE ERROR", err);
    }
  };

  const saveEdit = async () => {
    try {
      if (!selectedRule.rule_name || !selectedRule.regex_pattern) {
        alert("Rule name and regex required");
        return;
      }
      await updateRuleAPI(selectedRule.id, selectedRule);
      setSelectedRule(null);
      loadRules();
    } catch (err) {
      console.error("UPDATE ERROR", err);
      alert("Failed to update rule");
    }
  };

  const toggleRule = async (id) => {
    try {
      await toggleRuleAPI(id);
      loadRules();
    } catch (err) {
      console.error("TOGGLE ERROR", err);
    }
  };

  const severityBadge = (severity) => {
    const map = {
      HIGH: "bg-red-100 text-red-600 border border-red-200",
      MEDIUM: "bg-yellow-100 text-yellow-600 border border-yellow-200",
      LOW: "bg-green-100 text-green-600 border border-green-200",
    };
    return map[severity?.toUpperCase()] || "bg-slate-100 text-slate-500 border border-slate-200";
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── PAGE HEADER ── */}
      <div className="bg-gradient-to-br from-white via-purple-50 to-violet-100 border-b border-purple-100 px-6 py-10 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-200 opacity-20 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(109,40,217,0.15) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="text-purple-600 font-semibold text-xs uppercase tracking-widest mb-2">
            Compliance Configuration
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Rules Management
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Configure and manage detection rules for scanning sensitive data.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* ── SEARCH BAR ── */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
          <p className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-3">
            Search Rules
          </p>
          <div className="flex gap-3">
            <input
              className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 p-2.5 rounded-xl w-80 text-sm text-slate-700 placeholder-slate-400 transition"
              placeholder="Search rule..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchRules()}
            />
            <button
              onClick={searchRules}
              title="Search"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all duration-200 shadow-md shadow-purple-200 flex items-center gap-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              Search
            </button>
            <button
              onClick={loadRules}
              title="Reset"
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center gap-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
              </svg>
              Reset
            </button>
          </div>
        </div>

        {/* ── ADD RULE FORM ── */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
          <p className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-4">
            Add New Rule
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <input
              className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 p-2.5 rounded-xl text-sm text-slate-700 placeholder-slate-400 transition"
              placeholder="Rule Name"
              value={form.rule_name}
              onChange={(e) => setForm({ ...form, rule_name: e.target.value })}
            />
            <input
              className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 p-2.5 rounded-xl text-sm text-slate-700 placeholder-slate-400 transition"
              placeholder="Regex Pattern"
              value={form.regex_pattern}
              onChange={(e) => setForm({ ...form, regex_pattern: e.target.value })}
            />
            <input
              className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 p-2.5 rounded-xl text-sm text-slate-700 placeholder-slate-400 transition"
              placeholder="Severity (HIGH/MEDIUM/LOW)"
              value={form.severity}
              onChange={(e) => setForm({ ...form, severity: e.target.value })}
            />
            <input
              className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 p-2.5 rounded-xl text-sm text-slate-700 placeholder-slate-400 transition"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
          <button
            onClick={addRule}
            className="mt-5 bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all duration-200 shadow-md shadow-purple-200 flex items-center gap-2"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" />
            </svg>
            Add Rule
          </button>
        </div>

        {/* ── RULES TABLE ── */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <p className="text-xs font-bold text-purple-500 uppercase tracking-widest">
              Active Rules
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="p-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                  <th className="p-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Rule</th>
                  <th className="p-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Severity</th>
                  <th className="p-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Enabled</th>
                  <th className="p-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-slate-400 text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Loading...
                      </div>
                    </td>
                  </tr>
                )}
                {!loading && rules.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-slate-400 text-sm">
                      No rules found
                    </td>
                  </tr>
                )}
                {!loading && rules.map((rule) => (
                  <tr key={rule.id} className="border-t border-slate-100 hover:bg-purple-50/40 transition-colors">
                    <td className="p-3 text-sm text-slate-400 font-mono">#{rule.id}</td>
                    <td className="p-3 text-sm font-semibold text-slate-800">{rule.rule_name}</td>
                    <td className="p-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${severityBadge(rule.severity)}`}>
                        {rule.severity}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${rule.enabled ? "bg-green-100 text-green-600 border border-green-200" : "bg-slate-100 text-slate-400 border border-slate-200"}`}>
                        {rule.enabled ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">

                        {/* Toggle button */}
                        <button
                          onClick={() => toggleRule(rule.id)}
                          title={rule.enabled ? "Disable Rule" : "Enable Rule"}
                          className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-lg transition-all duration-200 flex items-center justify-center"
                        >
                          {rule.enabled ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="1" y="5" width="22" height="14" rx="7" />
                              <circle cx="16" cy="12" r="3" fill="currentColor" />
                            </svg>
                          ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="1" y="5" width="22" height="14" rx="7" />
                              <circle cx="8" cy="12" r="3" fill="currentColor" />
                            </svg>
                          )}
                        </button>

                        {/* Edit button */}
                        <button
                          onClick={() => setSelectedRule(rule)}
                          title="Edit Rule"
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all duration-200 flex items-center justify-center"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ── EDIT MODAL ── */}
      {selectedRule && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-100 overflow-hidden">

            {/* Modal Header */}
            <div className="bg-gradient-to-br from-white via-purple-50 to-violet-100 px-6 py-5 border-b border-purple-100 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(rgba(109,40,217,0.15) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-purple-600 font-semibold text-xs uppercase tracking-widest mb-1">
                    Editing Rule #{selectedRule.id}
                  </p>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">
                    Edit Rule
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedRule(null)}
                  className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Rule Name
                </label>
                <input
                  className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 p-2.5 rounded-xl w-full text-sm text-slate-700 placeholder-slate-400 transition"
                  value={selectedRule.rule_name}
                  onChange={(e) => setSelectedRule({ ...selectedRule, rule_name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Regex Pattern
                </label>
                <textarea
                  className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 p-2.5 rounded-xl w-full text-sm text-slate-700 font-mono placeholder-slate-400 transition resize-none"
                  rows="3"
                  value={selectedRule.regex_pattern}
                  onChange={(e) => setSelectedRule({ ...selectedRule, regex_pattern: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Severity
                  </label>
                  <select
                    className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 p-2.5 rounded-xl w-full text-sm text-slate-700 transition"
                    value={selectedRule.severity}
                    onChange={(e) => setSelectedRule({ ...selectedRule, severity: e.target.value })}
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Category
                  </label>
                  <input
                    className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 p-2.5 rounded-xl w-full text-sm text-slate-700 placeholder-slate-400 transition"
                    value={selectedRule.category || ""}
                    onChange={(e) => setSelectedRule({ ...selectedRule, category: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button
                onClick={() => setSelectedRule(null)}
                className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl shadow-md shadow-purple-200 transition-all duration-200 flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}