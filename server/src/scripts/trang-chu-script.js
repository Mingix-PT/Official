import jsonStringTKB from '../index.js'
console.log(jsonStringTKB) 
window.addEventListener('DOMContentLoaded', function() {
  
    // Nạp DATA
    document.getElementsByClass('subject').value = jsonStringTKB[1].TenMon;
  });
  