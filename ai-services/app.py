from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import pdfplumber
import pandas as pd
from io import BytesIO
import json
import os


from services.pii_detector import detect_pii, redact_text
from services.file_redactor import generate_redacted_file
from config.db import get_db_connection


app = FastAPI()

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        os.getenv(
            "FRONTEND_URL",
            "http://localhost:3000"
        )
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


class TextRequest(BaseModel):
    text: str
    ruleIds: list[int] = []   



# class RedactRequest(BaseModel):
#     scan_id: int
#     file_path: str


@app.get("/")
def health():
    return {"status": "AI Service Running"}


# -----------------------------
# TEXT SCAN
# -----------------------------

@app.post("/scan-text")
async def scan_text(data: TextRequest):

    print("📥 Received TEXT:", data.text[:100])
    print("📥 Rules:", data.ruleIds)

    violations = detect_pii(data.text,data.ruleIds)
    redacted = redact_text(data.text, violations)

    return {
        "redactedText": redacted,
        "violations": violations
    }


# -----------------------------
# FILE SCAN
# -----------------------------

@app.post("/scan-file")
async def scan_file(
    file: UploadFile = File(...),
    ruleIds: str = Form("[]")
):

    rule_ids = json.loads(ruleIds)

    print("📂 File Received:", file.filename)
    print("📥 Rules:", rule_ids)

    extracted_text = ""

    contents = await file.read()

    if file.content_type == "application/pdf":

        pdf_stream = BytesIO(contents)

        with pdfplumber.open(pdf_stream) as pdf:

            for page in pdf.pages:

                text = page.extract_text()

                if text:

                    extracted_text += text + "\n"

    elif file.content_type == "text/plain":

        extracted_text = (await file.read()).decode("utf-8")

    elif file.content_type == "text/csv":

        df = pd.read_csv(file.file)
        extracted_text = df.astype(str).to_string(index=False)

    elif file.content_type in [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ]:

        contents = await file.read()
        df = pd.read_excel(BytesIO(contents))
        extracted_text = df.astype(str).to_string(index=False)

    else:

        return {
            "redactedText": "",
            "violations": [],
            "error": "Unsupported file type"
        }

    violations = detect_pii(extracted_text,rule_ids)
    redacted = redact_text(extracted_text, violations)

    return {
        "redactedText": redacted[:5000],
        "violations": violations
    }


# -----------------------------
# GENERATE REDACTED FILE
# -----------------------------

@app.post("/generate-redacted-file")
async def generate_file(
    scan_id: int = Form(...),
    file: UploadFile = File(...)
):

    root_dir = Path(__file__).resolve().parent.parent

    # Create temp directory
    temp_dir = root_dir / "storage" / "temp_file"
    temp_dir.mkdir(parents=True, exist_ok=True)

    # Save uploaded file locally
    original_file = temp_dir / file.filename

    with open(original_file, "wb") as f:
        f.write(await file.read())

    print(f"✅ Uploaded file saved to: {original_file}")

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute(
            """
            SELECT original_value, redacted_value
            FROM redactions
            JOIN violations
            ON redactions.violation_id = violations.id
            WHERE violations.scan_id = %s
            """,
            (scan_id,)
        )

        rows = cur.fetchall()

        replacements = {
            original: redacted
            for original, redacted in rows
        }

        cur.close()
        conn.close()

    except Exception as db_err:

        print(f"❌ DB ERROR: {db_err}")

        return {
            "error": "Database connection failed"
        }

    output_dir = root_dir / "storage" / "redacted_files"

    output_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    output_path = output_dir / f"redacted_scan_{scan_id}.pdf"

    try:

        generate_redacted_file(
            str(original_file),
            str(output_path),
            replacements
        )

    except Exception as gen_err:

        print(f"❌ GENERATION ERROR: {gen_err}")

        return {
            "error": str(gen_err)
        }

    if not output_path.exists():

        return {
            "error": "Failed to generate redacted PDF"
        }

    print(f"✅ Redacted PDF generated at {output_path}")

    return FileResponse(
        path=str(output_path),
        media_type="application/pdf",
        filename=f"redacted_scan_{scan_id}.pdf"
    )










# @app.post("/generate-redacted-file")
# def generate_file(data: RedactRequest):
#     scan_id = data.scan_id
    
#     root_dir = Path(__file__).resolve().parent.parent

#     original_file = root_dir / data.file_path

#     print(f"DEBUG: Attempting to find file at: {original_file}")

#     if not original_file.exists():
#         print(f"❌ ERROR: File not found at {original_file}")
#         return {
#             "file": None,
#             "error": f"Original file not found on server at {original_file}"
#         }

#     try:
#         conn = get_db_connection()
#         cur = conn.cursor()

#         cur.execute(
#             """
#             SELECT original_value, redacted_value
#             FROM redactions
#             JOIN violations ON redactions.violation_id = violations.id
#             WHERE violations.scan_id = %s
#             """,
#             (scan_id,)
#         )

#         rows = cur.fetchall()
#         replacements = {original: redacted for original, redacted in rows}
#         cur.close()
#         conn.close()
#     except Exception as db_err:
#         print(f"❌ DB ERROR: {db_err}")
#         return {"file": None, "error": "Database connection failed"}


#     output_dir = root_dir / "storage" / "redacted_files"
#     output_dir.mkdir(parents=True, exist_ok=True)
    
#     output_path = output_dir / f"redacted_scan_{scan_id}.pdf"


#     try:
#         generate_redacted_file(
#             str(original_file),
#             str(output_path),
#             replacements
#         )
#     except Exception as gen_err:
#         print(f"❌ GENERATION ERROR: {gen_err}")
#         return {"file": None, "error": str(gen_err)}


#     if output_path.exists():
#         print(f"✅ SUCCESS: Redacted file created at {output_path}")
#         relative_path = f"storage/redacted_files/redacted_scan_{scan_id}.pdf"
#         return {"file": relative_path}
#     else:
#         return {
#             "file": None,
#             "error": "Redacted file was not saved to disk"
#         }
        
# @app.post("/generate-redacted-file")
# def generate_file(data: RedactRequest):

    scan_id = data.scan_id
    original_file = data.file_path

    print("Received file:", original_file)
    print("File exists:", os.path.exists(original_file))

    if not os.path.exists(original_file):

        return {
            "file": None,
            "error": f"File not found: {original_file}"
        }

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT original_value, redacted_value
        FROM redactions
        JOIN violations
        ON redactions.violation_id = violations.id
        WHERE violations.scan_id = %s
        """,
        (scan_id,)
    )

    rows = cur.fetchall()

    replacements = {}

    for original, redacted in rows:
        replacements[original] = redacted


    os.makedirs("storage/redacted_files", exist_ok=True)

    output_path = f"storage/redacted_files/redacted_scan_{scan_id}.pdf"

    print(output_path)

    generate_redacted_file(
        original_file,
        output_path,
        replacements
    )

    if not os.path.exists(output_path):

        return {
            "file": None,
            "error": "Redacted file generation failed"
        }

    return {
        "file": output_path
    }