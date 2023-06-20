fetch('http://localhost:5433/schedule/')
  .then(response => response.json())
  .then(data => {
    const table = document.createElement('table');
    table.className = 'schedule-table';
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
      const numberArray = item.number; 

      const maxLength = Math.max(
        timeArray.length,
        subjectsArray.length,
        teachersArray.length,
        classroomLinksArray.length,
        numberArray.length
      );

      for (let i = 0; i < maxLength; i++) {
        const row = document.createElement('tr');

        if (i === 0) {
          const dayOfWeekCell = document.createElement('td');
          dayOfWeekCell.textContent = item.dayOfWeek;
          dayOfWeekCell.style.textAlign = 'center';
          const rowspan = maxLength - i;
          dayOfWeekCell.rowSpan = rowspan;
          row.appendChild(dayOfWeekCell);
        }

        const timeCell = document.createElement('td');
        timeCell.textContent = i < timeArray.length ? replaceSpecialCharacters(timeArray[i]) : '';
        row.appendChild(timeCell);

        const subjectsCell = document.createElement('td');
        if (i < subjectsArray.length) {
          const subjects = subjectsArray[i].split('/');

          if (subjects.length === 1) {
            subjectsCell.textContent = replaceSpecialCharacters(subjects[0].trim());
          } else if (subjects.length === 2) {
            const topText = replaceSpecialCharacters(subjects[0].trim());
            const bottomText = replaceSpecialCharacters(subjects[1].trim());

            const topSpan = document.createElement('span');
            topSpan.textContent = topText;
            subjectsCell.appendChild(topSpan);

            subjectsCell.appendChild(document.createElement('br'));

            const divider = document.createElement('div');
            divider.style.borderTop = '2px solid #000';
            divider.style.margin = '4px 0';
            subjectsCell.style.paddingLeft = '0px';
            subjectsCell.style.paddingRight = '0px';

            subjectsCell.appendChild(divider);

            const bottomSpan = document.createElement('span');
            bottomSpan.textContent = bottomText;
            subjectsCell.appendChild(bottomSpan);
          }

          subjectsCell.style.borderRight = '1px solid #000';
        }
        row.appendChild(subjectsCell);

        const teachersCell = document.createElement('td');
        if (i < teachersArray.length) {
          const teachers = teachersArray[i].split('/');

          if (teachers.length === 1) {
            teachersCell.textContent = replaceSpecialCharacters(teachers[0].trim());
          } else if (teachers.length === 2) {
            const topText = replaceSpecialCharacters(teachers[0].trim());
            const bottomText = replaceSpecialCharacters(teachers[1].trim());

            const topSpan = document.createElement('span');
            topSpan.textContent = topText;
            teachersCell.appendChild(topSpan);

            teachersCell.appendChild(document.createElement('br'));

            const divider = document.createElement('div');
            divider.className = 'divider';
            divider.style.borderTop = '2px solid #000';
            divider.style.margin = '4px 0';
            teachersCell.appendChild(divider);

            const bottomSpan = document.createElement('span');
            bottomSpan.textContent = bottomText;
            teachersCell.appendChild(bottomSpan);
          }

          teachersCell.style.borderRight = '1px solid #000';
          teachersCell.style.paddingRight = '0px';
          teachersCell.style.paddingLeft = '0px';
        }
        row.appendChild(teachersCell);

        const classroomLinksCell = document.createElement('td');
        if (i < classroomLinksArray.length) {
          const classroomLinks = classroomLinksArray[i].split(',');

          classroomLinks.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = replaceSpecialCharacters(link.trim());
            linkElement.textContent = link.trim();
            classroomLinksCell.appendChild(linkElement);
            classroomLinksCell.appendChild(document.createElement('br'));
          });
        }
        row.appendChild(classroomLinksCell);

        const numbersCell = document.createElement('td');
        if (i < numberArray.length) {
          numbersCell.textContent = replaceSpecialCharacters(numberArray[i]);
        }
        row.appendChild(numbersCell);

        tbody.appendChild(row);
      }
    });

    table.appendChild(tbody);
    document.body.appendChild(table);
  })
  .catch(error => {
    console.error('Error:', error);
  });

function replaceSpecialCharacters(text) {
  if (/^https?:\/\//.test(text)) {
    return text;
  }

  return text.replace(/\//g, '─').replace(/\|/g, '│');
}