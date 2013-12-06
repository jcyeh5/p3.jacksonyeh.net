<!DOCTYPE html>
<html>
<head>
	<script src="/A2EB891D63C8/avg_ls_dom.js" type="text/javascript"></script>
	<title>blackjack</title>
	<link href= "/css/style.css" type="text/css" rel="stylesheet"/>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">


	
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />	
					
	<!-- Controller Specific JS/CSS -->
		
</head>

<body>	
	<div id="header">
		<a href='/' id="headerimage" title="Card Counter's Blackjack"><h1>Card Counter's Blackjack</h1></a>
	</div>
	
	<div id="wrapper">
		<div id="statusBox">
			<div id="dealerScore" class="scoreBox"> <span id="dealerScoreText" class="scoreText">Dealer's Hand:</span></div>
			<div id="status" class="scoreBox"><span id="statusText" class="scoreText"></span></div>
			<div id="playerScore" class="scoreBox"> <span id="playerScoreText" class="scoreText">Player's Hand:</span></div>

		</div>
		<div id="helpwindow">
			<div id="cardCount">COUNT: <span id="countText"></span></div>
			<div id="wagerBox">
				<p>
					<label class="wagerLabel">BALANCE:</label>
		
					<span id="balanceAmount"></span>
				</p>
				<p>
				  <label for="spinner">Bet Amount:</label>
				  <input id="spinner" name="wager">
				</p>
				</br> 
				minimum bet: $20 </br> 
				maximum bet: $500</br>

			
			</div>
		</div>	
		<!-- the table -->	
		<div id="table">
		<!-- the dealer's hand -->	
			<div id="dealerhand">

			</div>
			<!-- the place to put chips (future enhancement) -->	
			<div id="midtable">

			</div>
			<!-- the Player's hand -->	
			<div id="playerhand">
				
			</div>
		</div>

		<div id="controls">

			<img id="hit_button" class="controlbuttons" src="images/hit.png" rel="images/hit_hover.png" alt="hit button">
			<img id="stand_button" class="controlbuttons" src="images/stand.png" rel="images/stand_hover.png" alt="stand button" >
			<img id="double_button" class="controlbuttons" src="images/double.png" rel="images/double_hover.png" alt="double button" >
			<img id="deal_button" class="controlbuttons" src="images/deal.png" rel="images/deal_hover.png" alt="deal button"  >			
		</div>
	</div>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="/js/jquery.mousewheel.js"></script>
	<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
	<script type="text/javascript" src="/js/blackjack.js"></script>
	
</body>
</html>