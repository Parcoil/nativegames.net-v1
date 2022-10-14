function $_GET(q) { 
    var s = window.location.search; 
    var re = new RegExp('&'+q+'(?:=([^&]*))?(?=&|$)','i'); 
    return (s=s.replace(/^\?/,'&').match(re)) ? (typeof s[1] == 'undefined' ? '' : decodeURIComponent(s[1])) : undefined; 
}

function scoreScreenOnLoad() {
   
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
	    output = '<br/><br/><div class="resTitle">GOOD GAME!</div><br/><br/>';

	    output += '<table class="resultsTable">';

	    output += '<tr><td class="resultsLeft">Score:</td><td class="resultsRight">' + score.score + '</td></tr>';
	   
	   
		output += '<tr><td class="resultsLeft">Total Rank:</td><td class="resultsRight">'
		    + score.score + '</td></tr>';
		ranked = true;
	    output += '</table><br/><br/><br/>';

	    document.getElementById("highScores").innerHTML = highScores;

	    // if ranked, prompt for a name
	    
	}

