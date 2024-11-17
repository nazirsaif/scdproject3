const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS package
const path = require('path'); // Import the path module to serve static files

const app = express();

// Use CORS to allow requests from other origins
app.use(cors());

// Parse incoming request bodies as JSON
app.use(bodyParser.json()); // This line is added to parse JSON data

// To parse URL-encoded data from forms
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/weatherwise', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB locally");
}).catch((error) => {
  console.log("Error connecting to MongoDB:", error);
});

// Define User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true } // Ensure this is included
});

const User = mongoose.model('User', userSchema);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Home route (just a test route)
app.get('/', (req, res) => {
  res.send('Welcome to the Weather-Wise App!');
});

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password, username } = req.body;

  console.log("Received data:", { name, email, password, username }); // Log received data

  const newUser = new User({ name, email, password, username });

  try {
    await newUser.save(); // Save the user to the database
    console.log('User saved to DB!');
    res.json({ message: "User registered successfully!" });
  } catch (error) {
    console.log('Error saving user:', error); // Log any error
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email, password });
    if (user) {
      // If user found, serve the homepage.html file
      res.sendFile(path.join(__dirname,  'homepage.html'));
    } else {
      // If user not found, send an error message
      res.status(401).json({ error: "Incorrect email or password" });
    }
  } catch (error) {
    // Handle errors during login
    res.status(500).json({ error: "Error logging in" });
  }
});

// A test route for the homepage
app.get('/home', (req, res) => {
  res.send('Welcome to your personalized Weather-Wise homepage!');
});

// Sign-out route (clear session or any authentication state, then redirect to index.html)
app.get('/signout', (req, res) => {
  // Optionally, clear any session/cookies or authentication details if you're using sessions or JWTs
  // For example, if using a session, you might do something like: req.session.destroy();

  // Redirect the user to the index.html (which is in the main directory)
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
