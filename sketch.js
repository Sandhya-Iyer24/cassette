// sandhya iyer, project 5
// advanced creative coding
// taylor swift's 1989

// initialize all variables
let cassetteImg, reelImg, playImg, rewindImg, fwdImg, stopImg;
let font;
let angle = 0;
let sideButton, playButton, rewindButton, fwdButton, stopButton, 
visual1Button, visual2Button, visual3Button, visual4Button;
let sideA = true;
let wobbleNoise = 0;
let size = 50;
let fastForwardSound;
let song, songName;
let songA;
let songB;
let songNameA;
let songNameB;
let artistA;
let artistB;
let lofiButton, hissButton, wobbleButton;
let buttons = [];
let songs = [
  "Welcome To New York",
  "All You Had To Do Was Stay",
  "This Love",
  "Diet Mountain Dew",
  "Falling Behind",
  "Let it Be",
  "Super Trouper",
  "Test Drive",
  "Ban Ja Rani",
  "August",
  "After Midnight",
  "Pink Pony Club",
  "Almost (Sweet Music)",
  "Rocket Man",
  "Everybody Wants to Rule the World",
  
];
let artists = [
  "Taylor Swift",
  "Taylor Swift",
  "Taylor Swift",
  "Lana Del Ray",
  "Laufey",
  "The Beatles",
  "ABBA",
  "John Powell",
  "Guru Randhawa",
  "Taylor Swift",
  "Chappell Roan",
  "Chappell Roan",
  "Hozier",
  "Elton John",
  "Tears for Fears",

]
let fastForwarding = false;
let rewinding = false;

let button;
let filter;

function preload() {
  cassetteImg = loadImage("assets/cassette.png");
  lofiGirlImg = loadImage("assets/lofigirl.gif");
  reelImg = loadImage("assets/wheelorange.png");
  playImg = loadImage("assets/playbutton.png");
  rewindImg = loadImage("assets/rewindbutton.png");
  fwdImg = loadImage("assets/forwardbutton.png");
  stopImg = loadImage("assets/stopbutton.png");
  starImg = loadImage("assets/star.png");
  font = loadFont("assets/MondayFeelings.ttf"); // preload visual assets

  let index = floor(random(songs.length));
  songA = loadSound("assets/" + songs[index] + ".mp3");
  songNameA = songs[index]; // randomizes song choice from array
  artistA = artists[index];



  let index2 = floor(random(songs.length));
  if(index2 == index) {
    index2 = (index + 1) % songs.length; // ensure different song
  }
  songB = loadSound("assets/" + songs[index2] + ".mp3");
  songNameB = songs[index2];
  artistB = artists[index2];


  fastForwardSound = loadSound("assets/fastforward.mp3"); // preload sound asset
  hissSound = loadSound("assets/hiss.mp3");

  song = songA; // assign song and songName to current state (songA)
  songName = songNameA;
  artistName = artistA;
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // creates buttons
  sideButton = new SideButton(197, 439, 65, 60, flipSide);
  playButton = new ImageButton(playImg, 590, 560, playImg.width / 6, playImg.height / 6, play);
  rewindButton = new ImageButton(rewindImg, 420, 560, rewindImg.width / 6, rewindImg.height / 6, rewind);
  fwdButton = new ImageButton(fwdImg, 680, 560, fwdImg.width / 6, fwdImg.height / 6, fastForward);
  stopButton = new ImageButton(stopImg, 510, 560, stopImg.width / 6, stopImg.height / 6, stop);

  visual1Button = new CircleButton(505, 415, 15, 15);
  visual2Button = new CircleButton(535, 415, 15, 15);
  visual3Button = new CircleButton(565, 415, 15, 15);
  visual4Button = new CircleButton(595, 415, 15, 15);

  hissButton = new CircleButtonWithLabel("hiss", 840, 514, 15, 15);
  lofiButton = new CircleButtonWithLabel("lofi", 840, 544, 15, 15);
  wobbleButton = new CircleButtonWithLabel("wobble", 840, 574, 15, 15);

  buttons.push( //adds buttons to array
    sideButton,
    playButton,
    stopButton,
    rewindButton,
    fwdButton,
    visual1Button,
    visual2Button,
    visual3Button,
    visual4Button,
    lofiButton,
    hissButton,
    wobbleButton
  );

  fft = new p5.FFT();
  filter = new p5.LowPass();
  amplitude = new p5.Amplitude();
  songA.disconnect();
  songB.disconnect();
  songA.connect(filter);
  songB.connect(filter);
  filter.freq(21000);

}

function draw() {
  background(255);
  imageMode(CENTER);

  //let position = mouseX + " " + mouseY;
  //fill(0);

  // temporary to display x,y coords on screen
  //textSize(20);
  //textFont("Helvetica");
 // text(position, 50, 50);

  displayMagTape();
  // draw cassette image on screen
  //image(cassetteImg, 100 + cassetteImg.width / 2, 100 + cassetteImg.height / 2);
  image(cassetteImg, 100 + cassetteImg.width / 2, 100 + cassetteImg.height / 2);

  //draw song name
  displaySongName(songName);
  displayArtistName(artistName);
  displayReels();

  // draw buttons

  // buttons.forEach(function (element) {
  //   element.display();
  // });

  for(let i = 0; i < buttons.length; i++) {
    buttons[i].display();
  }

  if (visual1Button.state) {
    displayLofiGirl();
  }  

  if (visual2Button.state) {
    displayWaveform();
  }

  if (visual3Button.state) {
    displaySpectrum();
  } 

  if (visual4Button.state) {
    displayVisualize4();
  } 

  if(hissButton.state) {
    startHiss(); 
    } else {
    stopHiss();
  }

  if (lofiButton.state) {
    filter.freq(2200);
  } else {
    filter.freq(21000);
  }

  if (wobbleButton.state) {
    wobbleNoise += .01;
    let wobble = noise(wobbleNoise);
    let val = map(wobble, 0, 1, -.05, .05);
    song.rate(1 + val);
  }
}

