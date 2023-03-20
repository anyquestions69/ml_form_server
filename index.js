const express = require('express')
const app = express()
const multer = require('multer')
const PORT = process.env.PORT || 80
const path = require('path');
const {spawn} = require('child_process');

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "files");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
  
    if(file.mimetype === "application/vnd.ms-excel" || 
    file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"|| 
    file.mimetype === "text/csv"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
 }

 
app.use(express.static(path.join(__dirname, 'static')))
    .use(multer({storage:storageConfig, fileFilter: fileFilter}).single("file"));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/static/index.html'))
})
app.post('/upload',(req,res)=>{
    console.log(req.file)
    if(req.file){
        const python = spawn('python3', ['Programmer.py', 'newlist.xls']); // const python = spawn('python3', ['Programmer.py', 'files/'+req.file.filename]);
        python.stdout.on('data', function (data) {
        dataToSend = data.toString();
        });
        
        python.on('close', (code) => {
            res.status(200).send(dataToSend)
        });
        
    }else{
        res.status(400).send("Ошибка при загрузке файла")
    }
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})





