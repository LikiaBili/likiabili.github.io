const languages = ["english","chinese"];
function selectLang(){
    for (lang in languages){
        lang = languages[lang];
        document.getElementById(lang).style.display = "none";
    }
    document.getElementById(document.getElementById("langSel").value).style.display = "unset";
}