
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
});// traer todas las peliculas

// guardar una Pelicula
router.post("/movies",(req,res)=>{
    // todos son obligatorios
const{title,director,year,duration,genre,poster}=req.body;
//si espresión es verdadera
   //! negar si no hay title ó no hay director ó no hay year
   // Ó  es falso cuando todas son falsas de lo contrario = v
if(!title || !director || !year || !duration || !genre || !poster) { 
 // verdadero
 res.status(401).json({errror:"Todos los campos son obligatorios"});
}else{ // si no todos campos tienen  datos
// falso
const id=movies.length+1;
let newMovie={id,title,director,year,duration,genre,poster};

movies.push(newMovie);
// crear en formato json registro json
const json_movies=JSON.stringify(movies);
// escribir el archivo json
fs.writeFileSync("./movies.json",json_movies,"utf-8");
res.status(200).json(movies);
}// fin si
})// fin guardar POSt

//
router.put("/movies/:id",(req,res)=>{
    const{title,director,year,duration,genre,poster}=req.body;
    const id =req.params.id;
    // si todos los campos son distinto de <> " "
  if(!title || !director || !year || !duration || !genre || !poster || !id){
   res
      .status(4001)
      .json({Error:"Todos los campos deben ser deligenciados y/o especificar el id"});
  } else{ // si no
      movies.filter((movie)=>{
      if(movie.id==id){
        movie.title=title;
        movie.director=director;
        movie.year=year;
        movie.duration=duration;
        movie.genre=genre;
        movie.poster=poster; 
      }// fin si
      });
      const json_movies=JSON.stringify(movies);
      fs.writeFileSync("./movies.json",json_movies,"utf-8");
      res.status(200).json(movies);
  }// fin si 
})// fin actualizar movies PUT
// borrar un dato
router.delete("/movies/:id",(req,res)=>{
const id = req.params.id;   
if(!id){ // si no ha un id
  res.status(500).json({Error:"Ingrese el id de la película"});
 

}else{// si no  falso
// hay un id
const indexMovie = movies.findIndex((movie)=>movie.id==id);
movies.splice(indexMovie,1);
const json_movies =JSON.stringify(movies);
fs.writeFileSync("./movies.json",json_movies,"utf-8");
res.status(200).json(movies);
}// fin si
}); // fin borrar delete

module.exports=router;
