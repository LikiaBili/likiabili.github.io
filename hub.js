const customMotd = ["We rise","Lorem ipsum","We are not just games","What the hell are you doing",
    "SMG4!!!!!!!!!!!!!!","THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END","1145141919810","WELCOME TO <del>OSU</del>Likia's Site!!!","Beep beep I'm a sheep i said Beep beep I'm a sheep",
    "<a href='https://space.bilibili.com/14444480'>[[Hyperlink Blocked]]</a>"];
document.getElementById("motd").innerHTML = customMotd[Math.round(Math.random()*1000) % customMotd.length];
