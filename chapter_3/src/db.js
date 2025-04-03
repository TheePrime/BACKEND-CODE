import {DatabaseSync} from 'node:sqlite'
const db = new DatabaseSync(':memory:')

db.exec(`
    CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    USERNAME TEXT UNIQUE,
    PASSWORD TEXT
    
    )`)


    db.exec(`
        CREATE TABLE todos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)

        
        )`)


        export default db