# 📝 Codechat – Realtime Code Editor (React + Chakra UI + Express + WebSockets)

Codechat is a fullstack realtime code editor web application built using **React** for the frontend, **WebSockets** for realtime code transfer and **Express** for backend services. It allows users to connect in existing rooms or create new ones, code with members and run their code, right now it only supports javascript language.

---

## 📱 Features

- Create Rooms
- Join existing rooms by room id
- Copy and share room ids to others
- Code in realtime
- Run your code

---

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router, socket.io-client
- **Backend:** Node & Express, Judge0, socket.io
- **Styling:** Chakra UI
- **Code Editor:** Codemirror
- **Realtime Code Transfer:** WebSockets

---

## 📁 Project Structure

```
codechat/
├── public/               # static assets
├── src/                  # source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components/routes
│   ├── actions.js        # Socket actions
│   ├── App.jsx           # Root app component
│   ├── index.css         # Global styles (Tailwind included)
│   └── main.jsx          # Entry point (ReactDOM rendering)
│   └── socket.js         # Socket Initialization
├── .env                  # Environment variables
├── .env.sample           # Sample env file
├── .gitignore            # Git ignore rules
├── docker-compose.yml    # Docker compose file
├── Dockerfile            # Dockerfile
├── eslint.config.js      # ESLint configuration
├── favicon.ico           # Application icon
├── index.html            # HTML template
├── jsconfig.json         # JavaScript config
├── package.json          # Project metadata and dependencies
├── README.md             # Project README
├── server.js             # Express Server
├── vite.config.js        # Vite bundler configuration
└── yarn.lock             # Project metadata and dependencies lock

```

---

## 📸 Screenshots

<img width="1366" height="768" alt="Home" src="https://github.com/user-attachments/assets/a234bc00-1a02-47ae-991e-7154c29d9b7b" />
<img width="1366" height="768" alt="Editor" src="https://github.com/user-attachments/assets/3cddac6b-c05f-4637-b5db-974dade57596" />
<img width="1366" height="768" alt="Run Program" src="https://github.com/user-attachments/assets/061684ce-9364-49e6-b6e2-276e8ad202bc" />
<img width="1366" height="768" alt="Room" src="https://github.com/user-attachments/assets/7a020426-fdbc-4dbf-ae68-16cd01dc6c65" />

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Siddharth9101/codechat.git
cd codechat
```

### 2. Create .env file

```bash
cp .env.sample .env
```

## Without Docker

### 3. Install dependencies

```bash
yarn
```

### 4. Start the server

```bash
yarn server:dev
```

### 5. Start the frontend

```bash
yarn dev
```

### 6. Visit the site on localhost:5173

## With Docker

## 3. Run using Docker Compose

```bash
docker compose up -d
```

## 4. Visit the site on localhost:5173

🔗 [Live demo](https://codechat-t6lv.onrender.com/)

## 📄 License

This project is open-source and available under the MIT License.

---
