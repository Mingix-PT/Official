
class DangNhapController {
    // [GET] /dang-nhap
    index(req, res) {
        res.render('dang-nhap')
    }

    // [POST] /dang-nhap
    login(req, res) {
        res.send('Đăng nhập thanh cong')
    }
}

module.exports = new DangNhapController()