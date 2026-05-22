const express = require("express");

const router = express.Router();

const violationController =
require("../controllers/violation.controller");

const pool =
require("../config/db");

/* -------------------------------- */
/* GET ALL RESOLVED VIOLATIONS */
/* FOR ANALYST DASHBOARD */
/* -------------------------------- */

router.get(
  "/violations",
  async (req, res) => {

    try {

      const result =
        await pool.query(`
          SELECT
            violations.id,
            violations.scan_id,
            violations.violation_type,
            violations.detected_value,
            violations.status,
            violations.created_at,
            rules.rule_name

          FROM violations

          LEFT JOIN rules
          ON violations.rule_id = rules.id

          WHERE LOWER(violations.status) = 'resolved'

          ORDER BY violations.id DESC
        `);

      res.json(result.rows);

    } catch (err) {

      console.error(
        "FETCH VIOLATIONS ERROR:",
        err
      );

      res.status(500).json({
        error:
          "Failed to fetch violations",
      });

    }

  }
);

/* -------------------------------- */
/* UPDATE VIOLATION */
/* -------------------------------- */

router.patch(
  "/violations/:id/action",
  violationController.updateViolation
);

module.exports = router;