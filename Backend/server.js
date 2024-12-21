import express from "express" ;

const app = express();

app.get('/' , (req , res) => {
    console.log("server is ready");
    res.send('server is read 1y')
    
})

app.listen(5000 ,() => {
    console.log("server started at http://localhost:5000");
    
})