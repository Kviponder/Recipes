const Recipe = require('../models/Recipe');

/**
 * Handler for retrieving all recipes.
 * Responds with an array of recipes in JSON format.
 */
async function getAllRecipes(req, res) {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recipes' });
  }
}

/**
 * Handler for retrieving a single recipe by ID.
 */
async function getRecipeById(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recipe' });
  }
}

/**
 * Handler for creating a new recipe. Expects title, description, ingredients,
 * steps, optional image and tags in the request body. Returns the created
 * recipe on success.
 */
async function createRecipe(req, res) {
  try {
    const { title, description, image, ingredients, steps, tags } = req.body;
    if (!title || !description || !ingredients || !steps) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const recipe = await Recipe.create({
      title,
      description,
      image,
      ingredients,
      steps,
      tags,
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create recipe' });
  }
}

/**
 * Handler for updating an existing recipe by ID. Expects the same fields
 * as createRecipe. Returns the updated recipe.
 */
async function updateRecipe(req, res) {
  try {
    const { id } = req.params;
    const { title, description, image, ingredients, steps, tags } = req.body;
    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { title, description, image, ingredients, steps, tags },
      { new: true, runValidators: true }
    );
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update recipe' });
  }
}

/**
 * Handler for deleting a recipe by ID. Responds with a success message on
 * successful deletion.
 */
async function deleteRecipe(req, res) {
  try {
    const { id } = req.params;
    const result = await Recipe.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete recipe' });
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};