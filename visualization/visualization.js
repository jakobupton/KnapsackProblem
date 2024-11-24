let table = document.getElementById('table');
let head = document.getElementById('head');
let columnHeaders = document.getElementById('column-headers');
let capacityEle = document.getElementById('capacity2');


function inti_visualization_element(){
     table = document.getElementById('table');
     head = document.getElementById('head');
     columnHeaders = document.getElementById('column-headers');
     capacityEle = document.getElementById('capacity2');

}


//knapsack in browser

//samples data.
const objects = [
    {
        name: 'Item 1',
        weight: 1,
        value: 1
    },
    {
        name: 'Item 2',
        weight: 2,
        value: 2
    },
    {
        name: 'Item 3',
        weight: 3,
        value: 3
    },
    {
        name: 'Item 4',
        weight: 4,
        value: 4
    },
    {
        name: 'Item 5',
        weight: 5,
        value: 5
    },
]
const capacity = 7;

//generate table
// generateTable(objects, capacity)

//knapsack algorithm
// knapsack(objects, capacity)


//generate table
function generateTable(objects, capacity) {


    capacityEle.innerText = `${capacity}`
    head.setAttribute('colspan', `${capacity}`);

    columnHeaders.appendChild(document.createElement('th'))
    for (let i = 0; i <= capacity; i++) {
        const th = document.createElement('th');
        th.innerText = `${i}`;
        columnHeaders.appendChild(th);
    }


    let preRow = table.insertRow();
    preRow.appendChild(document.createElement("th"))
    for (let i = 0; i <= capacity; i++) {
        const cell = preRow.insertCell();
        cell.setAttribute('id', `idx_${0}_${i}`)
        cell.innerText = "0";
        cell.classList.add("leading")
    }

    let row_idx = 1;
    for (let obj of objects) {
        let isFirst = true;
        const row = table.insertRow();
        for (let i = 0; i <= capacity; i++) {
            if (isFirst) {
                isFirst = false;
                const th = document.createElement("th");
                th.setAttribute('id', `object_id_${row_idx - 1}`)
                th.innerHTML = `<div><div>${obj.name}</div><div>V:${obj.value}</div><div>W:${obj.weight}</div></div>`;
                row.appendChild(th);
            }

            const cell = row.insertCell();
            cell.innerText = '0';
            cell.setAttribute('id', `idx_${row_idx}_${i}`)
        }
        row_idx++;
    }
}

function getCellText(rowIndex, colIndex) {
    return document.getElementById(`idx_${rowIndex}_${colIndex}`).innerText
}

function setCellText(rowIndex, colIndex, value) {
    document.getElementById(`idx_${rowIndex}_${colIndex}`).innerText = value
}

function knapsack(objects, capacity) {
    const rowCount = objects.length;
    const colCount = capacity;


    for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {
        for (let colIndex = 1; colIndex <= colCount; colIndex++) {
            const currentCapacity = colIndex;
            const obj = objects[rowIndex - 1];
            if (obj.weight > currentCapacity) {
                setCellText(rowIndex, colIndex, getCellText(rowIndex - 1, colIndex));
            } else {
                const sum = parseInt(getCellText(rowIndex - 1, currentCapacity - obj.weight)) + obj.value;
                const pre = parseInt(getCellText(rowIndex - 1, colIndex));

                const result = Math.max(sum, pre);
                setCellText(rowIndex, colIndex, '' + result)
            }
        }
    }
}

// knapsack(objects, capacity)


