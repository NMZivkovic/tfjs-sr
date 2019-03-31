let recognizer;

function calculateNewPosition(positionx, positiony, direction)
{
    return {
        'up' : [positionx, positiony - 10],
        'down': [positionx, positiony + 10],
        'left' : [positionx - 10, positiony],
        'right' : [positionx + 10, positiony],
        'default': [positionx, positiony]
    }[direction];
}

function predict(contex, positionx, positiony) {
 const words = recognizer.wordLabels();
 recognizer.listen(({scores}) => {
   scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
   scores.sort((s1, s2) => s2.score - s1.score);

    var direction = scores[0].word;
    var [x1, y1] = calculateNewPosition(positionx, positiony, direction);

    contex.moveTo(positionx,positiony);
    contex.lineTo(x1, y1);
    contex.closePath();
    contex.stroke();

    positionx = x1;
    positiony = y1;
 }, {probabilityThreshold: 0.75});
}

async function run() {
 recognizer = speechCommands.create('BROWSER_FFT', 'directional4w');
 await recognizer.ensureModelLoaded();

 var canvas = document.getElementById("canvas");
 var contex = canvas.getContext("2d");
 contex.lineWidth = 10;
 contex.lineJoin = 'round';
 
 var positionx = 400;
 var positiony = 500;

 predict(contex, positionx, positiony);
}

run();