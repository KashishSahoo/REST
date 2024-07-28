const express=require("express");
const app=express();
const path=require("path");
const port=8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");
app.use(methodOverride('_method'));

let posts=[
    {

        id:uuidv4(),
        username:"kashish sahoo",
        content:"Chant and Be Happy"
    },
    {
        id:uuidv4(),
        username:"Sneha Sahoo",
        content:"Visted ISKCON Vizag this Sunday with Family"
    },

    {
        id:uuidv4(),
        username:"Kunu",
        content:"My Happy Krishna Concious Family"
    }
];

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.set(express.static(path.join(__dirname,"views")));
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});

app.get("/posts",(req,res)=>{
   res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
 });

 app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
        let id=uuidv4();
        posts.push({id,username,content});
    // console.log(req.body);
    // res.send("Post request accepted");
    res.redirect("/posts");
 });

 app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
    // console.log(post);
    console.log(id);
    // res.send("Request Working");
    
 });

 app.patch("/posts/:id",(req,res)=>{
    // res.send("patch request working");
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");

    // console.log(newContent);
 });

 app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
 });

 app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
    // res.send("delete success");
 })