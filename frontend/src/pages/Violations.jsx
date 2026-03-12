import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  fetchViolationsAPI,
  updateViolationAPI
} from "../services/api";

export default function Violations() {

  const { id } = useParams();

  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadViolations();
  }, [id]);


  const loadViolations = async () => {

    try {
      const res = await fetchViolationsAPI(id);

      setViolations(res.data);

    } catch (err) {

      console.error("VIOLATION LOAD ERROR", err);

    } finally {

      setLoading(false);

    }

  };


  const handleAction = async (violationId, action) => {

    try {

      await updateViolationAPI(violationId, action);

      loadViolations();

    } catch (err) {

      console.error("ACTION ERROR", err);

    }

  };


  return (

    <div className="p-6 max-w-5xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Violations for Scaned file {id}
      </h1>


      <table className="w-full border rounded">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">Rule</th>

            <th className="p-3 text-left">Detected Value</th>

            <th className="p-3 text-left">Status</th>

            <th className="p-3 text-left">Actions</th>

          </tr>

        </thead>


        <tbody>

          {loading && (

            <tr>

              <td colSpan="4" className="p-4 text-center">
                Loading...
              </td>

            </tr>

          )}


          {!loading && violations.length === 0 && (

            <tr>

              <td colSpan="4" className="p-4 text-center">
                No violations found
              </td>

            </tr>

          )}


          {!loading && violations.map((v) => (

            <tr key={v.id} className="border-t">

              <td className="p-3">
                {v.rule_name || v.violation_type}
              </td>

              <td className="p-3">
                {v.detected_value}
              </td>

              <td className="p-3">

                <span
                  className={`px-2 py-1 rounded text-sm ${
                    v.status === "resolved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {v.status}
                </span>

              </td>


              <td className="p-3 flex gap-2 flex-wrap">

                <button
                  onClick={() => handleAction(v.id, "REDACT")}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                  Redact
                </button>

                <button
                  onClick={() => handleAction(v.id, "MASK")}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                >
                  Mask
                </button>

                <button
                  onClick={() => handleAction(v.id, "DELETE")}
                  className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleAction(v.id, "RESOLVE")}
                  className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                >
                  Resolve
                </button>

                <button
                    onClick={()=>window.open(
                    `http://localhost:4000/api/download/${id}`
                    )}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                    Download Clean File
                </button>
   

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}