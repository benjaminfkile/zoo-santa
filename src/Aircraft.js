import ApiStore from './ApiStore'

let Aircraft = []

function getLocation() {
  fetch(ApiStore + "/api/gps-data")
    .then(res => res.json())
    .then(res => {
      Aircraft.unshift(res)
    }).catch(error => console.log(error));
}

setInterval(function () {
  getLocation()
}, 3000);

getLocation()

export default Aircraft