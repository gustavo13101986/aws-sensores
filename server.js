//https://javascript.plainenglish.io/how-to-use-an-aws-sql-database-with-node-js-and-mysql-workbench-f77a71ac12be
//https://www.youtube.com/watch?v=07mAdMTwRHs
const express = require('express')
const mysql = require("mysql");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json())

// MySql   // database-1
const dbconnection = mysql.createConnection({
    // host: "localhost",
    host: "database-1.c7uoaqpbri2m.us-east-2.rds.amazonaws.com",
    user: "admin",  //root
    password: "",  
    password: "12345678",  
    database: 'node_mysql'
});

// Route
app.get('/', (req, res)=> {
    res.send('Welcome to my API!')
})

// all customers
app.get('/sensado', (req, res)=> {
    const sql = 'SELECT * FROM sensores1';

    dbconnection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0) {
            res.json(results)
        }else{
            res.send('Not result')
        }
    })
})

// check connect
dbconnection.connect((err) => {
    if (err) {
        return console.error("ERROR: " + err.message);
    }else{
    return console.log('Database server running')
}
});

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))

