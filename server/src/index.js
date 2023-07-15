// author: Le Minh

const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const path = require('path')
const app = express()
const sql = require('mssql')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const crypto = require('crypto');
const passport = require('passport')
const initializePassport = require('./passport-config')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const fs = require('fs')
const port = 3000
const route = require('./routes')
const { request } = require('http')
const exp = require('constants')

const users = []
const this_user = []


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

sql.connect(sqlConfig, (err) => {
    if (err) console.log(err)
    else {
        let request = new sql.Request()
        request.query(`SELECT MSHS, Password FROM DangNhap`, (err, recordset) => {
            if (err) {
                console.log(err);
                sql.close();
                return;
            }
            else {
                for (let i = 0; i < recordset.recordset.length; i++) {
                    users.push({
                        id: Date.now().toString(),
                        username: recordset.recordset[i].MSHS,
                        password: recordset.recordset[i].Password,
                    })
                }
                sql.close();
            }
        })
    }
})

initializePassport(
    passport,
    username => {
        let found = users.find(user => user.username === username)
        this_user.id = found.id
        this_user.username = found.username
        this_user.password = found.password
        return found
    },
    id => users.find(user => user.id === id)
)


app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(methodOverride('_method'))

// HTTP logger
app.use(morgan('combined'))

// Template engine
app.engine('hbs', engine({
    extname: '.hbs',
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// app.post('/dang-nhap', (req, res) => {
//     const request = new sql.Request()
//     request.query(`SELECT * FROM DangNhap WHERE MSHS = '${req.body.username}'`, (err, recordset) => {
//         if (err) console.log(err)
//         else {
//             if (recordset.recordset.length === 0) {
//                 res.render('dang-nhap', {
//                     error: 'Tên đăng nhập không tồn tại'
//                 })
//             }
//             else {
//                 hashedPassword = crypto.createHash('md5').update(req.body.password).digest('hex')
//                 if (recordset.recordset[0].Password === hashedPassword) {
//                     res.render('trang-ca-nhan', {
//                         user: recordset.recordset[0]
//                     })
//                 }
//                 else {
//                     res.render('dang-nhap', {
//                         error: 'Mật khẩu không đúng'
//                     })
//                 }
//             }
//         }
//     })
// })

app.post('/dang-nhap', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/dang-nhap',
    failureFlash: true,
}))

// Route init
// route(app)

app.get('/', checkAuthenticated, (req, res) => {
    res.render('home')
    sql.connect(sqlConfig, (err) => {
        if (err) {
            console.log(err);
            sql.close()
        }
        else {
            let query = `SELECT CaHoc, Thu, Phong, TenMon 
                        FROM TKB JOIN MonHoc ON TKB.MaMon = MonHoc.MaMon
                        WHERE TenLop = (SELECT TenLop
                        FROM HocSinh
                        WHERE MSHS = '${this_user.username}')
                        ORDER BY Thu, CaHoc`
            const request = new sql.Request()
            request.query(query, (err, recordset) => {
                if (err) {
                    console.log(err)
                    sql.close()
                }
                else {
                    const jsonStringTKB = JSON.stringify(recordset.recordset, null, 2)  
                    fs.writeFile(path.join(__dirname, 'resources/views/JSON_Model/TKB.json'), jsonStringTKB, err => {
                        if (err) {
                            console.log(err)
                            sql.close()
                        }
                        else {
                            console.log('TKB.json created')
                            const request1 = new sql.Request()
                            request1.query(`SELECT TenLop FROM HocSinh WHERE MSHS = '${this_user.username}'`, (err, recordset1) => {
                                if (err) {
                                    console.log(err)
                                    sql.close()
                                }
                                else {
                                    sql.close()
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})
export default jsonStringTKB;

app.get('/dang-nhap', checkNotAuthenticated, (req, res) => {
    res.render('dang-nhap')
})

app.get('/trang-ca-nhan', checkAuthenticated, (req, res) => {
    req.username = this_user.username
    res.render('trang-ca-nhan')
})

app.delete('/dang-xuat', (req, res) => {
    req.logOut(function (err) {
        if (err) console.log(err)
        res.redirect('/dang-nhap')
    })
})

// app.post('/dang-nhap', (req, res) => {
//     res.render('dang-nhap')
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

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/dang-nhap')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}


app.listen(port, () => console.log(`App listening on port ${port}!`))