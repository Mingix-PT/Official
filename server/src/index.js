const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const path = require('path')
const app = express()
const sql = require('mssql/msnodesqlv8')
const port = 3000

const config = {
    server: "localhost",
    database: "Project_TKB",
    user: "sa",
    password: "leminh164",
    driver: "msnodesqlv8",
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

app.get('/', (req, res) => {
    res.render('home')
})

// app.get('/dang_nhap', (req, res) => {
//     res.render('dang_nhap')
// })

// async () => {
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         await sql.connect(config)
//         const result = await sql.query`select * from HocSinh`
//         console.log(result)
//     } catch (err) {
//         // ... error checks
//     }
// }

sql.connect(config, function (err) {
    if (err) conole.log(err)

    // make a request as

    let request = new sql.Request();

    //make the query

    let query = "your query goes here";  // eg : "select * from tbl_name"

    request.query(query, funnction(err, records){
        if(err) console.log(err)
        else{
            console.log(records)
            //  your out put as records  
        }
    })

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))