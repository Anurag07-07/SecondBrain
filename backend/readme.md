---

```markdown
# 🔐 Content Management API (Node.js + Express + TypeScript)

A secure, modular REST API built using **Express**, **TypeScript**, **MongoDB (Mongoose)**, **JWT**, and **Zod**. Features user authentication, content management, and middleware-based route protection.

---

## 📁 Folder Structure

```

src/
├── controllers/         # Route logic (e.g., Signup, Signin, CreateContent)
├── db/                  # MongoDB connection logic
├── middlewares/         # JWT auth middleware
├── models/              # Mongoose schemas (User, Content, Tags, Links)
├── routes/              # Express route definitions
├── utils/               # Reusable helpers (optional)
└── index.ts             # Main server file

````

---

## 🚀 Features

- ✅ JWT-based Auth (Signup / Signin)
- ✅ Content creation (with user/tags/type)
- ✅ Protected routes with middleware
- ✅ Input validation via [Zod](https://zod.dev/)
- ✅ Modular file structure
- ✅ TypeScript-first

---

## ⚙️ Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Zod](https://zod.dev/)
- [JWT](https://jwt.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

---

## 🧪 API Endpoints

### Auth

| Route        | Method | Description         |
| ------------ | ------ | ------------------- |
| `/api/v1/signup` | POST   | Register a new user |
| `/api/v1/signin` | POST   | Login and receive JWT |

**Example (Signup):**

```json
POST /api/v1/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secret123"
}
````

### Content

| Route            | Method | Description        | Protected |
| ---------------- | ------ | ------------------ | --------- |
| `/api/v1/create` | POST   | Create new content | ✅         |

Send token in the header:

```
Authorization: Bearer <token>
```

---

## 🛠️ Setup

### 1. Clone Repo

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=3000
MONGO_DB=mongodb://localhost:27017/your-db-name
JWT_SECRET=your_super_secret_key
```

### 4. Run Project

#### Development (watch mode):

```bash
npm run dev
```

#### Production (build + run):

```bash
npm run build && npm start
```

---

## ✅ Scripts

| Script          | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Starts dev server with ts-node |
| `npm run build` | Compiles TypeScript to `dist/` |
| `npm start`     | Runs built project with Node   |

---

## 🧰 Tips

* Use `.js` in imports when `"type": "module"` is set in `package.json`
* Ensure `tsconfig.json` is set properly for `moduleResolution` and `outDir`
* Use tools like [Postman](https://www.postman.com/) to test APIs

---

```
