import express from 'express';
import db from '../db.js';


const router = express.Router();


router.get('/', (req,res)=>{
    const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
    const todos = getTodos.all(req.userId)
     res.json(todos)

})


router.post('/', (req,res) =>{

    const { task } = req.body
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?,?)`)
    const result = insertTodo.run(req.userId, task)

    res.json({id: result.lastInsertRowid, task, completed: 0})

})

router.put('/:id', (req,res) =>{
     const {completed} = req.body
     const  { id }= req.params
     const updateTodo = db.prepare(`UPDATE todos SET completed = ? WHERE id = ? `)

     updateTodo.run(completed, id)

     res.json({message: 'Todo updated successfuly'})
})

router.delete('/:id', (req,res) =>{

const { id } = req.params
const userId = req.userId
const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`)
deleteTodo.run(id, userId)

res.json({message:'Todo deleted succesfully'})

})

router.get('/:id', (req,res)=>{
    const { id } = req.params
    const userId = req.userId
    const getTodo = db.prepare(`SELECT * FROM todos WHERE user_id = ? AND  id = ?`)
    const  todo = getTodo.get( userId, id)

    res.json(todo)

})

export default router;