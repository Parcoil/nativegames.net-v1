

  
  
  
  function saveHighScore(score, highScores) {
    const NO_OF_HIGH_SCORES = 10;
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(NO_OF_HIGH_SCORES);
  
    localStorage.setItem('highScores', JSON.stringify(highScores));
    console.log(JSON.stringify(highScores))
  }
  function changescore() {
    const jsonScores = localStorage.getItem('highScores')
    if (jsonScores !== null) {
      const parse = JSON.parse(jsonScores);
      const bestScore = parse[0];
  document.getElementById("bestscore").innerHTML = bestScore.score;
     } else {
      document.getElementById("bestscore").innerHTML = "Haven't Played Yet";
    }
  }
