const documentModel = require("../models/document.model");
const pool = require("../config/db");

exports.getScanHistory = async (req, res) => {
  try {

    const scans = await documentModel.getAllScans();
    console.log(scans);
    
    res.json(scans);

  } catch (err) {

    console.error("SCAN HISTORY ERROR:", err);

    res.status(500).json({
      error: "Failed to fetch scan history"
    });
  }
};


exports.getScanViolations = async (req, res) => {

  try {

    const scanId = parseInt(req.params.id);

    if (isNaN(scanId)) {
      return res.status(400).json({
        error: "Invalid scan id"
      });
    }

    const result = await pool.query(
      `
      SELECT
        violations.id,
        violations.violation_type,
        violations.detected_value,
        violations.status,
        rules.rule_name
      FROM violations
      LEFT JOIN rules
      ON violations.rule_id = rules.id
      WHERE violations.scan_id = $1
      `,
      [scanId]
    );

    res.json(result.rows);

  } catch (err) {

    console.error("VIOLATION FETCH ERROR:", err);

    res.status(500).json({
      error: "Failed to fetch violations"
    });

  }
};