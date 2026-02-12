# 🛡 Secure Test Environment

## 🌐 Live Application

Frontend (Netlify):  
https://securetest-environment.netlify.app/

Backend (Render):  
https://secure-test-environment-5r2f.onrender.com/

---

## 📌 Project Overview

Secure Test Environment is a full-stack online assessment platform built to maintain exam integrity using real-time monitoring and security controls.

The system prevents malpractice by tracking user activity, monitoring network changes, enforcing fullscreen mode, handling offline scenarios, and automatically submitting the assessment if suspicious behavior is detected.

---

## 🎯 Key Features

- ✅ Fullscreen enforcement before starting the test
- ✅ Tab switching detection
- ✅ Copy / Paste restriction
- ✅ IP address monitoring
- ✅ Suspicious activity logging
- ✅ Auto-submit after multiple violations
- ✅ Offline event storage & sync
- ✅ Time-bound assessment with auto-submit

---

## 🚀 Tech Stack

### Frontend

- React (Vite)
- Material UI (MUI)

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)

### Deployment

- Netlify (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## 📊 Assessment Flow

1. User opens the Instructions page.
2. User clicks **"Start Assessment"**.
3. Fullscreen mode is triggered.
4. Attempt status changes to `STARTED`.
5. Countdown timer starts (time-bound assessment).
6. Monitoring begins:
   - Fullscreen enforcement
   - Copy-paste detection
   - IP address tracking
   - Tab switching detection
   - Suspicious event logging
   - Offline/online detection
7. If **2 suspicious IP changes** occur:
   - Assessment auto-submits.
8. If time reaches zero:
   - Assessment auto-submits.
9. Attempt status becomes `SUBMITTED`.

---

## 🌐 Offline Handling & Event Synchronization

The system handles unstable internet connections intelligently.

### How It Works

- When internet connection is lost:
  - The application detects the `offline` event.
  - Monitoring events are stored temporarily in `localStorage`.

- When internet connection is restored:
  - The `online` event is detected.
  - Stored events are sent to the backend.
  - Local storage is cleared after successful sync.

---

## 🛠 Local Development Setup

Follow the steps below to run the project locally.

---

### 📥 1. Clone the Repository

```bash
git clone https://github.com/Ayyappan97899/secure-test-environment
```

### ⚙️ 2. Backend Setup (Server)

```bash
cd server
npm install
```

▶ Start Backend Server

```bash
npm run dev
```

The backend will run at:

```bash
http://localhost:5000
```

### 💻 3. Frontend Setup (Client)

Open a new terminal:

```bash
cd client
npm install
```

▶ Start Frontend

```bash
npm run dev
```

The frontend will run at:

```bash
http://localhost:5173
```

### 🔑 4. Environment Variables

Backend (.env file inside server/)

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Frontend (.env file inside client/)

```bash
VITE_API_URL=http://localhost:5000
```

### ✅ 5. Access Application

Open your browser:

```bash
http://localhost:5173
```
