document.addEventListener("DOMContentLoaded", function() {
    createScheduleTables();
    restoreScheduleFromStorage();
});

function createScheduleTables() {
    var daysOfWeek = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\`ятниця'];
    var container = document.getElementById('scheduleTablesContainer');

    for (var i = 0; i < daysOfWeek.length; i++) {
        var table = document.createElement('table');
        table.id = 'scheduleTable_' + i;
        var tableContent = '<tr><th colspan="5">' + daysOfWeek[i] + '</th></tr><tr><th>№ пари</th><th>Час</th><th>Предмет</th><th>Викладач</th><th>Аудиторія-посилання</th></tr>';

        for (var j = 1; j <= 5; j++) {
            tableContent += '<tr><td style="width: 25px; text-align: center;">' + j + '</td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td></tr>';
        }

        table.innerHTML = tableContent;
        container.appendChild(table);
    }
}

function saveScheduleToStorage() {
    var scheduleTables = document.querySelectorAll('[id^="scheduleTable_"]');

    scheduleTables.forEach(function(table) {
        var tableId = table.id;
        var tableRows = table.querySelectorAll('tr');

        var scheduleData = [];

        tableRows.forEach(function(row) {
            var rowData = [];
            var cells = row.querySelectorAll('td');

            cells.forEach(function(cell) {
                rowData.push(cell.innerText);
            });

            scheduleData.push(rowData);
        });

        localStorage.setItem(tableId, JSON.stringify(scheduleData));
    });
}

function restoreScheduleFromStorage() {
    var scheduleTables = document.querySelectorAll('[id^="scheduleTable_"]');

    scheduleTables.forEach(function(table) {
        var tableId = table.id;
        var tableData = localStorage.getItem(tableId);

        if (tableData) {
            var scheduleData = JSON.parse(tableData);
            var tableRows = table.querySelectorAll('tr');

            tableRows.forEach(function(row, rowIndex) {
                var cells = row.querySelectorAll('td');

                if (scheduleData[rowIndex]) {
                    scheduleData[rowIndex].forEach(function(cellData, cellIndex) {
                        cells[cellIndex].innerText = cellData;
                    });
                }
            });
        }
    });
}

window.addEventListener('beforeunload', function() {
    saveScheduleToStorage();
});