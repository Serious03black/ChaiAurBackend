const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/vismeForm', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Create MongoDB Schema and Model
const FormData = mongoose.model('For mData', new mongoose.Schema({
  name: String,
  email: String,
  message: String
}));

// Route to handle form submissions
app.post('/submit-form', (req, res) => {
  const formData = new FormData(req.body);

  formData.save()
    .then(() => res.status(200).json({ message: 'Data saved successfully!' }))
    .catch(err => res.status(500).json({ message: 'Error saving data' }));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
 