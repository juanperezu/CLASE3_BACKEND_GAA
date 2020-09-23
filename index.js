const express = require('express');
const morgan = require('morgan');
const path =require('path');
const app =express();

//middleware
app.use(morgan('dev'));// monitorear peticiones
app.use(express.json());// peticiones json

//routes
app.use('/api/', require('./routes/movies'));
//app.use('/api/', require('./routes/usuario'));
// establer mas rutas

app.set("port",4001);
app.listen(app.get("port"),()=>{
console.log("Servidor corriendo en puerto "+app.get("port"));

});


