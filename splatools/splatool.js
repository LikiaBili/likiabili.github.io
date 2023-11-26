var anarchyPoints = {
    wins:0,
    base:20,
    gold:0,
    silver:0,
    mode:0,
    onChange(){
        if(this.mode == 1){
            this.gold = 0;
            this.silver = 2 * this.wins;
        }else if(this.mode == 2){
            this.gold = this.wins+1;
            this.silver = 2 * this.wins + 2;
        }else if(this.mode == 3){
            if(this.wins == 5){
                this.gold = 21;
            }else{
                this.gold = (this.wins * 3) + 9;
            }
            this.silver = 0;
        }

        if(this.silver < 0){
            this.silver = 0;
        }
        if(this.gold < 0){
            this.gold = 0;
        }

        let tp = this.wins * this.base;
        if(this.wins == 2){
            tp += 5;
        }else if(this.wins == 3){
            tp += 15;
        }else if(this.wins == 4){
            tp += 30;
        }else if(this.wins == 5){
            tp += 50;
        }
        document.getElementById("ap_result").innerText = "= " + (this.gold * 5 + this.silver + tp) + "p";

        document.getElementById("ap_gold").innerText = this.gold;
        document.getElementById("ap_silver").innerText = this.silver;

        for(let i = 1;i <= 4;i++){
            document.getElementById("ap_rank"+i).style.background = "";
            document.getElementById("ap_rank"+i).style.color = "white";
        }
        for(let i = 0;i <= 5;i++){
            document.getElementById("ap_win"+i).style.background = "";
            document.getElementById("ap_win"+i).style.color = "white";
        }
        for(let i = 0;i <= 3;i++){
            document.getElementById("ap_temp"+i).style.background = "";
            document.getElementById("ap_temp"+i).style.color = "white";
        }

        document.getElementById("ap_rank"+((this.base-10)/10)).style.background = "no-repeat center/100% url('img/ui/selectedBg.png')";
        document.getElementById("ap_win"+this.wins).style.background = "no-repeat center/100% url('img/ui/selectedBg.png')";
        document.getElementById("ap_temp"+this.mode).style.background = "no-repeat center/100% url('img/ui/selectedBg.png')";
        document.getElementById("ap_rank"+((this.base-10)/10)).style.color = "black";
        document.getElementById("ap_win"+this.wins).style.color = "black";
        document.getElementById("ap_temp"+this.mode).style.color = "black";
    }
}
function set(type,attr,value){
    window[type][attr] = value;
    window[type].onChange();
}
function add(type,attr,value){
    window[type][attr] += value;
    window[type].onChange();
}
