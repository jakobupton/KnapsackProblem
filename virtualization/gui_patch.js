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
    document.getElementById('virtualization_area').innerHTML = `

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


    inti_virtualization_element();
    const steps = knapsack_step_generator(objects, capacity);

    for (let step of steps) {
        handleMessage({data: JSON.stringify(step)})
        await sleep(1000);
    }
}


function sleep(n) {
    return new Promise(resolve => {
        setTimeout(resolve, n)
    })
}