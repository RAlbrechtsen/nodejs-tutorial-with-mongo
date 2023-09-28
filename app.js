const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require('./models/blog');
const { result } = require("lodash");

// express app
const app = express();


// Database connection
const dbURI = "mongodb://localhost:27017/node-tuts";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch(err => console.log(err));




// register view engine
app.set("view engine", "ejs");


// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// mongoose & mongo tests
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//       title: 'new blog 3',
//       snippet: 'about my new blog 3333',
//       body: 'more about my new blog'
//     });
  
//     blog.save()
//       .then(result => {
//         res.send(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch(err => {
//             console.log(err);
//           });
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('6515e14e58b0fbf15dc63684')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch(err => {
//             console.log(err);
//           });
// })




// routes
app.get("/", (req, res) => {
    res.redirect('/blogs')
});

app.get("/about", (req, res) => {

    res.render("about", {title: 'About' });
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get("/blogs/create", (req, res) => {
    res.render("create", {title: 'Create blog' })
})

// 404 page
app.use((req, res) => {
    res.status(404).render("404", {title: 'Error' })
});

