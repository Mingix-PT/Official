const dangNhapRouter = require('./dang-nhap_router')
const trangCaNhanRouter = require('./trang-ca-nhan_router')
const siteRouter = require('./site')

function route(app) {
    app.use('/dang-nhap', dangNhapRouter)
    app.use('/trang-ca-nhan', trangCaNhanRouter)
    app.use('/', siteRouter)
}

module.exports = route