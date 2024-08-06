const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Person } = require("./src/models/personModel.ts");
dotenv.config();

// Define the Recipe schema
const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  prepTimeInMinutes: { type: Number, required: true },
});

// Create the Recipe model
const Recipe = mongoose.model("Recipe", recipeSchema);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();

  // Insert documents
  const recipes = [
    {
      name: "elotes",
      ingredients: [
        "corn",
        "mayonnaise",
        "cotija cheese",
        "sour cream",
        "lime",
      ],
      prepTimeInMinutes: 35,
    },
    {
      name: "loco moco",
      ingredients: [
        "ground beef",
        "butter",
        "onion",
        "egg",
        "bread bun",
        "mushrooms",
      ],
      prepTimeInMinutes: 54,
    },
    {
      name: "patatas bravas",
      ingredients: [
        "potato",
        "tomato",
        "olive oil",
        "onion",
        "garlic",
        "paprika",
      ],
      prepTimeInMinutes: 80,
    },
    {
      name: "fried rice",
      ingredients: [
        "rice",
        "soy sauce",
        "egg",
        "onion",
        "pea",
        "carrot",
        "sesame oil",
      ],
      prepTimeInMinutes: 40,
    },
  ];

  try {
    const insertManyResult = await Recipe.insertMany(recipes);
    console.log(
      `${insertManyResult.length} documents successfully inserted.\n`
    );
  } catch (err) {
    console.error(
      `Something went wrong trying to insert the new documents: ${err}\n`
    );
  }

  // Find documents
  const findQuery = { prepTimeInMinutes: { $lt: 45 } };

  try {
    const foundRecipes = await Recipe.find(findQuery).sort({ name: 1 });
    foundRecipes.forEach((recipe) => {
      console.log(
        `${recipe.name} has ${recipe.ingredients.length} ingredients and takes ${recipe.prepTimeInMinutes} minutes to make.`
      );
    });
    console.log();
  } catch (err) {
    console.error(
      `Something went wrong trying to find the documents: ${err}\n`
    );
  }

  // Find a single document
  const findOneQuery = { ingredients: "potato" };

  try {
    const foundRecipe = await Recipe.findOne(findOneQuery);
    const user = await Person.findOne({ email });
    console.log("user", user);

    if (!foundRecipe) {
      console.log(
        "Couldn't find any recipes that contain 'potato' as an ingredient.\n"
      );
    } else {
      console.log(
        `Found a recipe with 'potato' as an ingredient:\n${JSON.stringify(
          foundRecipe
        )}\n`
      );
    }
  } catch (err) {
    console.error(`Something went wrong trying to find one document: ${err}\n`);
  }

  // Update a document
  const updateDoc = { prepTimeInMinutes: 72 };

  try {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      findOneQuery,
      updateDoc,
      { new: true }
    );
    console.log(
      `Here is the updated document:\n${JSON.stringify(updatedRecipe)}\n`
    );
  } catch (err) {
    console.error(
      `Something went wrong trying to update one document: ${err}\n`
    );
  }

  // Delete documents
  const deleteQuery = { name: { $in: ["elotes", "fried rice"] } };

  try {
    const deleteResult = await Recipe.deleteMany(deleteQuery);
    console.log(`Deleted ${deleteResult.deletedCount} documents\n`);
  } catch (err) {
    console.error(`Something went wrong trying to delete documents: ${err}\n`);
  }

  // Close the connection
  mongoose.connection.close();
};

run().catch(console.dir);
