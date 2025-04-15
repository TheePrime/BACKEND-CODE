import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';

const router = express.Router();


//Register a new user endpoint  /auth/register
router.post('/register',async (req,res)=>{

        const { username, password} = req.body;
        

        //Encrypt the password
        const hashedPassword = bcrypt.hashSync(password, 8)

        //save the new user and hashed passoword to the database
        try {
           const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
           })  
            
            const defaultTodo = `Hello Add your first Todo`
            await prisma.todo.create({
                data:{
                    task: defaultTodo,
                    userId: user.id

                }
            })
            //create a token for the user
            const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {
                expiresIn: '24h'})

                res.json({token})
        } catch (err) {
            console.log(err.message)
            res.sendStatus(503)
        }



})


router.post('/login',async (req,res) =>{

    const {username, password} = req.body

    try {
       const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
        if (!user){return  res.status(404).send({message: "User not found"})}

        const isPasswordValid = bcrypt.compareSync(password, user.password)
         if (!isPasswordValid) {
            return res.status(401).send({message: "Invalid password"})
        }

        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })
        res.json({token})

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})




export default router