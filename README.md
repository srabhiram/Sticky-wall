# 📝 Sticky Wall - Task Management Application  

**Sticky Wall** is a simple yet powerful **task management application** that allows users to organize their tasks efficiently. It supports user authentication, task categorization, and real-time updates.  

## 🚀 Features  

✅ **User Authentication** (JWT, bcrypt)  
✅ **Add, Edit, Delete Tasks**  
✅ **Switch Task States** (Pending/Completed)  
✅ **Real-Time Updates** (Sidebar updates dynamically)  
✅ **Task Timestamps** (e.g., "2 hours ago")  
✅ **Optimized Performance** (Loading UI, Dynamic Imports)  

## 🛠️ Tech Stack  

- **Frontend**: Next.js, TypeScript, Tailwind CSS, shadcn  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT, bcrypt  
- **State Management**: Context API  

---

## 📌 Installation & Setup  

Follow these steps to **clone and run** the project locally.  

### 1️⃣ Clone the Repository  

```sh
git clone https://github.com/yourusername/sticky-wall.git
cd sticky-wall
```

### 2️⃣ Install Dependencies  

```sh
npm install
```

### 3️⃣ Set Up Environment Variables  

Create a `.env` file in the root directory and add the following variables:  

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4️⃣ Start the Development Server  

```sh
npm run dev
```

Your app will be running at **http://localhost:3000** 🚀  

---

## 🏗️ Folder Structure  

```
/sticky-wall
├── /components      # Reusable UI components
├── /context         # Context API for state management
├── /pages          
│   ├── /api        # API routes (Next.js API)
│   ├── /auth       # Login & Signup pages
│   ├── /dashboard  # Main task dashboard
│   ├── index.tsx   # Homepage
├── /styles         # Tailwind styles
├── .env.example    # Environment variables example
├── next.config.js  # Next.js configuration
├── package.json    # Dependencies & scripts
└── README.md       # Project documentation
```

---

## 🤝 Contributing  

Feel free to **fork** this repo, raise **issues**, or submit **pull requests** to improve the project!  

---

## 📜 License  

This project is **open-source** under the **MIT License**.  
