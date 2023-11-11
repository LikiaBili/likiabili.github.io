//Stack class from https://www.gehttps://www.geeksforgeeks.org/implementation-stack-javascript/eksforgeeks.org/implementation-stack-javascript/
class Stack {

    // Array is used to implement stack
    constructor()
    {
        this.items = [];
    }

    push(element)
    {
        // push element into the items
        this.items.push(element);
    }
    pop()
    {
        // return top most element in the stack
        // and removes it from the stack
        return this.items.pop();
    }
    top()
    {
        // return the top most element from the stack
        // but doesn`t delete it.
        return this.items[this.items.length-1];
    }
    peek(location)
    {
        // return the element from the stack
        return this.items[location];
    }
    isEmpty()
    {
        // return true if stack is empty
        return this.items.length == 0;
    }
    printStack()
    {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}

var codes = 0;//experience
var bytes = 0;
var bytesPerClick = 1;
var bps = 0;
var rawBps = 0; //without multiplyer, for xp caculation
var bigConsole = document.getElementById("console");

var buildings = {
    keyboard:{basePrice:15,bps:0.1,rawBps:0.1,amount:0,price:0},
    programmer:{basePrice:150,bps:1,rawBps:1,amount:0,price:0},
    crawler:{basePrice:2000,bps:10,rawBps:10,amount:0,price:0},
    miner:{basePrice:40000,bps:150,rawBps:150,amount:0,price:0}};
var stats = {
    lifetimeBytes:0
};

var buildingsSavesIndex = ["amount"];
var savingVariables = ["codes","bytes"];

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
        return {icon:"img/buildings/programmer.png",
            title:"Programmer",
            desc:"A nice programmer to code.<br><br>" +
                "You owned "+buildings['programmer']['amount']+" which is making "+buildings['programmer']['bps'] * buildings['programmer']['amount']+" bytes per second <br>" +
                "Type out "+buildings['programmer']['bps']+" bytes every second each"};
    }},
    build_3_shop:{get(){
            calcBuildingPrice('crawler');
            return {icon:"img/buildings/crawler.png",
                title:"Crawler",
                desc:"Crawls free code from StackOverFlow and fourms.<br>" +
                    "You owned "+buildings['crawler']['amount']+" which is making "+buildings['crawler']['bps'] * buildings['crawler']['amount']+" bytes per second <br>" +
                    "Crawl out "+buildings['crawler']['bps']+" bytes every second each"};
        }},
    build_4_shop:{get(){
        calcBuildingPrice('miner');
        return {icon:"img/buildings/miner.png",
            title:"Miner",
            desc:"Mines fresh digital currencys in the internet.<br>" +
                "You owned "+buildings['miner']['amount']+" which is making "+buildings['miner']['bps'] * buildings['miner']['amount']+" bytes per second <br>" +
                "Mine out "+buildings['miner']['bps']+" bytes every second each"};
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

function addBytes(amount){
    bytes = Math.round((bytes + amount)*1000)/1000;
}
function addCodes(amount){
    codes = Math.round((codes + amount)*1000)/1000;
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
    //some graphics
    document.getElementById("notifys").style.left = (window.innerWidth/2 - document.getElementById("notifys").offsetWidth/2) + "px";

    //caculation
    addBytes(bps/10);
    addCodes(rawBps/10);
    
    //display
    document.getElementById("bytesDisplay").innerText = Math.round(bytes) + " bytes";
    document.getElementById("linesDisplay").innerText = Math.round(codes) + " lines";
    if(bps !== 0) {
        document.getElementById("bpsDisplay").innerText = "bps: " + bps;
    }else{
        document.getElementById("bpsDisplay").innerText = "";
    }

    for(let buildingIndex in buildings){
        document.getElementById("building_count_"+buildingIndex).innerText = buildings[buildingIndex]['amount'];
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
        if(tooltip['icon'] != null){
            document.getElementById("hoverIcon").style.display = "unset";
            document.getElementById("hoverIcon").src = tooltip['icon'];
        }else{
            document.getElementById("hoverIcon").style.display = "none";
        }
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
        addBytes(buildings[id]['price']*-1);
        buildings[id]['amount']++;
        document.getElementById("building_"+id).style.boxShadow = "0 0 40px 0px rgba(0,255,0,0.6) inset";
        setTimeout(function(){
            document.getElementById("building_"+id).style = "";
        },300);
    }else{
        document.getElementById("building_"+id).style.boxShadow = "0 0 40px 0px rgba(255,0,0,0.6) inset";
        setTimeout(function(){
            document.getElementById("building_"+id).style = "";
        },300);
    }
}

//These following functions are for savegame encode and decodes
//encrypt and decrypt is actually for make the savecode look pretty
//and prevent some random player to just directly edit the save file (such as game version or metadatas) and corrupt it
function numberToString(number){
    return number.toString(32);
}
function stringToNumber(string){
    return parseInt(string,32);
}
function encryptSave(string){
    return btoa(string);
}
function decryptSave(string){
    return atob(string);
}

function getCookie(name){
    let key = "";
    let mode = 1;
    for(let char in document.cookie){
        char = document.cookie[char];
        if(char != ' ') {
            if (mode == 1) {
                if (char === '=') {
                    if (key === name) {
                        mode = 3;
                    } else {
                        mode = 2;
                    }
                    key = "";
                } else {
                    key += char;
                }
            } else {
                if (char === ';') {
                    if(mode == 3){
                        return key;
                    }
                    key = "";
                    mode = 1;
                }else{
                    key += char;
                }
            }
        }
        //console.log(key);
    }
    if(mode == 3){
        return key;
    }
}
function generateSavegameCode(){
    var saveCode = "buildings{";
    for(buildingIndex in buildings){
        saveCode+= buildingIndex+"{";
        for(buildingsSaveIndexIndex in buildingsSavesIndex){ // WTF??
            saveCode += (buildingsSavesIndex[buildingsSaveIndexIndex] + ":" + numberToString(buildings[buildingIndex][buildingsSavesIndex[buildingsSaveIndexIndex]]) + ";");
        }
        saveCode+= "}";
    }
    saveCode += "}variables{";
    for(saveIndex in savingVariables){
        saveCode += (savingVariables[saveIndex] + ":" + numberToString(window[savingVariables[saveIndex]]) + ";");
    }
    saveCode += "}";
    return encryptSave(saveCode);
}
function saveGame(){
    document.cookie = "savegame=" + generateSavegameCode() + ";saveVersion=REI1_0;";
    notification({
        title:"Game saved!",
        text:"Your game was saved to your cookie just now.",
        icon:"img/ui/savegame.png",
        time:10
    });
}
function setValueBySavegameIndex(stack,key,value){
    value = stringToNumber(value);
    //console.log(key+":"+value+";");
    if(stack.peek(0) === "buildings"){
        buildings[stack.peek(1)][key] = value;
    }else if(stack.peek(0) === "variables"){
        window[key] = value;
    }
}
function loadGame(savegame){
    if(savegame == null){
        savegame = getCookie("savegame");
    }

    savegame = decryptSave(savegame);
    var stack = new Stack();
    var temp = {key:"",value:"",first:true};
    for(char in savegame){
        char = savegame[char];
        if(temp['first']){
            if(char == '}'){
                stack.pop();
            }else if(char == '{'){
                stack.push(temp['key']);
                temp['key'] = "";
            }else if(char == ':'){
                temp['first'] = false;
            }else{
                temp['key'] += char;
            }
        }else{
            if(char == ';'){
                temp['first'] = true;
                setValueBySavegameIndex(stack,temp['key'],temp['value']);
                temp['key'] = "";
                temp['value'] = "";
            }else{
                temp['value'] += char;
            }
        }
    }
}

function generateUUID(){
    return Date.now()+"_"+Math.round(Math.random()*1000000);
}

// {
//  icon: icon of the notify, if present
//  title: title of it
//  text: html text of the notify
//  time: time until autoclose
// }
var popups = [];
function notification(notify){
    let popup = document.createElement("div");
    let uuid = generateUUID();
    popup.id = "popup_"+uuid;
    popup.className = "notifyPopup";
    if(notify['icon'] != null) {
        popup.innerHTML =
            "            <div class=\"close\" onclick=\"document.getElementById('popup_" + uuid + "').remove()\">" +
            "<img style=\"height: 100%;width:100%;image-rendering: smooth\" src=\"img/ui/close.png\"></div>\n" +
            "            <div class=\"tooltipTop\">\n" +
            "                <img class=\"tooltipIcon\" src=\"" + notify['icon'] + "\">\n" +
            "                <h3 class=\"tooltipTitle\" >" + notify['title'] + "</h3>\n" +
            "            </div>\n" +
            "            <p class=\"tooltipDesc\">" + notify['text'] + "</p>\n"
    }else{
        popup.innerHTML =
            "            <div class=\"close\" onclick=\"document.getElementById('popup_" + uuid + "').remove()\">" +
            "<img style=\"height: 100%;width:100%;image-rendering: smooth\" src=\"img/ui/close.png\"></div>\n" +
            "            <div class=\"tooltipTop\">\n" +
            "                <h3 class=\"tooltipTitle\" >" + notify['title'] + "</h3>\n" +
            "            </div>\n" +
            "            <p class=\"tooltipDesc\">" + notify['text'] + "</p>\n"
    }
    document.getElementById("notifys").appendChild(popup);

    if(notify['time'] != null){
        setTimeout(function(){
            if(document.getElementById('popup_' + uuid) != null) {
                document.getElementById('popup_' + uuid).remove()
            }
        },notify['time']*1000);
    }
}

document.addEventListener("mousemove", logMouseMove);

if(getCookie("saveVersion") != null){
    loadGame();
}

//these are the interval functions that runs automatic once a series of time, like frame updates
var intervalFunctions =
        {hover:{func:hoverUpdate,time:50},
        hundms:{func:tenPerSecondUpdate,time:100},
        building:{func:buildingUpdate,time:500},
        savegame:{func:saveGame,time:120000}};
for(i in intervalFunctions){
    intervalFunctions[i].func();
    setInterval(intervalFunctions[i].func,intervalFunctions[i].time);
}

document.getElementById('LoadingScreen').remove();