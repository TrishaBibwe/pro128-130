anthem="";
song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
anthemn = "";
songn= "";

function preload(){
 anthem = loadSound("anthem.mp3");
 song = loadSound("song.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.position(480, 200);
  
    video = createCapture(VIDEO);
    video.size(600,500);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    anthemn = anthem.isPlaying();
    console.log(anthemn);

    songn= song.isPlaying();
    console.log(songn);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        song.stop();
        if(anthemn == false){
            anthem.play();
        }
        else{
            console.log("Song Name: National Anthem");
            document.getElementById("song_id").innerHTML = "Song Name: National Anthem";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        anthem.stop();
        if(songn == false){
            song.play();
        }
        else{
            console.log("Song Name: National Song");
            document.getElementById("song_id").innerHTML = "Song Name: Natioanl Song";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}

















