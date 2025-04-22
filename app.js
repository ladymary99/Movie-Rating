// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Create an Express app
const app = express();
const port = 3000;

// In memory array to store submitted movies and ratings
let submissions = [];

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files like CSS from the (public) folder
app.use(express.static("public"));

// Set EJSP
app.set("view engine", "ejs");

// Route for the main form page
app.get("/", (req, res) => {
  // Render the form (index.ejs) with no error initially
  res.render("index", { error: null });
});

// Route to handle form submission
app.post("/submit", (req, res) => {
  // Get submitted form data
  const { movie, rating } = req.body;

  // Convert the rating to a number
  const ratingNum = Number(rating);

  // Validate input: movie name should not be empty, and rating should be between 1 and 10
  if (
    !movie ||
    movie.trim() === "" ||
    isNaN(ratingNum) ||
    ratingNum < 1 ||
    ratingNum > 10
  ) {
    // If invalid, re-render the form with an error message
    return res.render("index", {
      error: "Please enter a valid movie name and a rating between 1 and 10.",
    });
  }

  // If valid, create a submission object
  const submission = {
    movie: movie.trim(),
    rating: ratingNum,
  };

  // Store it in the submissions array
  submissions.push(submission);

  // Render the success page with current and all submissions
  res.render("success", { submission, submissions });
});

// Start the server on port 3000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
