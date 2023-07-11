function validateForm() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username === "" || password === "") {
    alert("Vui lòng điền đầy đủ tên đăng nhập và mật khẩu!");
    return false;
  }
  return true;
}
