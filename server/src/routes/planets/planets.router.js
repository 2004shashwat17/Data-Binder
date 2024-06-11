const express = require('express');
/* these are the wrapper functions or end point of api called from client*/
const {
    getAllPlanets,
    getAllStudents,
    WriteToFile,
    // Updatedata
} = require('./planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets);
planetsRouter.get('/students', getAllStudents);
planetsRouter.post('/writefile', WriteToFile);
// planetsRouter.post('/updateStudentData',Updatedata);
  
module.exports = planetsRouter;