song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
scorerightwrist=0;


function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,425);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    model=ml5.poseNet(video,modelloaded);
    model.on('pose', gotposes);
}



function modelloaded(){
console.log("Model loaded");
}

function gotposes(results){
    if(results.length>0){
        console.log(results);

        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log(leftwristx+"leftwristx"+leftwristy+"leftwristy");

        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log(rightwristx+"rightwristx"+rightwristy+"rightwristy");

        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist-"+scoreleftwrist);

        
        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("scorerightwrist-"+scorerightwrist);
    }
}

function play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}

function draw(){
    image(video,0,0,600,425);
    fill("#ff0000");
    stroke("#ff0000");
    if(scoreleftwrist>0.2){
        circle(leftwristx,leftwristy,20);
        a=Number(leftwristy);
        b=floor(a);
        volume=b/425;
        document.getElementById("volume").innerHTML="volume:"+volume;
        song.setVolume(volume);

    }

    if(scorerightwrist>0.2){
        circle(rightwristx,rightwristy,20);
        if(rightwristy>0 && rightwristy<=100){
            song.rate(0.5);
            document.getElementById("speed_text").innerHTML="Speed:0.5x";
        }

       else if(rightwristy>100 && rightwristy<=200){
            song.rate(1);
            document.getElementById("speed_text").innerHTML="Speed:1x";
        }

        else if(rightwristy>200 && rightwristy<=300){
            song.rate(1.5);
            document.getElementById("speed_text").innerHTML="Speed:1.5x";
        }

        else if(rightwristy>300 && rightwristy<=400){
            song.rate(2);
            document.getElementById("speed_text").innerHTML="Speed:2x";
        }

        else if(rightwristy>400 && rightwristy<=425){
            song.rate(2.5);
            document.getElementById("speed_text").innerHTML="Speed:2.5x";
        }
    }
}

