# My Recipe App

This project is a full‑stack personal recipe manager built with the MERN stack and Next.js 14. The application allows you to create, read, update and delete (CRUD) recipes, complete with images, ingredients, preparation steps and tags. It features a responsive UI built with Tailwind CSS, along with search and filtering capabilities.

## 🗂 Project Structure

```text
recipe_app/
├── frontend/          # Next.js 14 frontend application (app directory)
│   ├── app/           # Route segments and pages (home, recipe detail/edit/new)
│   ├── components/    # Reusable React components (RecipeCard, RecipeForm, SearchBar)
│   ├── mocks/         # Mock JSON data for development
│   ├── lib/           # Helper functions for API calls
│   ├── styles/        # Global Tailwind styles
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── next.config.js
└── backend/           # Node.js + Express API server
    ├── models/        # Mongoose schema definitions
    ├── routes/        # Express route definitions
    ├── controllers/   # Route handlers / controllers
    ├── server.js      # API entry point
    └── package.json
```

## 🚀 Getting Started

These instructions assume you have Node.js and npm installed. You will need to set up a MongoDB database (e.g. using MongoDB Atlas) and provide the connection string via an environment variable.

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file at the root of the `backend` folder with your MongoDB URI:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/recipesdb?retryWrites=true&w=majority
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000`.

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Create a `.env.local` file to specify the API URL if different from the default:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## ✅ Features

- Recipe cards with images, titles, descriptions and tags
- Flip/expand animations to reveal ingredients and steps
- Create, edit and delete recipes through a simple form with validation
- Search and filter recipes by title or tags
- Responsive design built with Tailwind CSS
- Express API with MongoDB persistence via Mongoose
- Optional JWT authentication can be added via additional routes and middleware

Feel free to customize the design, extend the data model, or integrate authentication as needed. Happy cooking! 🍳