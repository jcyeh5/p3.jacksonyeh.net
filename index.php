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
		<!-- the table -->	
		<div id="table">
			<!-- the dealer's hand -->	
			<div id="dealer">
				<div id="dealercard1" class="cardslot">
					<img class="card" src="images/SK.png">
				</div>
				<div id="dealercard2" class="cardslot">
					<img class="card" src="images/SA.png">				
				</div>
				<div id="dealercard3" class="cardslot">
					<img class="card" src="images/CK.png">	
				</div>
				<div id="dealercard4" class="cardslot">
					<img class="card" src="images/CA.png">	
				</div>
				<div id="dealercard5" class="cardslot">
					<img class="card" src="images/HK.png">	
				</div>
				<div id="dealercard6" class="cardslot">
					<img class="card" src="images/HA.png">	
				</div>	
				<div id="dealercard7" class="cardslot">
					<img class="card" src="images/DA.png">	
				</div>	
				<div id="dealercard8" class="cardslot">
					<img class="card" src="images/CARDBACK.png">	
				</div>					
			</div>
			<!-- the status of current hand -->	
			<div id="status">
				status
			</div>
			<!-- the Player's hand -->	
			<div id="player">
				<div id="playercard1" class="cardslot">
					<img class="card" src="images/SQ.png">	
				</div>
				<div id="playercard2" class="cardslot">
					<img class="card" src="images/SJ.png">	
				</div>
				<div id="playercard3" class="cardslot">
					<img class="card" src="images/CQ.png">	
				</div>
				<div id="playercard4" class="cardslot">
					<img class="card" src="images/CJ.png">	
				</div>
				<div id="playercard5" class="cardslot">
					<img class="card" src="images/HQ.png">	
				</div>
				<div id="playercard6" class="cardslot">
					<img class="card" src="images/HJ.png">	
				</div>
				<div id="playercard7" class="cardslot">
					<img class="card" src="images/DQ.png">	
				</div>
				<div id="playercard8" class="cardslot">
					<img class="card" src="images/CARDBACK.png">	
				</div>					
			</div>
		</div>
		<div id="helpwindow">
		help window
		</div>
		<div id="controls">

			<img id="hit_button" class="controlbuttons" class="rollover" src="images/hit.png" rel="images/hit_hover.png" alt="hit button">
			<img id="stand_button" class="controlbuttons" src="images/stand.png" rel="images/stand_hover.png" alt="stand button" >
			<img id="double_button" class="controlbuttons" src="images/double.png" rel="images/double_hover.png" alt="double button" >
			<img id="split_button" class="controlbuttons" src="images/split.png" rel="images/split_hover.png" alt="split button"  >
			<img id="deal_button" class="controlbuttons" src="images/deal.png" rel="images/deal_hover.png" alt="deal button"  >			
		</div>
	</div>

	 <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script type="text/javascript" src="/js/blackjack.js"></script>
	
</body>
</html>