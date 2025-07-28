import { useState } from 'react';

/**
 * RecipeCard component displays a recipe in a card format with a front
 * and back side. The front side shows the image, title and a short
 * description. The back side reveals the ingredients and preparation
 * steps. Clicking on the card toggles between the two views.
 *
 * @param {Object} props
 * @param {Object} props.recipe - The recipe data to display
 * @param {Function} props.onEdit - Callback for editing the recipe
 * @param {Function} props.onDelete - Callback for deleting the recipe
 */
export default function RecipeCard({ recipe, onEdit, onDelete }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div
      className="relative bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
    >
      {/* Front side */}
      {!showDetails && (
        <button
          type="button"
          onClick={toggleDetails}
          className="w-full h-full text-left"
        >
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover"
            />
          )}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2 truncate">
              {recipe.title}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-3">
              {recipe.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {recipe.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </button>
      )}
      {/* Back side */}
      {showDetails && (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">
            {recipe.title}
          </h2>
          <h3 className="font-medium text-gray-700 mt-2 mb-1">Ingredients</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-3 max-h-32 overflow-y-auto pr-2">
            {recipe.ingredients?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <h3 className="font-medium text-gray-700 mt-2 mb-1">Steps</h3>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 mb-4 max-h-40 overflow-y-auto pr-2">
            {recipe.steps?.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
          <div className="flex justify-between items-center">
            <button
              onClick={toggleDetails}
              className="text-sm text-primary-600 hover:underline"
            >
              Close
            </button>
            <div className="space-x-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(recipe)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(recipe)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}