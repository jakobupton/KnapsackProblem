function gatherInfo() {
    const dataTable = document.querySelector('.custom-table');
    const items = []
    const rows = dataTable.querySelectorAll("tr");
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const itemName = row.querySelector("td:nth-of-type(1)").innerText;
        const value = parseInt(row.querySelector("td:nth-of-type(2)").querySelector("input").value);
        const weight = parseInt(row.querySelector("td:nth-of-type(3)").querySelector("input").value);
        items.push({
            name: itemName,
            weight: weight,
            value: value
        })
    }
    return items;
}

async function generateResult() {
    document.getElementById('visualization_area').innerHTML = `

    <table id="result-table" >
        <thead>
        <tr>
            <th><span>Capacity:</span></th>
            <th><span id="capacity2"></span></th>
            <th id="head"></th>
        </tr>
        <tr id="column-headers">

        </tr>
        </thead>
        <tbody id="table">

        </tbody>
    </table>
        `;
    const objects = gatherInfo();
    const capacity = parseInt(document.getElementById('capacity').value);


    inti_visualization_element();
    const {result,keep} = knapsack_step_generator(objects, capacity);

    for (let step of result) {
        handleMessage({data: JSON.stringify(step)})
        await sleep(200);
    }
    const optimalSolution = backtrackSolution(objects, keep, capacity);
    document.getElementById('capacity2').innerText = capacity;
    document.getElementById('highlightText').innerText = optimalSolution;
    document.getElementById('highlightText').style.display = 'block';
}

function backtrackSolution(objects, keep, capacity) {
    const selectedItems = [];
    let currentCapacity = capacity;

    for (let i = objects.length; i > 0; i--) {
        if (keep[i][currentCapacity]) {
            selectedItems.push(i); 
            currentCapacity -= objects[i - 1].weight; 
        }
    }

    const totalWeight = selectedItems.reduce((sum, i) => sum + objects[i - 1].weight, 0);
    const totalValue = selectedItems.reduce((sum, i) => sum + objects[i - 1].value, 0);

    // Color the final selected values
    for (const num of selectedItems){
        let selectedRow = document.getElementById(`object_id_${num-1}`);
        selectedRow.style.color = 'white';
        selectedRow.style.backgroundColor = 'yellowgreen';
    }

    return `The optimal solution is to choose items ${selectedItems.reverse().join(", ")} with a total weight of ${totalWeight} and a total value of ${totalValue}.`;
}

function sleep(n) {
    return new Promise(resolve => {
        setTimeout(resolve, n)
    })
}