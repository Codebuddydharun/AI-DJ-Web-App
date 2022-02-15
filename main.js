song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;

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

function draw(){
    image(video,0,0,600,425);
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
    }
}

function play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}