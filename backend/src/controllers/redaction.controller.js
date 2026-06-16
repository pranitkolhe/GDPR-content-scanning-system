const axios = require("axios");
const pool = require("../config/db");
const path = require("path");

exports.generateRedactedFile = async (req, res) => {

  try {

    const { scanId } = req.params;

    // get file info using scan_id
    const result = await pool.query(
      `
      SELECT f.filename
      FROM scans s
      JOIN files f ON s.file_id = f.id
      WHERE s.id = $1
      `,
      [scanId]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        error: "No file found for this scan"
      })

    }

    const filename = result.rows[0].filename;

    const filePath = `storage/temp_file/${filename}`;
    console.log("File path is: ",filePath);

    const aiResponse = await axios.post(
      `${process.env.AI_SERVICE_URL}/generate-redacted-file`,
      {
        scan_id: parseInt(scanId),
        file_path: filePath
      }
    );

    const redactedPath = aiResponse.data.file;

    if (!redactedPath) {

      return res.status(500).json({
        error: "Redacted file was not generated"
      });

    }

    await pool.query(
      `
      UPDATE files
      SET redacted_path = $1
      WHERE filename = $2
      `,
      [redactedPath, filename]
    );

    const absolutePath = path.join(process.cwd(), "..", redactedPath);

    console.log("2. Target Path from AI:", redactedPath);
    console.log("3. FINAL ATTEMPT PATH:", absolutePath);
    res.download(absolutePath, (err) => {
      if (err) {
        console.error("DOWNLOAD ERROR:", err);
      }
    });
  }
  catch (err) {

    console.error("REDACTION ERROR:", err);

    res.status(500).json({
      error: "Redaction failed"
    });

  }

};