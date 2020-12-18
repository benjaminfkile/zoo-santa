import ApiStore from './ApiStore'

let Aircraft = [{ data: null }]

function monitorCraft() {

    fetch(ApiStore + '/api/santa')
        .then(res => res.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => { Aircraft.unshift({ data: data }) })
        .catch(() => alert("blocked by browser"))
}

setInterval(function () {
    monitorCraft()
}, 10000);

monitorCraft()

export default Aircraft
