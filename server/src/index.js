const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const path = require('path')
const app = express()
const sql = require('mssql')
const port = 3000

const sqlConfig = {
    server: "DESKTOP-D1SFR6N",
    database: "Project_TKB",
    user: "sa",
    password: "leminh164",
    driver: "ODBC Driver 17 for SQL Server",
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    }
}

const route = require('./routes')
const { request } = require('http')

app.use(express.static(path.join(__dirname, 'public')))

// HTTP logger
app.use(morgan('combined'))

// Template engine
app.engine('hbs', engine({
    extname: '.hbs',
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

// Route init
route(app)

// app.get('/', (req, res) => {
//     res.render('home')
// })


// sql.connect(sqlConfig, (err) => {
//     if (err) console.log(err)
//     else {
//         const request = new sql.Request()
//         request.query('SELECT * FROM HocSinh', (err, recordset) => {
//             if (err) console.log(err)
//             else console.log(recordset)
//         })
//     }
// })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))