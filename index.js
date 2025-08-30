const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const {v4 :uuidv4} =require('uuid');
const methodOverride = require('method-override')


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4() ,
        username : "Salmna",
        content : "I love coding"
    },
    {
        id : uuidv4(),
        username : "Mani",
        content : "I love Gaming"
    },
    {
        id : uuidv4(),
        username : "Sahil",
        content : "I love Gym"
    },
];


app.get("/posts", (req, res) => {
    res.render("index.ejs",{posts});
});

//  rout to create a post 

app.get("/posts/new",(req ,res )=>{
    res.render("new.ejs");
});

//  Route for new post
 
app.post("/posts",(req ,res )=>{
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id ,username , content});
    res.redirect("/posts"); // Very important

});

//  get route to get one post(using id)

app.get("/posts/:id",(req , res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
});

//  now create a patch request route -> to update the specific post

app.patch("/posts/:id",(req , res)=>{
    let { id } = req.params;
    let newContent = req.body.content;   
    let post = posts.find((p) => id === p.id); 
    post.content = newContent;
    // console.log(post);
    res.redirect("/posts");
});


// for edit option 
app.get("/posts/:id/edit",(req , res) =>{
    let { id } = req.params;
    let post  = posts.find((p) => id ==p.id);
    res.render("edit.ejs", { post });

});

//  for delete route 

app.delete("/posts/:id",(req , res) => {
    let  { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Listening to port ${port} `);
});

