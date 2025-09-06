const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;


const highScore = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 5;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;

});

savehighscore = e => {
    console.log("clicked the save button");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScore.push(score);

    highScore.sort((a, b) => b.score - a.score);
    highScore.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScore));
    window.location.assign('/');
};