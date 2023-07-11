
class DangNhapController {
    // [GET] /dang-nhap
    index(req, res) {
        res.render('dang-nhap')
    }
}

module.exports = new DangNhapController()