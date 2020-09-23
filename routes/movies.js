
const{Router}=require("express"); // http (Request(req),Response(res))
const router = Router();
const fs= require("fs");
// Leer el archivos json

const moviesFile=fs.readFileSync("./movies.json","utf-8");

let movies = JSON.parse(moviesFile);

router.get("/",(req,res)=>{
res.status(200).json("API REST CRUD POLIJIC") ;  
//res.json("API REST CRUD POLIJIC");
});

router.get("/movies",(req,res)=>{
res.status(200).json(movies);
})// traer todas las peliculas



module.exports=router;
