"use client";

import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import recipesMock from "../mocks/recipes.json";
import { fetchRecipes, deleteRecipe } from "../lib/api";

/**
 * Home page displays a grid of recipe cards with a search bar. During
 * development it uses mock data, but in production it fetches data
 * from the backend API. Deletion triggers an API call when available.
 */
export default function HomePage() {
  const [recipes, setRecipes] = useState(recipesMock);
  const [filtered, setFiltered] = useState(recipesMock);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetchRecipes();
        setRecipes(res);
        setFiltered(res);
      } catch (err) {
        console.warn("Using mock data due to fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Reads an uploaded image file and converts it to a Data URL
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // The result is a Base64-encoded Data URL (e.g., data:image/png;base64,...)
        setImage(reader.result.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = (query) => {
    const lower = query.toLowerCase();
    const result = recipes.filter((recipe) => {
      return (
        recipe.title.toLowerCase().includes(lower) ||
        recipe.tags?.some((tag) => tag.toLowerCase().includes(lower))
      );
    });
    setFiltered(result);
  };

  const handleDelete = async (recipe) => {
    if (!confirm(`Are you sure you want to delete "${recipe.title}"?`)) return;
    try {
      await deleteRecipe(recipe._id);
      setRecipes((prev) => prev.filter((r) => r._id !== recipe._id));
      setFiltered((prev) => prev.filter((r) => r._id !== recipe._id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <a
          href="/recipes/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
        >
          Add Recipe
        </a>
      </div>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p>Loading recipes for the Hungry Bitch Damn...</p>
      ) : filtered.length === 0 ? (
        <p>No recipes found Stupid! Try spelling better.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onDelete={handleDelete}
              onEdit={(r) => {
                window.location.href = `/recipes/${r._id}/edit`;
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
