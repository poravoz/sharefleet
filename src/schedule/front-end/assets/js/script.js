fetch('http://localhost:5433/schedule/')
  .then(response => response.json())
  .then(data => {
    const table = document.createElement('table');
    table.style.fontSize = '12px';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
      if (key !== 'id') {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
      }
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    data.forEach((item) => {
      const timeArray = item.time;
      const subjectsArray = item.subjects;
      const teachersArray = item.teachers;
      const classroomLinksArray = item.classroomLinks;

      const maxLength = Math.max(timeArray.length, subjectsArray.length, teachersArray.length, classroomLinksArray.length);

      for (let i = 0; i < maxLength; i++) {
        const row = document.createElement('tr');

        if (i === 0) {
          const dayOfWeekCell = document.createElement('td');
          dayOfWeekCell.textContent = item.dayOfWeek;
          dayOfWeekCell.style.textAlign = 'center';
          dayOfWeekCell.rowSpan = maxLength;
          row.appendChild(dayOfWeekCell);
        }

        const timeCell = document.createElement('td');
        timeCell.textContent = i < timeArray.length ? timeArray[i] : '';
        row.appendChild(timeCell);

        const subjectsCell = document.createElement('td');
        subjectsCell.textContent = i < subjectsArray.length ? subjectsArray[i] : '';
        row.appendChild(subjectsCell);

        const teachersCell = document.createElement('td');
        teachersCell.textContent = i < teachersArray.length ? teachersArray[i] : '';
        row.appendChild(teachersCell);

        const classroomLinksCell = document.createElement('td');
        if (i < classroomLinksArray.length) {
          const classroomLinks = classroomLinksArray[i].split(','); // Разделяем ссылки по запятой
        
          classroomLinks.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.trim(); // Удаляем возможные пробелы в ссылке
            linkElement.textContent = link.trim();
            classroomLinksCell.appendChild(linkElement);
            classroomLinksCell.appendChild(document.createElement('br')); // Добавляем перенос строки между ссылками
          });
        }
        row.appendChild(classroomLinksCell);

        tbody.appendChild(row);
      }
    });
    table.appendChild(tbody);

    document.body.appendChild(table);
  })
  .catch(error => {
    console.error('Error:', error);
  });