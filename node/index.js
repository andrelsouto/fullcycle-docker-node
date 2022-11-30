const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'fcdb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const init = async () =>  {
    const createTable = `CREATE TABLE IF NOT EXISTS 
        people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`
    await connection.query(createTable)
    
    const sql = `INSERT INTO people(name) values('Andre')`
    await connection.query(sql)
}

const values = () => {
    const sql = 'SELECT * FROM people'
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, rows, fields) => {
            if (err) {
                reject('Erro no banco de dados')
            } else {
                resolve(rows)
            }
        })
    })
}

init()

app.get('/', async (req, res) => {
    let html = '<h1>Full Cycle Rocks!</h1>'
    const rows = await values()
    html = html.concat("<ul>")
    rows.forEach(name => {
        html = html.concat(`<li>ID: ${name.id} - NOME: ${name.name}</li>`)
    });
    html.concat('</ul>')
    res.send(html)
})

app.listen(port)
