let codes = 0;//experience
let bytes = 0;
let bytesPerClick = 1;
let bps = 0;
let rawbps = 0; //without multiplyer, for xp caculation
let bigConsole = document.getElementById("console");
var buildings = {keyboard:{basePrice:15,bps:0.1,rawbps:0.1,amount:0,price:0},
                programmer:{basePrice:150,bps:1,rawbps:1,amount:0,price:0}};
var hoverMessages = {
    build_1_shop:{get:function(){
        calcBuildingPrice('keyboard');
        return {icon:"img/buildings/keyboard.png",
               title:"Keyboard",
               desc:"A keyboard writes one line of code per ten seconds.<br>Making ${buildings['keyboard']['bps'] * buildings['keyboard']['amount']}<br>Produce: ${buildings['keyboard']['bps']} bytes per second"};
    }},
    build_2_shop:{get:function(){
        calcBuildingPrice('programmer');
        return {icon:"img/console.png",
               title:"Programmer",
               desc:"A nice programmer to write more code.<br>Making ${buildings['programmer']['bps'] * buildings['programmer']['amount']}<br>Produce: ${buildings['programmer']['bps']} bytes per second"};
    }}};
let hovering = 0;

function handleClick() {
    codes = codes + 1;
    bytes = bytes + bytesPerClick;
    bigConsole.style.width = 200;
    bigConsole.style.height = 200;
    bigConsole.style.marginTop = 50;
}

function buildingUpdate(){ 
    //this does the price, bps recaculate etc.
    var tmpBps = 0;
    for(id in buildings){
        tmpBps += buildings[id]['bps'] * buildings[id]['amount'];
    }
    bps = Math.round(tmpBps*10)/10;
}
function tenPerSecondUpdate(){
    //caculation
    bps = buildings['keyboard']['amount']*buildings['keyboard']['bps'];
    rawbps = buildings['keyboard']['amount']*buildings['keyboard']['rawbps'];
    bytes += bps/10;
    codes += rawbps/10;
    bytes = Math.round(bytes*10)/10;
    codes = Math.round(codes*10)/10;
    
    //display
    bytesDisplay.innerText = bytes + " bytes";
    linesDisplay.innerText = codes + " lines";
    if(bps != 0) {
        bpsDisplay.innerText = "bps: " + bps;
    }
}
function hoverUpdate(){
    if(hovering != 0){
        
    }
}

function calcBuildingPrice(id){
    buildings[id]['price'] = buildings[id]['basePrice']*(1.15 ** buildings[id]['amount']);
}
function buyBuilding(id){
    calcBuildingPrice(id);
    if(bytes >= buildings[id]['price']){
        bytes -= buildings[id]['price'];
        buildings[id]['amount']++;
    }
}

setInterval(hoverUpdate,50);
setInterval(tenPerSecondUpdate,100);
setInterval(buildingUpdate,1000);

document.getElementById('LoadingScreen').remove();
