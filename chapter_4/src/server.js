import express from 'express';
import path ,{dirname} from 'path';
import {fileURLToPath} from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from './middleware/authMiddleware.js'; 


const app = express();
const PORT =process.env.PORT || 5000;

//Get the file path fro the URL of the current module
const __filename = fileURLToPath(import.meta.url);
//Get the directory name from the file path
const __dirname = dirname(__filename);


//middleware
app.use(express.json()) //parse json data


//Tells server where to find the public folder using the folder directory from path
app.use(express.static(path.join(__dirname,'../public')))


//serve up the website from the /public directory 

app.get('/', (req,res) =>{

res.sendFile(path.join( __dirname, 'public', 'index.html'))

})

//Routes
app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)

app.listen(PORT,() =>{

    console.log(`server is running on port: ${PORT}`)
})