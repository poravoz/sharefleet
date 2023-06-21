document.addEventListener("DOMContentLoaded", function() {
    const viewTable = document.getElementById('viewTable');
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      viewTable.innerHTML = savedData;
    }
  });