//expect step json sequence generator
function knapsack_step_generator(objects, capacity) {

    const result = [];

    result.push({
        type: 'init',
        objects,
        capacity
    })

    const rowCount = objects.length;
    const colCount = capacity;

    //init box
    const box = [];
    const keep = [];
    for (let i = 0; i <= rowCount; i++) {
        const row = [];
        box.push(row)
        keep.push([]);
        for (let j = 0; j <= capacity; j++) {
            row.push(0);
            keep[i].push(false);
        }
    }

    for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {
        for (let colIndex = 1; colIndex <= colCount; colIndex++) {
            const currentCapacity = colIndex;
            const obj = objects[rowIndex - 1];


            result.push({
                type: 'select',
                rowIndex,
                colIndex,
            })


            if (obj.weight > currentCapacity) {
                box[rowIndex][colIndex] = box[rowIndex - 1][colIndex]
                result.push({
                    type: 'calculate1',
                    rowIndex,
                    colIndex,

                    srcRowIndex: rowIndex - 1,
                    srcColIndex: colIndex,

                })

            } else {
                const sum = box[rowIndex - 1][currentCapacity - obj.weight] + obj.value;
                const pre = box[rowIndex - 1][colIndex];

                let max;
                if (sum >= pre) {

                    max = sum;
                    keep[rowIndex][colIndex] = true;
                    result.push({
                        type: 'calculate2',
                        rowIndex,
                        colIndex,

                        srcRowIndex: rowIndex - 1,
                        srcColIndex: currentCapacity - obj.weight,


                    })

                } else {
                    max = pre;
                    keep[rowIndex][colIndex] = false;

                    result.push({
                        type: 'calculate1',
                        rowIndex,
                        colIndex,

                        srcRowIndex: rowIndex - 1,
                        srcColIndex: colIndex,

                    })

                }

                box[rowIndex][colIndex] = max;
            }
        }
    }

    result.push({
        type: 'end'
    })

    return {result, keep};
}


let app = {};

function appendClean(app, callback) {
    if (app) {
        if (app.clean) {
            const old = app.clean;
            app.clean = function () {
                old();
                callback();
            };
        } else {
            app.clean = callback;
        }
    }
}

function handleMessage(event) {
    const data = JSON.parse(event.data);
    console.log(data)

    if ('init' === data.type) {
        Object.assign(app, {
            objects: data.objects,
            capacity: data.capacity,
        })
        generateTable(app.objects, app.capacity);
        head.innerText = 'Knapsack algorithm visualization begin'
    }
    if ('select' === data.type) {
        const rowIndex = data.rowIndex;
        const colIndex = data.colIndex;


        app.current = {
            rowIndex, colIndex,
        }

        if (app.clean) {
            app.clean();
            app.clean = null;
        }


        const cell = document.getElementById(`idx_${rowIndex}_${colIndex}`);
        cell.classList.toggle('selected', true);


        app.clean = function () {
            const cell = document.getElementById(`idx_${rowIndex}_${colIndex}`);
            cell.classList.toggle('selected', false);
        };

    }


    if (data.type === 'calculate1') {
        const rowIndex = data.rowIndex;
        const colIndex = data.colIndex;
        const srcRowIndex = data.srcRowIndex;
        const srcColIndex = data.srcColIndex;

        const srcCell = document.getElementById(`idx_${srcRowIndex}_${srcColIndex}`);
        const curCell = document.getElementById(`idx_${rowIndex}_${colIndex}`);

        srcCell.classList.toggle('calculate1', true);
        curCell.innerText = srcCell.innerText;

        appendClean(app, function () {
            srcCell.classList.toggle('calculate1', false);
        });
    }


    if (data.type === 'calculate2') {
        const rowIndex = data.rowIndex;
        const colIndex = data.colIndex;
        const srcRowIndex = data.srcRowIndex;
        const srcColIndex = data.srcColIndex;
        const objectIndex = rowIndex - 1;

        document.getElementById(`object_id_${objectIndex}`).classList.toggle('calculate2', true);
        const srcCell = document.getElementById(`idx_${srcRowIndex}_${srcColIndex}`);
        const curCell = document.getElementById(`idx_${rowIndex}_${colIndex}`);

        srcCell.classList.toggle('calculate2', true);

        curCell.innerText = (parseInt(srcCell.innerText) + app.objects[objectIndex].value) + '';

        appendClean(app, function () {
            document.getElementById(`object_id_${objectIndex}`).classList.toggle('calculate2', false);
            srcCell.classList.toggle('calculate2', false);
        });
    }


    if ('end' === data.type) {
        if (app.clean) {
            app.clean();
            app.clean = null;
        }

        app = {};
        head.innerText = 'Knapsack algorithm visualization end'
    }


}

//startup application
function setupWebSocketConnection() {

    const socket = new WebSocket('ws://localhost:8765');

    socket.onmessage = handleMessage
    socket.onerror = function (error) {
        head.innerText = 'Websocket connection error: ' + error
    };
    socket.onopen = function () {

    };

    socket.onclose = function () {

    };
}

