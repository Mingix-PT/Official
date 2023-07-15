window.addEventListener('DOMContentLoaded', function () {
  // Lấy DATA
  const userData = {
    name: 'Nguyen Van A',
    dob: 'nn/mm/yyyy',
    email: 'nguyenvana@example.com',
    id: '123456',
    PhoneNumber: '0912345678',
    place: '10A1',
    //   avatar: 'path/to/avatar.jpg'
  };

  // Nạp DATA
  document.getElementById('name').value = userData.name;
  document.getElementById('dob').value = userData.dob;
  document.getElementById('email').value = userData.email;
  document.getElementById('id').value = userData.id;
  document.getElementById('PhoneNumber').value = userData.PhoneNumber;
  document.getElementById('place').value = userData.place;
  // document.getElementById('avatar').src = userData.avatar;
});
