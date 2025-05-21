<script>
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyPl6M3OOiVj3TB3j43VvyVmy8bDtxSDwyllxOO9_a7LH4U9_Nry_Tg5wtYS4VdIsQp/exec';
// Đóng popup
  function closePopup(id) {
    if (!id) {
      document.getElementById('popup').style.display = 'none';
    } else {
      const popup = document.getElementById('popup-' + id);
      if (popup) popup.style.display = 'none';
    }
  }

  // Hiển thị popup theo id
  function showPopup(id) {
    document.querySelectorAll('.popup-overlay').forEach(p => p.style.display = 'none');
    const popup = document.getElementById('popup-' + id);
    if (popup) popup.style.display = 'flex';
  }

  function openReportPopup(id) {
    closePopup('baocao');
    showPopup(id);
  }
// Gửi tháng cho thống kê
function sendMonthStats() {
  const monthYear = document.getElementById('input-monthYear').value.trim();
  const regex = /^(0[1-9]|1[0-2])\/\d{4}$/; // kiểm tra đúng định dạng MM/YYYY

  if (!regex.test(monthYear)) {
    alert('Vui lòng nhập đúng định dạng tháng/năm, ví dụ: 05/2025');
    return;
  }

  fetch(WEB_APP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `monthYear=${encodeURIComponent(monthYear)}`
  })
  .then(res => res.json())
  .then(data => {
  if (data.status === 'success') {
  loadThongKeTable(monthYear);
}
})

  .catch(err => {
    alert('Lỗi khi gửi dữ liệu thống kê.');
    console.error(err);
  });
}



// Tải dữ liệu thống kê từ Google Sheets
// Hàm load lại bảng thống kê, nhận tháng/năm để cập nhật tiêu đề
function loadThongKeTable(monthYear) {
  // Cập nhật tiêu đề bảng
  const titleEl = document.getElementById('thongKeTitle');
  if (titleEl && monthYear) {
    titleEl.textContent = `Hiệu suất kiểm tra tháng ${monthYear}`;
  }

  fetch(WEB_APP_URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('thongKeTable').querySelector('tbody');
      tbody.innerHTML = '';

      data.forEach(row => {
        const name = row.name || '';
        const total = parseInt(row.total) || 0;
        const pass = parseInt(row.pass) || 0;
        const ratio = `${pass}/${total}`;
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${name}</td><td>${ratio}</td>`;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error('Lỗi tải dữ liệu thống kê:', err);
      alert('Không thể tải dữ liệu thống kê.');
    });
}


// Hiển thị popup theo ID (mở thống kê thì load luôn)
function showPopup(id) {
  document.querySelectorAll('.popup-overlay').forEach(p => p.style.display = 'none');
  const popup = document.getElementById('popup-' + id);
  if (popup) {
    popup.style.display = 'flex';
    if (id === 'thongke') loadThongKeTable();
  }
}






</script>
