'use strict'

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var v = document.getElementById("demo-video");
var flag = true;


//getCurrentTime: 動画再生中であれば動画時間(s), ポーズ中は-1, 動画終了時-2 を返す
function getCurrentTime(){
    if(console.currentTime!=0 && !v.ended && !v.paused){
        return v.currentTime;
    }else if(v.ended){
        return -2;
    }else{
        return -1;
    }
}

function playing(){
    if(flag){
        flag = false;
        setTimeout(function(){
            v.play();
        },3000);

        var id = setInterval(function(){
            if(getCurrentTime()>0){
                commToPy();
            }else if(getCurrentTime()==-2){
                clearInterval(id);
            }
        }, 50); //50ms ごとにpython側へ動画の再生時間の情報を送る
    }
}

async function commToPy() {
    //console.log("test");
    let val = await eel.analyze(getCurrentTime)();
    //console.log(val + " from Python");

    deleteCanvas();
    drawMatchRate(val.score);
    drawStickFig(val.landmark);
}

function deleteCanvas(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
}

//val(得点) に応じてゲージ的なものを描画
function drawMatchRate(val){
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 100-val+10, 50, val);
}

function drawStickFig(val){

    for(var i=0;i<13;i++){
        if(val[i][0]>=0 && val[i][1]>=0){
            ctx.beginPath();
            ctx.arc(val[i][0], val[i][1], 10, 0, Math.PI*2, false);
            ctx.fill();
        }
    }

    //ryou kata no juusin
    if(val[1][0]>=0 && val[4][0]>=0 && val[1][1]>=0 && val[4][1]>=0){
        var juusin = [(val[1][0]+val[4][0])/2, (val[1][1]+val[4][1])/2];
    }else{
        var juusin = [-1,-1];
    }

    drawLine(val[0], juusin);
    drawLine(val[1], val[4]);
    drawLine(val[1], val[2]);
    drawLine(val[2], val[3]);
    drawLine(val[4], val[5]);
    drawLine(val[5], val[6]);
    drawLine(juusin, val[7]);
    drawLine(val[7], val[8]);
    drawLine(val[8], val[9]);
    drawLine(juusin, val[10]);
    drawLine(val[10], val[11]);
    drawLine(val[11], val[12]);

}

function drawLine(p1, p2){
    if(p1[0]<0 || p1[1]<0 || p2[0]<0 || p2[1]<0){
        return false;
    }
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "aliceblue";
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0],p2[1]);
    ctx.stroke();
}