const express = require('express');




//bring in mongoose
const mongoose = require('mongoose');

//bring in method override
const methodOverride = require('method-override');

const blogRouter = require('./routes/blogs');
const Blog = require('./models/Blog');
const app = express();

//connect to mongoose
mongoose.connect('mongodb://localhost/crudblog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//set template engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
//route for the index
app.get('/admin', async (request, response) => {
  let blogs = await Blog.find().sort({ timeCreated: 'desc' });

  response.render('index', { blogs: blogs });
});


//route for home
// livescore page
app.get('/', async (request, response) => {
  let blogs = await Blog.find().sort({ timeCreated: 'desc' });

  response.render('home', { blogs: blogs });
});

app.use(express.static('public'));
app.use('/blogs', blogRouter);

//listen port
// app.listen(5001);

app.listen(process.env.PORT || 4000, function () {
  console.log("Server is listening on port 4000");
});
