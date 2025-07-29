import { useState } from "react";

/**
 * RecipeForm component provides a form for creating or editing a recipe.
 * It accepts optional initialData to prefill values when editing and
 * exposes an onSubmit callback that receives the form values. The
 * ingredients and steps are entered as multiline text; tags are
 * comma-separated. Basic validation ensures required fields are filled.
 *
 * @param {Object} props
 * @param {Object} [props.initialData] - The recipe values to prefill the form
 * @param {Function} props.onSubmit - Handler invoked with form data
 */
export default function RecipeForm({ initialData = {}, onSubmit }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [image, setImage] = useState(initialData.image || "");
  const [ingredients, setIngredients] = useState(
    initialData.ingredients ? initialData.ingredients.join("\n") : ""
  );
  const [steps, setSteps] = useState(
    initialData.steps ? initialData.steps.join("\n") : ""
  );
  const [tags, setTags] = useState(
    initialData.tags ? initialData.tags.join(", ") : ""
  );
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result.toString()); // Data URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!title || !description || !ingredients || !steps) {
      setError("Please fill out all required fields.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const data = {
        title,
        description,
        image,
        ingredients: ingredients
          .split("\n")
          .map((str) => str.trim())
          .filter(Boolean),
        steps: steps
          .split("\n")
          .map((str) => str.trim())
          .filter(Boolean),
        tags: tags
          .split(",")
          .map((str) => str.trim())
          .filter(Boolean),
      };
      await onSubmit(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="title"
        >
          Title*
        </label>
        <input
          id="title"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="description"
        >
          Description*
        </label>
        <textarea
          id="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="image"
        >
          Image URL
        </label>
        <input
          id="image"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="ingredients"
        >
          Ingredients* (one per line)
        </label>
        <textarea
          id="ingredients"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="steps"
        >
          Preparation Steps* (one per line)
        </label>
        <textarea
          id="steps"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="tags"
        >
          Tags (comma separated)
        </label>
        <input
          id="tags"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Save Recipe"}
        </button>
      </div>
    </form>
  );
}


/**     <div>
        <label className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <input
          type="file"
          accept="image"
          onChange={handleFileChange}
          className="mt-1 block w-full"
        />
      </div>
      */