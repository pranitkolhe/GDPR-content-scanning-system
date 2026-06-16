const pool = require("../config/db");

const getAllScans = async () => {

  const result = await pool.query(`
    SELECT
      scans.id,
      scans.scan_type,
      scans.scan_status,
      scans.created_at,
      f.filename AS file_name,
      f.redacted_path,
      u.name AS uploader_name,
      u.email AS uploader_email,
      f.created_at AS uploaded_at,
      COUNT(violations.id) AS violation_count,
      COUNT(CASE WHEN violations.status = 'resolved' THEN 1 END) AS resolved_count
    FROM scans
    LEFT JOIN violations
      ON scans.id = violations.scan_id
    LEFT JOIN files f
      ON scans.file_id = f.id
    LEFT JOIN users u
      ON f.user_id = u.id
    GROUP BY
      scans.id,
      scans.scan_type,
      scans.scan_status,
      scans.created_at,
      f.filename,
      f.redacted_path,
      u.name,
      u.email,
      f.created_at
    ORDER BY scans.created_at DESC
  `);

  return result.rows;
};

module.exports = {
  getAllScans
};