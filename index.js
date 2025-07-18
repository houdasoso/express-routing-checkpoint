const express = require('express');
const path = require('path');
const app = express();

// Middleware to allow access only during working hours (Mon–Fri, 9–17)
app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const hour = now.getHours(); // 0 to 23

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send("<h1 style='color: red;'>Sorry! Our website is only available Monday to Friday, from 09:00 to 17:00.</h1>");
  }
});

// Serve static files from "public" folder (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to Pug (you must install it: npm install pug)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
