<!DOCTYPE html>
<html>
<head>
	<script src="/A2EB891D63C8/avg_ls_dom.js" type="text/javascript"></script>
	<title>blackjack</title>
	<link href= "/css/style.css" type="text/css" rel="stylesheet"/>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />						
</head>
<body>	
	<div id="header">
		<a href='/' id="headerimage" title="Card Counter's Blackjack"><h1>Card Counter's Blackjack</h1></a>
	</div>
	
	<div id="wrapper">
		<!-- game status panel -->
		<div id="statusBox">
			<div id="dealerScore" class="scoreBox"> <span id="dealerScoreText" class="scoreText">Dealer's Hand:</span></div>
			<div id="status" class="scoreBox"><span id="statusText" class="scoreText"></span></div>
			<div id="playerScore" class="scoreBox"> <span id="playerScoreText" class="scoreText">Player's Hand:</span></div>
		</div>
		<!-- Help / Info Panel -->
		<div id="helpwindow">
			<!-- Card Count Info -->	
			<div id="cardCountBox">COUNT: <span id="countText">0</span></div>
			<!-- Wager Info -->	
			<div id="wagerBox">
				<p>
					<label class="wagerLabel">BALANCE:</label>
					<span id="balanceAmount"></span>
				</p>
				<p>
					<label for="spinner">Bet Amount:</label>
					<input id="spinner" name="wager">
				</p>
				minimum bet: $20 <br/> 
				maximum bet: $500<br/>
			</div>
			<!-- info tab -->				
			<div id="tabs">
			  <ul>
				<li><a href="#tabs-1">Basics</a></li>			  
				<li><a href="#tabs-2">What is Card Counting?</a></li>
			  </ul>
			  <div id="tabs-1">
				<span class="tabContentHeader">+1 to the count for each:</span><br/>
				<span class="tabContent">2, 3, 4, 5, 6</span><br/>
				<span class="tabContentHeader">-1 to the count for each:</span><br/>
				<span class="tabContent">10, J, Q, K, A</span><br/>
				<br/>
				<p> when the count is higher, there are more tens and aces in the deck.  Conversely, when the count is lower, there are more small cards in deck.</p>
			  </div>
			  <div id="tabs-2">
				<p>The underlying principle behind card counting is that a deck rich in tens and aces is good for the player, a deck rich in small cards is good for the dealer. When the counter knows the odds are in his favor, he will bet more, and adjust his playing strategy to stand, and double in some plays where basic strategy says to stand.  -from wikipedia</p>
			  </div>			  
			</div>
		</div>	
		
		<!-- the table -->	
		<div id="table">
		<!-- the dealer's hand -->	
			<div id="dealerhand"></div>
			<!-- the place to put chips (future enhancement) -->	
			<div id="midtable"></div>
			<!-- the Player's hand -->	
			<div id="playerhand"></div>
		</div>
		<!-- the control buttons -->	
		<div id="controls">
			<img id="hit_button" class="controlbuttons" src="images/hit.png" alt="hit button">
			<img id="stand_button" class="controlbuttons" src="images/stand.png" alt="stand button" >
			<img id="double_button" class="controlbuttons" src="images/double.png" alt="double button" >
			<img id="deal_button" class="controlbuttons" src="images/deal.png" alt="deal button"  >			
		</div>
	</div>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="/js/jquery.mousewheel.js"></script>
	<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
	<script type="text/javascript" src="/js/blackjack.js"></script>
	
</body>
</html>