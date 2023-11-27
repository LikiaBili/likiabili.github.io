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

var salmonNextPoints = {
    gold:0,
    power:0,
    rank:1,
    rankp:0,
    wave:0,
    onChange() {
        if(this.rank < 9 && this.rankp >= 100){
                this.rankp = 50;
        }else if(this.rankp >= 1000){
            this.rankp = 950;
        }

        for(i = 1;i <= 9;i++){
            document.getElementById("snp_rank"+i).style.background = "";
            document.getElementById("snp_rank"+i).style.color = "white";
        }
        for(i = 0;i <= 4;i++){
            document.getElementById("snp_wave"+i).style.background = "";
            document.getElementById("snp_wave"+i).style.color = "white";
        }
        document.getElementById("snp_power").innerText = this.power;
        document.getElementById("snp_gold").innerText = this.gold;
        document.getElementById("snp_rp").innerText = "≥"+this.rankp;

        document.getElementById("snp_rank"+this.rank).style.background = "no-repeat center/100% url('img/ui/selectedBg.png')";
        document.getElementById("snp_rank"+this.rank).style.color = "black";
        document.getElementById("snp_wave"+this.wave).style.background = "no-repeat center/100% url('img/ui/selectedBg.png')";
        document.getElementById("snp_wave"+this.wave).style.color = "black";

        let multi = this.rank*0.1 + 1.4 + Math.floor(this.rankp / 50) * 0.05;
        let add = Math.max(this.wave-2,0)*50;
        let eggp = this.gold + this.power/200;
        document.getElementById("snp_rmt").innerText = multi.toFixed(2)+"*";
        document.getElementById("snp_regg").innerText = eggp;
        document.getElementById("snp_rwv").innerText = "+"+add;
        document.getElementById("snp_result").innerText = "⠀≈⠀"+(eggp*multi+add)+"p";
    }
};

function set(type,attr,value){
    window[type][attr] = value;
    window[type].onChange();
}
function add(type,attr,value){
    window[type][attr] += value;
    window[type].onChange();
}
