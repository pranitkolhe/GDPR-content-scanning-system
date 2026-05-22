import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000"
});

export default api;

/* ---------- SCAN APIs ---------- */

export const scanTextAPI = (text, ruleIds) => {
  return api.post("/scan-text", {
    text,
    ruleIds
  });
};

export const scanFileAPI = (formData) => {
  return api.post(
    "/scan-file",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

/* ---------- SCAN HISTORY ---------- */

export const fetchScanHistoryAPI = () => {
  return api.get("/api/scans");
};

/* ---------- VIOLATIONS ---------- */

export const fetchViolationsAPI = (scanId) => {

  // ANALYST PAGE → GET ALL
  if (!scanId) {
    return api.get("/api/violations");
  }

  // ADMIN PAGE → GET ONE SCAN
  return api.get(
    `/api/scans/${scanId}/violations`
  );

};

/* ---------- VIOLATION MANAGEMENT ---------- */

export const updateViolationAPI = (
  id,
  action
) => {

  return api.patch(
    `/api/violations/${id}/action`,
    { action }
  );

};

/* ---------- RULE MANAGEMENT ---------- */

export const getRulesAPI = () => {
  return api.get("/api/rules");
};

export const searchRulesAPI = (
  query
) => {

  return api.get(
    `/api/rules/search?query=${query}`
  );

};

export const addRuleAPI = (data) => {
  return api.post("/api/rules", data);
};

export const toggleRuleAPI = (id) => {
  return api.patch(
    `/api/rules/${id}/toggle`
  );
};

export const deleteRuleAPI = (id) => {
  return api.delete(
    `/api/rules/${id}`
  );
};

/* ---------- UPDATE RULE ---------- */

export const updateRuleAPI = (
  id,
  data
) => api.put(
  `/api/rules/${id}`,
  data
);