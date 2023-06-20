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
    data.forEach(item => {
      const row = document.createElement('tr');
      Object.entries(item).forEach(([key, value]) => {
        if (key !== 'id') {
          const cell = document.createElement('td');
          if (Array.isArray(value)) {
            const valuesContainer = document.createElement('div');
            value.forEach(item => {
              const valueElement = document.createElement('div');
              if (key === 'classroomLinks') {
                const link = document.createElement('a');
                link.href = item;
                link.textContent = item;
                valueElement.appendChild(link);
              } else {
                valueElement.textContent = item;
              }
              valuesContainer.appendChild(valueElement);
            });
            cell.appendChild(valuesContainer);
          } else {
            cell.textContent = value;
          }
          row.appendChild(cell);
        }
      });
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    document.body.appendChild(table);
  })
  .catch(error => {
    console.error('Error:', error);
  });