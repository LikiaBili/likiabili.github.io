let codes = 0;//experience
let bytes = 0;
let bytesPerClick = 1;
let bps = 0;
let rawbps = 0; //without multiplyer, for xp caculation
let bigConsole = document.getElementById("console");
var buildings = {keyboard:{price:15,bps:0.1,rawbps:0.1,amount:0}};

function handleClick() {
    codes = codes + 1;
    bytes = bytes + bytesPerClick;
    bigConsole.style.width = 200;
    bigConsole.style.height = 200;
    bigConsole.style.marginTop = 50;
}

function buyBuilding(id){
    if(bytes >= buildings[id]['price']){
        bytes -= buildings[id]['price'];
        buildings[id]['amount']++;
    }
}
function tenPerSecondUpdate(){
    //caculation
    bps = buildings['keyboard']['amount']*buildings['keyboard']['bps'];
    rawbps = buildings['keyboard']['amount']*buildings['keyboard']['rawbps'];
    bytes += bps/10;
    codes += rawbps/10;
    //display
    bytesDisplay.innerText = Math.round(bytes) + " bytes";
    linesDisplay.innerText = Math.round(codes) + " lines";
    if(bps != 0) {
        bpsDisplay.innerText = "bps: " + bps;
    }
}

setInterval(tenPerSecondUpdate,100);

document.getElementById('LoadingScreen').remove();
