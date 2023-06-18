function getXmlHttp() {
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
	return new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
	return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function highScoresOnLoad() {
    // div called id=highScoreDiv
	const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
     dailyOutput = '<table class="highScoreTable"><tr class="highScoreTableHeader"><td>#</td><td>Date</td><td>Score</td></tr>';
    dailyScoreList = highScores,
	    dailyOutput;
	   

	   

	    for (i = 0; i < dailyScoreList.length; i += 1) {
		curScore = dailyScoreList[i];
		dailyOutput += '<tr><td>' + (i+1) + '</td><td>' + curScore.date + '</td><td>' + curScore.score + '</td></tr>';
	    }

	    dailyOutput += '</table>';

	    document.getElementById("dailyScoreDiv").innerHTML = dailyOutput;
	}
    