function displayVisualize4() {
  let level = amplitude.getLevel();
  let initialSize = 1.5*(map(level, 0, 1, 0, 200));
  size = lerp(size, initialSize, 0.1);
  let hueValue = (frameCount * 2) % 360; // Cycling hue value
  
  // Convert hue value to color
  image(starImg, 200, 280, size, size);
  image(starImg, 180, 330, size, size);
  image(starImg, 220, 380, size, size);
  image(starImg, 880, 280, size, size);
  image(starImg, 920, 330, size, size);
  image(starImg, 900, 380, size, size);
  image(starImg, 270, 430, size, size);
  image(starImg, 350, 460, size, size);
  image(starImg, 420, 450, size, size);
  image(starImg, 700, 450, size, size);
  image(starImg, 520, 460, size, size);
  image(starImg, 600, 452, size, size);
}

function displayWaveform() {
  let waveform = fft.waveform();
  strokeWeight(2);
  stroke(219, 191, 223);
  noFill();
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 459, 632);
    let y = map(waveform[i], -1, 1, 400, 260);
    vertex(x, y);
  }
  endShape();
  noStroke();
}

function displaySpectrum() {
  fill(148, 63, 217, 100);
  rectMode(CORNER);
  let spectrum = fft.analyze();
  let len = spectrum.length - 256;
  for (let i = 0; i < len; i++) {
    let x = map(i, 0, len, 459, 632);
    let h = -100 + map(spectrum[i], 0, 255, 100, 0);
    rect(x, 377, width / len, h);
  }
}

function stopHiss() {
  hissSound.stop();
}

function startHiss() {
  if(song.isPlaying()) {
    if(!hissSound.isPlaying()) {
      hissSound.play();
      hissSound.setVolume(2);
      print("hiss sound playing");
    }
  } else {
    hissButton.state = false;
  }
}

function displayLofiGirl() {
  imageMode(CORNER);
  image(lofiGirlImg, 459, 279, lofiGirlImg.width / 2.8 - 6, lofiGirlImg.height / 2.5);
  imageMode(CENTER);
}


function fastForward() {
  if(song.isPlaying()) {
    fastForwarding = true;
    let position = song.currentTime() + 10;
    if(position > song.duration()) {
      position = 0;
    }
    song.jump(position);
    fastForwardSound.play();
    //setTimeout(stopFastForward, 2500);
  }
}

function stopFastforward() {
  fastForwarding = false;
  fastForwardSound.stop();
  song.play();
  let position = song.currentTime() + 10;
  if (position > song.duration()) {
    position = 0;
  }
}

function rewind() {
  if (song.isPlaying()) {
    let position = song.currentTime() - 10;
    if (position < 0) {
      position = 0;
    }
    song.jump(position);
    fastForwardSound.play();
    //setTimeout(stopFastForward, 2500);
  }
}

function flipSide() {
  print("flip");
  if (sideButton.state) {
    song.pause();
    songName = songNameB;
    song = songB;
    artistName = artistB;
    //song.play();
  } else {
    song.pause();
    songName = songNameA;
    song = songA;
    artistName = artistA;
    //song.play();
  }
}

function play() {
  if (!song.isPlaying()) {
    song.play();
  }
}
function stop() {
  if (song.isPlaying()) {
    song.pause();
  }
}
// check to see if each button is clicked on

function mousePressed() {
  for(let i = 0; i < buttons.length; i++) { // goes thrugh buttons in array, prints if clicked on
    if(buttons[i].isClickedOn()) {
      buttons[i].handleIt();
    }
  }
}

function displaySongName(name) {
  // draw song name on cassette
  textSize(25);
  fill(32, 29, 105);
  textFont(font);
  text(name, 210, 190);
}

function displayArtistName(name) {
  // draw artist name on cassette
  textSize(25);
  fill(32, 29, 105);
  textFont(font);
  text(name, 210, 224);
}

let magNoise = 0;

function displayMagTape() {
  let percent = song.currentTime() / song.duration(); //getting percentage of song played
  const min = 210;
  const max = 400;

  magNoise += 1;

  let leftNoise = noise(magNoise);
  let rightNoise = noise(magNoise + 10);

  let xLeftOffset = map( leftNoise, 0, -3, 3);
  let xRightOffset = map( rightNoise, 0, 1, -3, 3) *(1 - percent);

  leftSide = map(percent, 0, 1, min, max); //maps physical distance with total percent
  rightSide = map(1 - percent, 0, 1, min, max); //opposite
  //draw black mag tape
  fill(0);
  circle(359, 328, leftSide);
  circle(735, 328, rightSide);

  //draw wheel see through
  fill(255);
  circle(359, 328, 100);
  circle(735, 328, 100);
}

function displayReels() {
  let inc;

  if(song.isPlaying()) {
    if(sideButton.state) {
    inc = -2.0;
    } else {
      inc = 2;
    }
  } else {
    inc = 0;
  }
  angle = angle + inc;

// rotating reels

  push(); 
  translate(359, 328);
  rotate(radians(angle));
  image(reelImg, 0, 0);
  pop();

  push();
  translate(735, 328);
  rotate(radians(angle));
  image(reelImg, 0, 0);
  pop();
  }



