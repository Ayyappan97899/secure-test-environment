# 🛡 Secure Test Environment

## 🌐 Live Application

Frontend (Netlify):  
https://securetest-environment.netlify.app/

Backend (Render):  
https://secure-test-environment-5r2f.onrender.com/

---

## 📌 Project Overview

Secure Test Environment is a full-stack online assessment platform designed to ensure exam integrity through real-time monitoring and activity tracking.

---

## 🎯 Objective

To build a secure, monitored assessment platform that:

- Detects and logs tab switching
- Detects network/IP changes
- Restricts copy-paste behavior
- Enforces fullscreen mode
- Automatically submits on suspicious behavior

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
5. Monitoring begins:
   - Fullscreen mode
   - Copy-paste detection
   - IP address tracking
   - Tab switching detection
   - Suspicious event logging
6. If **2 suspicious IP changes** occur:
   - Auto-submit is triggered.
7. Attempt status becomes `SUBMITTED`.
