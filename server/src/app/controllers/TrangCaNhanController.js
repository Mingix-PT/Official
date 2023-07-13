
class TrangCaNhanController {
    // [GET] /trang-ca-nhan
    index(req, res) {
        res.render('trang-ca-nhan')
    }
}

module.exports = new TrangCaNhanController()