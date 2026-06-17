👉Project setup

Go live: https://gdpr-content-scanning-system.vercel.app

User Roles

👨‍💼 Admin
The Admin has full access to the platform and can perform the following tasks:
Create and manage scans.
Upload files or enter text for scanning.
Select and apply custom detection rules.
Scan documents for sensitive information and policy violations.
View detailed scan results and violations through the dashboard.
Review detected violations with complete details.
Perform redaction to automatically hide sensitive information.
Download the redacted version of the document.

📊 Analyst
The Analyst role is designed for monitoring and review purposes. An analyst can:
View uploaded files and scanned documents.
Review scan history and activity logs.
Analyze detected violations and scan results.
Monitor system activities through the dashboard.
Access reports without permission to modify scans or perform redactions.

This role-based access control ensures secure document management by providing different permissions to administrators and analysts based on their responsibilities.

1️⃣ Backend setup

cd backend
npm install
npm run dev

2️⃣ Python setup

cd ai_service
python -m venv .venv
source .venv/bin/activate   # macOS / Linux
.venv\Scripts\activate    # Windows

pip install -r requirements.txt
uvicorn app:app --port 8001 --reload

3️⃣ Frontend setup

cd frontend
npm install
npm run dev

👉 Database
 1️⃣ Install PostgreSQL
 2️⃣ Install pgAdmin (Database GUI)

 