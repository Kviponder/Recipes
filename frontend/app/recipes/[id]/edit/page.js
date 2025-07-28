"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import RecipeForm from '../../../../components/RecipeForm';
import { fetchRecipeById, updateRecipe } from '../../../../lib/api';

/**
 * Page for editing an existing recipe. It preloads the recipe data
 * and passes it to the RecipeForm component. After updating, it
 * navigates back to the recipe detail page.
 */
export default function EditRecipePage() {
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

  const handleSubmit = async (data) => {
    await updateRecipe(id, data);
    router.push(`/recipes/${id}`);
  };

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      <RecipeForm initialData={recipe} onSubmit={handleSubmit} />
    </div>
  );
}