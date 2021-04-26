import ApiStore from './ApiStore'

let Aircraft = {}
let Debug = true;
let tmpData = new Uint8Array(12);

function getLocationData(url) {
    const req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.send(null);
    const bytes = Object.keys(req.responseText).length;
    let temp = new Uint8Array(bytes)
    for (let i = 0; i < bytes; i++) {
        temp[i] = req.responseText[i].charCodeAt(0);
    }
    tmpData = temp
    DecodeData(temp)
}

function padLatLonDec(num) {
    num = num.toString();
    while (num.length < 5) num = "0" + num;
    return num;
}

function DebugPrint(tmpStr, indent = true) {
    if (Debug) {
        if (indent)
            console.log("\t" + tmpStr);
        else
            console.log(tmpStr);
    }
}

function DecodeData(data) {
    DebugPrint("BINARY DATA ARRAY = " + tmpData);
    DebugPrint('DecodeData(tmpData);');
    let NewLatN = (data[0] >> 1) & 0x7f;
    let NewLatD = ((data[0] & 0x01) << 16);
    NewLatD += ((data[1] & 0xff) << 8);
    NewLatD += (data[2] & 0xff);
    let NewLat = parseFloat(NewLatN + "." + padLatLonDec(NewLatD));
    Aircraft.lat = NewLat
    DebugPrint("Lat = " + NewLat);
    let NewLonN = (data[3] >> 1) & 0x7f;
    let NewLonD = ((data[3] & 0x01) << 16);
    NewLonD += ((data[4] & 0xff) << 8);
    NewLonD += (data[5] & 0xff);
    let NewLon = parseFloat("-" + NewLonN + "." + padLatLonDec(NewLonD));
    Aircraft.lon = NewLon
    DebugPrint("Lon = " + NewLon);
    let NewSpeed = data[6];
    Aircraft.speed = NewSpeed
    DebugPrint("Speed = " + NewSpeed);
    let NewTemp = data[7] & 0x80 ? (data[7] ^ 0x80) * -1 : data[7];
    Aircraft.temp = NewTemp
    DebugPrint("Temp = " + NewTemp);
    let NewAlt = (data[8] << 9);
    NewAlt += (data[9] << 1);
    NewAlt += (data[10] >> 7);
    Aircraft.alt = NewAlt
    DebugPrint("Altitude = " + NewAlt);
    let NewBear = (data[10] & 0x7f) << 2;
    NewBear += ((data[11] >> 6) & 0x03);
    Aircraft.bear = NewBear
    DebugPrint("Bearing = " + NewBear);
    let NewMode = "";
    let NewModeData = (data[11] >> 3) & 0x07;
    switch (NewModeData) {
        case 0:
            NewMode = "pre-show";
            break;
        case 1:
            NewMode = "run-show";
            break;
        case 2:
            NewMode = "end-show";
            break;
    }
    Aircraft.mode = NewMode
}

setInterval(function () {
    getLocationData(ApiStore + '/api/location-data')
}, 5000);

getLocationData(ApiStore + '/api/location-data')

export default Aircraft
