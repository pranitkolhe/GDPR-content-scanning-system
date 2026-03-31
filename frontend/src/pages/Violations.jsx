import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchViolationsAPI,
  updateViolationAPI
} from "../services/api";

export default function Violations() {
  const { id } = useParams();

  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [showPendingPopup, setShowPendingPopup] = useState(false);


  useEffect(() => {
    loadViolations();
  }, [id]);

  const loadViolations = async () => {
    try {
      setLoading(true);
      const res = await fetchViolationsAPI(id);
      setViolations(res.data || []);
    } catch (err) {
      console.error("VIOLATION LOAD ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (violationId, action) => {
    try {
      setActionLoadingId(violationId);
      await updateViolationAPI(violationId, action);
      await loadViolations();
    } catch (err) {
      console.error("ACTION ERROR", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const normalizedViolations = useMemo(() => {
    return violations.map((v) => ({
      ...v,
      normalizedStatus: String(v.status || "").toLowerCase()
    }));
  }, [violations]);

  const resolvedCount = normalizedViolations.filter(
    (v) => v.normalizedStatus === "resolved"
  ).length;

  const pendingCount = normalizedViolations.filter(
    (v) => v.normalizedStatus !== "resolved"
  ).length;

  const handleDownloadCleanFile = () => {
    const hasPendingViolations = normalizedViolations.some(
      (v) => v.normalizedStatus !== "resolved"
    );

    if (hasPendingViolations) {
      setShowPendingPopup(true);
      return;
    }


    window.open(`http://localhost:4000/api/download/${id}`, "_blank");
  };

  const getStatusBadge = (status) => {
    const normalized = String(status || "").toLowerCase();

    if (normalized === "resolved") {
      return "bg-green-100 text-green-700 border border-green-200";
    }

    return "bg-red-100 text-red-700 border border-red-200";
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
            Scan Review
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Violations for Scanned File #{id}
          </h1>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">
            Review each detected issue, take action, and download the clean file only after all violations are resolved.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <p className="text-sm text-slate-500 mb-2">Total Violations</p>
            <h2 className="text-3xl font-black text-slate-900">
              {normalizedViolations.length}
            </h2>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <p className="text-sm text-slate-500 mb-2">Resolved</p>
            <h2 className="text-3xl font-black text-green-600">
              {resolvedCount}
            </h2>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <p className="text-sm text-slate-500 mb-2">Pending</p>
            <h2 className="text-3xl font-black text-red-600">
              {pendingCount}
            </h2>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-1">
                Violation Details
              </p>
              <p className="text-sm text-slate-500">
                Resolve every violation before downloading the clean file
              </p>
            </div>

            <button
              onClick={handleDownloadCleanFile}
              className="inline-flex items-center justify-center rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-5 py-2.5 transition-all duration-200"
            >
              Download Clean File
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Rule
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Detected Value
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-slate-400 text-sm">
                      Loading...
                    </td>
                  </tr>
                )}

                {!loading && normalizedViolations.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-slate-400 text-sm">
                      No violations found
                    </td>
                  </tr>
                )}

                {!loading &&
                  normalizedViolations.map((v) => (
                    <tr
                      key={v.id}
                      className="border-t border-slate-100 hover:bg-purple-50/40 transition-colors"
                    >
                      <td className="p-4 text-sm font-semibold text-slate-800">
                        {v.rule_name || v.violation_type}
                      </td>

                      <td className="p-4 text-sm text-slate-500 break-all max-w-xs">
                        {v.detected_value}
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${getStatusBadge(v.status)}`}
                        >
                          {v.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleAction(v.id, "REDACT")}
                            disabled={actionLoadingId === v.id}
                            className="bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                          >
                            Redact
                          </button>

                          <button
                            onClick={() => handleAction(v.id, "MASK")}
                            disabled={actionLoadingId === v.id}
                            className="bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                          >
                            Mask
                          </button>

                          <button
                            onClick={() => handleAction(v.id, "DELETE")}
                            disabled={actionLoadingId === v.id}
                            className="bg-slate-600 hover:bg-slate-700 disabled:opacity-60 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                          >
                            Delete
                          </button>

                          <button
                            onClick={() => handleAction(v.id, "RESOLVE")}
                            disabled={actionLoadingId === v.id}
                            className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                          >
                            Resolve
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
      {showPendingPopup && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-100 overflow-hidden">
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
              Action Required
            </p>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Cannot Download Yet
            </h2>
          </div>

          <button
            onClick={() => setShowPendingPopup(false)}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-all"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Please resolve all violations before downloading the clean file.
            </p>
            <p className="text-sm text-slate-500 mt-2">
              You still have pending violations in this scan. Resolve them first, then try downloading again.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
        <button
          onClick={() => setShowPendingPopup(false)}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl shadow-md shadow-purple-200 transition-all duration-200"
        >
          Okay
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
