const customMotd = ["We rise","Lorem ipsum","We are not just games","What the hell are you doing",
    "SMG4!!!!!!!!!!!!!!","THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END","1145141919810","WELCOME TO <del>OSU</del>Likia's Site!!!","Beep beep I'm a sheep i said Beep beep I'm a sheep",
    "<a href='https://space.bilibili.com/14444480'>[[Hyperlink Blocked]]</a>"];
document.getElementById("motd").innerHTML = customMotd[Math.round(Math.random()*1000) % customMotd.length];
const translation = {
    chinese:{
        introText : "Likia Studios, 一个人的游戏工作室",
        title_devlog : "开发日志",
        switch_lang : "Switch to English",
        cc_desc : "受Cookie Clicker启发的一个围绕程序员和代码的策略类放置游戏",
        links_title : "咱的连接",
        indev : "开发中"
    },
    english:{
        introText : "Likia Studios, A game studio with only Likia",
        title_devlog : "Devlogs",
        switch_lang : "切换为中文",
        cc_desc: "A strategy incremental game, inspired by Cookie Clicker",
        links_title : "Some links",
        indev : "Indev"
    }
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

function setLanguage(lang){
    document.cookie = "language="+lang+";";
    location.reload();
}

function switchLanguage(){
    if(getCookie("language") == "english"){
        setLanguage("chinese");
    }else{
        setLanguage("english");
    }
}

var language;
if(getCookie("language") == null){
    document.cookie = "language=english;";
    language = "english";
}else{
    language = getCookie("language");
}

for(key in translation[language]){
    if(document.getElementById("gtrans_"+key) != null) {
        document.getElementById("gtrans_" + key).innerHTML = translation[language][key];
    }
}
