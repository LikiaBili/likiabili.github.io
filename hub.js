const customMotd = ["We rise","Lorem ipsum","We are not just games","What the hell are you doing",
    "SMG4!!!!!!!!!!!!!!","THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END IS NEVER THE END",
    "<a href='https://space.bilibili.com/14444480'>[[Hyperlink Blocked]]</a>"];
document.getElementById("motd").innerHTML = customMotd[Math.round(Math.random()*1000) % customMotd.length];