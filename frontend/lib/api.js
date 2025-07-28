/**
 * A simple wrapper around the fetch API to communicate with the backend.
 * Each function returns a JSON object or throws an error if the request
 * fails. The base URL can be configured via the NEXT_PUBLIC_API_URL
 * environment variable (falls back to a relative path during development).
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

async function handleResponse(res) {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'An unexpected error occurred');
  }
  return res.json();
}

export async function fetchRecipes() {
  const res = await fetch(`${BASE_URL}/api/recipes`);
  return handleResponse(res);
}

export async function fetchRecipeById(id) {
  const res = await fetch(`${BASE_URL}/api/recipes/${id}`);
  return handleResponse(res);
}

export async function createRecipe(data) {
  const res = await fetch(`${BASE_URL}/api/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateRecipe(id, data) {
  const res = await fetch(`${BASE_URL}/api/recipes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteRecipe(id) {
  const res = await fetch(`${BASE_URL}/api/recipes/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}