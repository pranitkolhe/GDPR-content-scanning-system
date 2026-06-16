import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchScanHistoryAPI } from "../services/api";

export default function Dashboard() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadScans();
  }, []);

  const loadScans = async () => {
    try {
      const res = await fetchScanHistoryAPI();
      setScans(res.data || []);
    } catch (err) {
      console.error("SCAN LOAD ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  const getTypeBadge = (type) => {
    const normalized = String(type || "").toLowerCase();

    if (normalized.includes("file")) {
      return "bg-blue-100 text-blue-700 border border-blue-200";
    }

    return "bg-purple-100 text-purple-700 border border-purple-200";
  };

  const getViolationBadge = (count) => {
    const total = Number(count || 0);

    if (total > 0) {
      return "bg-red-100 text-red-700 border border-red-200";
    }

    return "bg-green-100 text-green-700 border border-green-200";
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
            Dashboard Overview
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Scan History
          </h1>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">
            Review previous scans, check violation counts, and open detailed scan results.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <p className="text-sm text-slate-500 mb-2">Total Scans</p>
            <h2 className="text-3xl font-black text-slate-900">{scans.length}</h2>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <p className="text-sm text-slate-500 mb-2">Scans With Violations</p>
            <h2 className="text-3xl font-black text-slate-900">
              {scans.filter((scan) => Number(scan.violation_count) > 0).length}
            </h2>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
            <p className="text-sm text-slate-500 mb-2">Clean Scans</p>
            <h2 className="text-3xl font-black text-slate-900">
              {scans.filter((scan) => Number(scan.violation_count) === 0).length}
            </h2>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <p className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-1">
              Recent Scans
            </p>
            <p className="text-sm text-slate-500">
              Click any row to view scan violations
            </p>
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center text-slate-400">
              Loading scan history...
            </div>
          ) : scans.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-400">
              No scan history found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Scan ID
                    </th>
                    <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Scan Type
                    </th>
                    <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Violations
                    </th>
                    <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {scans.map((scan) => (
                    <tr
                      key={scan.id}
                      onClick={() => navigate(`/scan/${scan.id}`)}
                      className="border-t border-slate-100 hover:bg-purple-50/40 transition-colors cursor-pointer"
                    >
                      <td className="p-4 text-sm font-semibold text-slate-800">
                        #{scan.id}
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${getTypeBadge(scan.scan_type)}`}
                        >
                          {scan.scan_type}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${getViolationBadge(scan.violation_count)}`}
                        >
                          {scan.violation_count} found
                        </span>
                      </td>

                      <td className="p-4 text-sm text-slate-500">
                        {new Date(scan.created_at).toLocaleString()}
                      </td>

                      <td className="p-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/scan/${scan.id}`);
                          }}
                          className="inline-flex items-center rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-4 py-2 transition-all duration-200"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
