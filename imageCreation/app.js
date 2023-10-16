const { log } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.urlencoded({extended:true}));

app.listen(3000,()=>{
    console.log("app listening on 3000..");
})

app.get("/",(req,res)=>{
    res.send("home");
    
})

app.get('/createFile',(req,res)=>{
    if(fs.existsSync('createdFiles/'+req.body.fileName)){
        res.send("File already with this name.")
        return;
    }
    try{
        fs.writeFileSync('createdFiles/'+req.body.fileName,req.body.fileData);
        res.send("File create succesfully with name "+req.body.fileName)
    }catch (error){
        console.log(error);
        res.send(error)
    }
    
})

app.get('/getFile',(req,res)=>{
    
    try {
        let data = fs.readFileSync('createdFiles/'+req.body.fileName, 'utf8');
        res.send(data);
    } catch (error) {
        res.send("File doesn't found");
    }
})

app.get('/deleteFile',(req,res)=>{
    if(!fs.existsSync('createdFiles/'+req.body.fileName)){
        res.send("File doesn't with this name.")
        return;
    }
    const filePath = 'createdFiles/'+req.body.fileName;
    try {
        fs.unlink(filePath, (err) => {
            if (err) {
              res.send('Error deleting file:', err.message); // Log the error message
            } else {
                res.send("File deleted successfully..")
            }
          });
    } catch (error) {
        res.send(error);
    }
})

