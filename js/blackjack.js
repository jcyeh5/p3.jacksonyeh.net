/*-------------------------------------------------------------------------------------------------
Global Variables
-------------------------------------------------------------------------------------------------*/
(function () {

// deck of cards as an array
var cards = [	"SA","S2","S3","S4","S5","S6","S7","S8","S9","S10","SJ","SQ","SK",
				"CA","C2","C3","C4","C5","C6","C7","C8","C9","C10","CJ","CQ","CK",
				"DA","D2","D3","D4","D5","D6","D7","D8","D9","D10","DJ","DQ","DK",
				"HA","H2","H3","H4","H5","H6","H7","H8","H9","H10","HJ","HQ","HK",];

var top = 0;			// index of the top card in deck
var dealercards = []; 	// cards in dealer's hand
var playercards = [];	// cards in player's hand
var ingame = false;
var balance = 5000;		// player's initial balance is $5000


function isEmpty(){
	if (top == 52) {
		return true;
	}
	else return false;
};

function draw(){
	var card = cards[top];
	top++;
	return card;
};

function shuffle(){
	for (var i=0; i<52; i++) {
		var temp = cards[i];
		var random = Math.floor(Math.random()*52);
		cards[i] = cards[random];
		cards[random] = temp;
	}
};
	
function handValue(array){
	if (array.length == 0) return 0;
	var value = 0;
	for (var i=0; i<array.length; i++) {
		var cardValue = getCardValue(array[i]);
		value = value + cardValue;
	}
	
	// what about an Ace when count over 21?
	if (value > 21){
		var numAces = 0
		// go through hand, looking for Aces
		for (var i=0; i<array.length; i++) {
			if (getCardValue(array[i]) == 11) {
				numAces++;
			}		
		}
		// change the value of one Ace at a time until hand value <= 21
		for (var j=0; j< numAces; j++)
		{
			value = value - 10;
			if (value <= 21) {
				return value;
			}
		}
	}
	return value;
};



function getCardValue(card) {
	var rank = card.charAt(1);
	if (rank == "A") return 11;
	else if (rank == "K") return 10;
	else if (rank == "Q") return 10;
	else if (rank == "J") return 10;	
	else if (rank == "1") return 10;
	else return parseInt(rank);
}

function deactivateButtons() {
	// changes color to grey
	$('#hit_button').attr('src', 'images/hit_disabled.png');
	$('#stand_button').attr('src', 'images/stand_disabled.png');
	$('#double_button').attr('src', 'images/double_disabled.png');	
	$('#deal_button').attr('src', 'images/deal.png');
	// enable buttons on spinner
	// from: http://stackoverflow.com/users/2184393/cafe-coder
	$('.ui-spinner a.ui-spinner-button').css('display','block');
}

function activateButtons() {
	// changes color to blue
	$('#hit_button').attr('src', 'images/hit.png');
	$('#stand_button').attr('src', 'images/stand.png');
	$('#double_button').attr('src', 'images/double.png');
	$('#deal_button').attr('src', 'images/deal_disabled.png');	
	// disable buttons on spinner
	// from: http://stackoverflow.com/users/2184393/cafe-coder
	$('.ui-spinner a.ui-spinner-button').css('display','none');

}

function updateScores() {
	if (ingame == true){
		$('#dealerScoreText').html("Dealer's Hand:   ??");
	} else 		$('#dealerScoreText').html("Dealer's Hand:  " + handValue(dealercards));
	$('#playerScoreText').html("Player's Hand:  " + handValue(playercards));
}

function clearStatusText() {
	$('#statusText').html("");
	$('#dealerScoreText').html("Dealer's Hand:  " );
	$('#playerScoreText').html("Player's Hand:  " );	
}
function dealerPlays() {
	// show both dealer cards
	$('#dealerhand').html("");
	for (var i=0; i<2; i++) {
		var newcard_image = '<img class="card" src="images/' + dealercards[i] + '.png">';
		$('#dealerhand').append(newcard_image);
	}
	// hit until 17
	while (handValue(dealercards) < 17) {
		var newcard = draw();
		var newcard_image = '<img class="card" src="images/' + newcard + '.png">';
		$('#dealerhand').append(newcard_image);
		dealercards.push(newcard);
		updateScores();
	}
}

function whoWon() {
	// if player had blackjack
	if (hasBlackjack(playercards) == true) {
		// dealer also had blackjack
		if (hasBlackjack(dealercards) == true) {
			return "tie";
		} else return "player";
	}
	// if dealer had blackjack
	if (hasBlackjack(dealercards) == true) {
		// player also had blackjack
		if (hasBlackjack(playercards) == true){
			return "tie";
		} else return "dealer";
	}

	// if dealer busted
	if (handValue(dealercards) > 21) {
		return "player";
	}
	
	// compare the two hands
	if (handValue(dealercards) == handValue(playercards)) {
		return "tie";
	}
	else if (handValue(dealercards) > handValue(playercards)) {
		return "dealer";
	}
	else return "player";
}

function dealerWins() {
	$('#statusText').html("Dealer Wins");
}

function playerWins(message) {
	$('#statusText').html(message);
}

function tie() {
	$('#statusText').html("TIE");
}

function hasBlackjack(array){
	if (array.length == 2 && handValue(array) == 21){
		return true;
	} else return false;
}
/*-------------------------------------------------------------------------------------------------
Buttons
-------------------------------------------------------------------------------------------------*/
$('.controlbuttons').click(function() {

	 // Which control button was clicked?
	 
	 if (this.id == "hit_button" && ingame == true) {
		var handvalue = handValue(playercards);
	 
		if (handvalue > 0 && handvalue <= 21 ) {
		
			var newcard = draw();
			var newcard_image = '<img class="card" src="images/' + newcard + '.png">';
			$('#playerhand').append(newcard_image);
			playercards.push(newcard);
			var value = handValue(playercards);
			updateScores();
			console.log(value);
			if (value == 21) {
				$('#statusText').html("blackjack!!!");
				deactivateButtons();
				ingame = false;
			}
			else if (value > 21) {
				$('#statusText').html("you busted!!!");			
				deactivateButtons();
				ingame = false;
			}				
			
		}
		else if (handvalue > 21) {
			$('#statusText').html("you busted already!!!");
		}		

	 }

	 if (this.id == "stand_button" && ingame == true) {
		
		deactivateButtons();
		ingame = false;
		updateScores();
		dealerPlays();
		var x= whoWon();
		if (x=="tie") {
			tie();
		}
		else if (x=="player"){
			if (hasBlackjack(playercards) == true) {
				playerWins("Blackjack!!!     Player wins!!!");
			}
			else playerWins("Player Wins");
		}
		else if (x=="dealer"){
			dealerWins();
		}
			
		
	 }
	 
	 
	 if (this.id == "deal_button" && ingame == false) {	 
		activateButtons();
		clearStatusText();
		ingame = true;
		dealercards = [];
		playercards = [];
		$('#dealerhand').html("");
		$('#playerhand').html("");
		

	 	for (var i=0; i<2; i++) {
			var newcard = draw();
			var newcard_image = '<img class="card" src="images/' + newcard + '.png">';
			$('#playerhand').append(newcard_image);
			playercards.push(newcard);
		}
	 
		var newcard = draw();
		var newcard_image = '<img class="card" src="images/' + newcard + '.png">';
		$('#dealerhand').append(newcard_image);
		dealercards.push(newcard);
		
		var newcard = draw();
		var newcard_image = '<img class="card" src="images/CARDBACK.png">';
		$('#dealerhand').append(newcard_image);
		dealercards.push(newcard);	
		
		updateScores();
		
		// if 
	}
	 
});	



$('.controlbuttons').on( "mouseenter", function() {

	if (ingame == true) {
		if (this.id == "double_button") $(this).attr('src', "images/double_hover.png");
		else if (this.id == "hit_button") $(this).attr('src', "images/hit_hover.png");
		else if (this.id == "stand_button") $(this).attr('src', "images/stand_hover.png");			 
	} 
	else if (ingame == false) {
		if (this.id == "deal_button") $(this).attr('src', "images/deal_hover.png");
	}
});

$('.controlbuttons').on( "mouseleave", function() {

	if (ingame == true) {
		if (this.id == "double_button") $(this).attr('src', "images/double.png");
		else if (this.id == "hit_button") $(this).attr('src', "images/hit.png");
		else if (this.id == "stand_button") $(this).attr('src', "images/stand.png");		 
	}
	else if(ingame == false) {
		if (this.id == "deal_button") $(this).attr('src', "images/deal.png");
	}	
});



$(document).ready(function($) {  
	console.log("document ready"); 

		
	if (ingame == false) {
		// if not in the middle of a hand, grey out buttons
		deactivateButtons();	
	}
 
	// JQuery UI spinner for wager input
	var spinner = $("#spinner").spinner({max:500, min:20, step:20, incremental:true, numberFormat: "c"});
	
	$("#spinner").spinner( "value", 20 );
   
                  
	// Prevent user from manually typing values into spinner
	// from: http://stackoverflow.com/users/1054573/leonard-pauli
	$("#spinner").focus(function () {
		$(this).blur();
	});
 
	// display initial balance amount
	$('#balanceAmount').html("$ "+balance);
	
	
	//preload images 
	var cache = new Array(); //add all images to cache array 
	$('img').each(function(){ 
	var cacheImage = new  Image(); 
	cacheImage.src = $(this).attr('src'); 
	cache.push(cacheImage); 
	}); 
});

}());
//- See more at: http://www.grasmash.com/article/simple-jquery-script-swapping-images-hoverrollover#sthash.8op7JXg9.dpuf