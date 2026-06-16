import { useEffect, useState } from "react";
import { fetchScanHistoryAPI, API_URL } from "../services/api";

export default function AnalystViolations() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadError, setDownloadError] = useState(null);

  useEffect(() => {
    loadScans();
  }, []);

  const loadScans = async () => {
    try {
      setLoading(true);
      const res = await fetchScanHistoryAPI();
      setScans(res.data || []);
    } catch (err) {
      console.error("ANALYST VIOLATIONS LOAD ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (scan) => {
    const violationCount = Number(scan.violation_count || 0);
    const resolvedCount = Number(scan.resolved_count || 0);
    const isResolved = violationCount === 0 || violationCount === resolvedCount;
    const hasFile = Boolean(scan.file_name);

    if (!hasFile) {
      setDownloadError("This scan does not have a downloadable file.");
      return;
    }

    if (!isResolved) {
      setDownloadError("File can only be downloaded once all violations are resolved.");
      return;
    }

    setDownloadError(null);
    window.open(`${API_URL}/api/download/${scan.id}`, "_blank");
  };

  const getStatusBadge = (scan) => {
    const violationCount = Number(scan.violation_count || 0);
    const resolvedCount = Number(scan.resolved_count || 0);
    const complete = violationCount === 0 || violationCount === resolvedCount;

    return complete
      ? "bg-green-100 text-green-700 border border-green-200"
      : "bg-amber-100 text-amber-700 border border-amber-200";
  };

  return (
    <div className="min-h-screen bg-slate-50">
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
            Analyst Workflow
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Scanned Files & Resolution Status
          </h1>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">
            Review uploaded files, check violation counts, and download redacted files only after resolution.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <p className="text-sm text-slate-500 mb-2">Total Files Scanned</p>
            <h2 className="text-3xl font-black text-slate-900">{scans.length}</h2>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <p className="text-sm text-slate-500 mb-2">Files Fully Resolved</p>
            <h2 className="text-3xl font-black text-slate-900">
              {scans.filter((scan) => {
                const count = Number(scan.violation_count || 0);
                const resolved = Number(scan.resolved_count || 0);
                return count === 0 || count === resolved;
              }).length}
            </h2>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <p className="text-sm text-slate-500 mb-2">Files Pending Resolution</p>
            <h2 className="text-3xl font-black text-slate-900">
              {scans.filter((scan) => {
                const count = Number(scan.violation_count || 0);
                const resolved = Number(scan.resolved_count || 0);
                return count > 0 && resolved < count;
              }).length}
            </h2>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-1">
                Analyst File Summary
              </p>
              <p className="text-sm text-slate-500">
                You will see who uploaded each file, when it was uploaded, the number of detected violations, and whether it is ready for download.
              </p>
            </div>
            <button
              onClick={loadScans}
              className="inline-flex items-center justify-center rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-5 py-2.5 transition-all duration-200"
            >
              Refresh
            </button>
          </div>

          {downloadError && (
            <div className="px-6 py-4 text-sm text-red-700 bg-red-50 border-t border-red-100">
              {downloadError}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Scan ID</th>
                  <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">File Name</th>
                  <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Uploaded By</th>
                  <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Uploaded At</th>
                  <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Violations</th>
                  <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Resolved</th>
                  <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Download</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="8" className="p-6 text-center text-slate-400 text-sm">
                      Loading analyst violations...
                    </td>
                  </tr>
                )}

                {!loading && scans.length === 0 && (
                  <tr>
                    <td colSpan="8" className="p-6 text-center text-slate-400 text-sm">
                      No scanned files available.
                    </td>
                  </tr>
                )}

                {!loading && scans.map((scan) => {
                  const violationCount = Number(scan.violation_count || 0);
                  const resolvedCount = Number(scan.resolved_count || 0);
                  const isResolved = violationCount === 0 || violationCount === resolvedCount;

                  return (
                    <tr key={scan.id} className="border-t border-slate-100 hover:bg-purple-50/40 transition-colors">
                      <td className="p-4 text-sm font-semibold text-slate-800">#{scan.id}</td>
                      <td className="p-4 text-sm text-slate-500 break-words max-w-xs">{scan.file_name || "Text Scan"}</td>
                      <td className="p-4 text-sm text-slate-500">
                        {scan.uploader_name || scan.uploader_email || "Unknown"}
                      </td>
                      <td className="p-4 text-sm text-slate-500">
                        {scan.uploaded_at ? new Date(scan.uploaded_at).toLocaleString() : "-"}
                      </td>
                      <td className="p-4 text-sm text-slate-500">{violationCount}</td>
                      <td className="p-4 text-sm text-slate-500">{resolvedCount}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${getStatusBadge(scan)}`}>
                          {isResolved ? "Resolved" : "Pending"}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleDownload(scan)}
                          disabled={!isResolved || !scan.file_name}
                          className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${isResolved && scan.file_name ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-slate-200 text-slate-500 cursor-not-allowed"}`}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
