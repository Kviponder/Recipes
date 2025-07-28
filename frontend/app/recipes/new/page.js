"use client";

import { useRouter } from 'next/navigation';
import RecipeForm from '../../../components/RecipeForm';
import { createRecipe } from '../../../lib/api';

/**
 * Page for creating a new recipe. It renders the RecipeForm and
 * upon submission calls the API to persist the recipe. On success it
 * navigates back to the home page.
 */
export default function NewRecipePage() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    await createRecipe(data);
    router.push('/');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Recipe</h1>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
}