let codes = 0;//experience
let bytes = 0;
let bytesPerClick = 1;
let bps = 0;
let rawbps = 0; //without multiplyer, for xp caculation
let bigConsole = document.getElementById("console");
var buildings = {
    keyboard:{basePrice:15,bps:0.1,rawbps:0.1,amount:0,price:0},
    programmer:{basePrice:150,bps:1,rawbps:1,amount:0,price:0}};
var hoverMessages = {
    build_1_shop:{get(){
        calcBuildingPrice('keyboard');
        return {icon:"img/buildings/keyboard.png",
               title:"Keyboard",
               desc:"A keyboard auto writes one line of code per ten seconds.<br><br>" +
                   "You owned "+buildings['keyboard']['amount']+" which is making "+buildings['keyboard']['bps'] * buildings['keyboard']['amount']+" bytes per second <br>" +
                   "Type out "+buildings['keyboard']['bps']+" bytes every second each"};
    }},
    build_2_shop:{get(){
        calcBuildingPrice('programmer');
        return {icon:"img/console.png",
               title:"Programmer",
            desc:"A nice programmer to code.<br><br>" +
                "You owned "+buildings['programmer']['amount']+" which is making "+buildings['programmer']['bps'] * buildings['programmer']['amount']+" bytes per second <br>" +
                "Type out "+buildings['programmer']['bps']+" bytes every second each"};
    }}};
let hovering = 0;
let hoverDisplayElement = document.getElementById('hoverTooltip');
var Mouse = {X:0,Y:0};
var Screen = {X:0,Y:0};

function handleClick() {
    codes = codes + 1;
    bytes = bytes + bytesPerClick;
    bigConsole.style.width = 200;
    bigConsole.style.height = 200;
    bigConsole.style.marginTop = 50;
}
function hoverIn(id){
  hovering = id;
}
function hoverOut(id){
  if(hovering == id){
    hovering = 0;
  }
}

function logMouseMove(e){
    Mouse.X = e.clientX;
    Mouse.Y = e.clientY;
    Screen.X = e.screenX;
    Screen.Y = e.screenY;
}

function buildingUpdate(){ 
    //this does the price, bps recaculate etc.
    var tmpBps = 0;
    var rawBpsTmp = 0;
    var curBps;
    for(id in buildings){
        calcBuildingPrice(id);
        curBps = buildings[id]['bps'] * buildings[id]['amount'];
        rawBpsTmp += buildings[id]['rawBps'] * buildings[id]['amount'];
        document.getElementById(id+"_cost").innerText = buildings[id]['price'] + "Bytes";

        tmpBps += curBps;
    }
    bps = Math.round(tmpBps*10)/10;
    rawBps = Math.round(rawBpsTmp*10)/10;
}
function tenPerSecondUpdate(){
    //caculation
    bytes += bps/10;
    codes += rawbps/10;
    bytes = Math.round(bytes*100)/100;
    codes = Math.round(codes*100)/100;
    
    //display
    document.getElementById("bytesDisplay").innerText = Math.round(bytes) + " bytes";
    document.getElementById("linesDisplay").innerText = Math.round(codes) + " lines";
    if(bps !== 0) {
        document.getElementById("bpsDisplay").innerText = "bps: " + bps;
    }
}
function hoverUpdate(){
    if(hovering != 0){
        hoverDisplayElement.style.top = (Mouse.Y+20)+"px";
        hoverDisplayElement.style.left = (Mouse.X+20)+"px";
        hoverDisplayElement.style.display = "initial";
        let tooltip = hoverMessages[hovering].get();
        document.getElementById("hoverTitle").innerHTML = tooltip['title'];
        document.getElementById("hoverDesc").innerHTML = tooltip['desc'];
        document.getElementById("hoverIcon").src = tooltip['icon'];
    }else{
        hoverDisplayElement.style.display = "none";
    }
}

function calcBuildingPrice(id){
    buildings[id]['price'] = Math.round(buildings[id]['basePrice']*(1.15 ** buildings[id]['amount']));
}
function buyBuilding(id){
    calcBuildingPrice(id);
    if(bytes >= buildings[id]['price']){
        bytes -= buildings[id]['price'];
        buildings[id]['amount']++;
    }
}

var intervalFunctions = {hover:{func:hoverUpdate,time:50},hundms:{func:tenPerSecondUpdate,time:100},building:{func:buildingUpdate,time:500}};
for(i in intervalFunctions){
    intervalFunctions[i].func();
    setInterval(intervalFunctions[i].func,intervalFunctions[i].time);
}

document.addEventListener("mousemove", logMouseMove);

document.getElementById('LoadingScreen').remove();
