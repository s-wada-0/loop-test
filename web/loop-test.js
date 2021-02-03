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
        }, 1000); //1000ms ごとにpython側へ動画の再生時間の情報を送る
    }
}

async function commToPy() {
    //console.log("test");
    let val = await eel.analyze(getCurrentTime)();
    console.log(val + " from Python");

    drawMatchRate(val);
}

//val(得点) に応じてゲージ的なものを描画
function drawMatchRate(val){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 100-val+10, 50, val);
}