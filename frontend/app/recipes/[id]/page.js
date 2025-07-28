go"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchRecipeById, deleteRecipe } from '../../../lib/api';

/**
 * Displays a single recipe based on the dynamic route parameter. Users
 * can view details and delete the recipe from this page. Editing is
 * handled on the edit route.
 */
export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${recipe.title}"?`)) return;
    try {
      await deleteRecipe(id);
      router.push('/');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full max-h-64 object-cover rounded mb-4"
        />
      )}
      <p className="mb-4 text-gray-700">{recipe.description}</p>
      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        {recipe.ingredients.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Preparation Steps</h2>
      <ol className="list-decimal list-inside mb-4 space-y-1">
        {recipe.steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
      <div className="flex gap-4">
        <button
          onClick={() => router.push(`/recipes/${id}/edit`)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}