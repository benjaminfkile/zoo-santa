import ApiStore from './ApiStore'

let Aircraft = [{ data: null }]

function monitorCraft() {

    fetch(ApiStore + '/api/gps-data')
    .then(response => response.json())
    .then(data => {
        Aircraft[0].data = data
    })
}

setInterval(function () {
    monitorCraft()
}, 1000);

monitorCraft()

export default Aircraft
