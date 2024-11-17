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
}


