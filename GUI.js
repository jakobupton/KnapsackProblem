function createTable() {
    const numOfObjects = document.getElementById('rows').value;
    var tableHeader = '<table class="custom-table"> <tr><th>Items</th> <th>Values</th> <th>Weight</th></tr>';
    var tableBody = '';

    for (var i = 0; i < numOfObjects; i++) {
        tableBody += '<tr>';
        tableBody += '<td>Item ' + (i+1) + '</td>';
        tableBody += '<td><input type="number" class="input-field" placeholder="Profit" /></td>';
        tableBody += '<td><input type="number" class="input-field" placeholder="Weight" /></td>';
        tableBody += '</tr>';
    }
    var tableFooter = '</table>';
    document.getElementById('wrapper').innerHTML = tableHeader + tableBody + tableFooter;
    document.querySelector('.rbutton').style.display = 'inline-block';
}

function autoFillTable() {
    const profitFields = Array.from(document.querySelectorAll('.input-field[placeholder="Profit"]'));
    const weightFields = Array.from(document.querySelectorAll('.input-field[placeholder="Weight"]'));

    profitFields.forEach(field => {
        field.value = Math.floor(Math.random() * 100) + 1; 
    });

    weightFields.forEach(field => {
        field.value = Math.floor(Math.random() *  capacity) + 1; 
    });
}

