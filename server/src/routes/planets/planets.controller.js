const {planets} = require('../../models/planets.model');
const fs = require('fs');
const path = require('path');
/* We are implementing functionality of all the functions called from routers*/
function getAllPlanets (req,res) {
    return res.status(200).json(planets);
}
 async function getAllStudents (req,res) {
    const data = await fs.readFileSync(path.join(__dirname,'..','..','..', 'data','student-data.json'), "utf8");
    return res.status(200).json(JSON.parse(data));
}

function WriteToFile(req,res){

    fs.writeFile(path.join(__dirname,'..','..','..', 'data','student-data.json'),JSON.stringify( req.body), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
     
    return res.status(200).json(req.body);  
}
// function Updatedata( req,res){
//     fs.writeFile(path.join(__dirname,'..','..','..', 'data','student-data.json'),JSON.stringify( req.body), function(err) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log("The file was saved!");
//     });
     
//     return res.status(200).json(req.body);  
// }
module.exports = {
    getAllPlanets,
    getAllStudents,
    WriteToFile,
    // Updatedata
};
