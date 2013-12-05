<!DOCTYPE html>
<html>
<head>
	<script src="/A2EB891D63C8/avg_ls_dom.js" type="text/javascript"></script>
	<title>blackjack</title>
	<link href= "/css/style.css" type="text/css" rel="stylesheet"/>
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
		help window
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
	<script type="text/javascript" src="/js/blackjack.js"></script>
	
</body>
</html>