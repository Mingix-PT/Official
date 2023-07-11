const dangNhapRouter = require('./dang-nhap_router')
const siteRouter = require('./site')

function route(app) {
    app.use('/dang-nhap', dangNhapRouter)
    app.use('/', siteRouter)
}

module.exports = route