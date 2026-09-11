# Netflix Login Clone — React + Express

## How to run

### 1. Backend (Terminal 1)
```
cd backend
npm install
npm start
```
Runs on http://localhost:5000

### 2. Frontend (Terminal 2)
```
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173 (open this in your browser)

## Demo login
- Email: student@example.com
- Password: learnReact123

(A second account also works: admin@netflixclone.com / admin123)

## How the pieces fit together
1. Login.jsx holds email/password in React state (controlled inputs).
2. On submit, it runs frontend validation first (empty fields, email format,
   min password length) — this gives instant feedback with no network call.
3. If validation passes, it POSTs to http://localhost:5000/api/login using axios.
4. server.js checks the credentials against a hardcoded MOCK_USERS array
   (no database) and responds with 200 + a fake token, or 400/401 + an
   error message.
5. On success, the token is saved to localStorage and the user is
   redirected to /dashboard via react-router's useNavigate.
6. ProtectedRoute (in App.jsx) checks for that token before allowing
   access to /dashboard, so typing the URL directly without logging in
   redirects back to /login.
