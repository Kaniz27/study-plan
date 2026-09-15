# StudyFlow

A MERN study planner with JWT cookie authentication, user-scoped task CRUD, subject analytics, Pomodoro timer, dark mode, due dates, priorities, and responsive UI.

## Run locally

### 1. Start MongoDB
Use a local MongoDB service or MongoDB Atlas. Create `server/.env` from `.env.example` and set `MONGO_URI` and a strong `JWT_SECRET`.

### 2. Start the API
```bash
cd server
npm install
npm run dev
```

### 3. Start the client
```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

## Environment

`server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/studyflow
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

With no `MONGO_URI`, the API uses a development-only in-memory demo account so the UI can be tested immediately:

```text
Email: demo@studyflow.app
Password: 123456
```

For persistent production data, configure MongoDB in `server/.env`. Users can then create accounts through the registration screen.
