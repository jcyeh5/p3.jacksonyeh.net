
(function () {


/*-------------------------------------------------------------------------------------------------
Global Variables
-------------------------------------------------------------------------------------------------*/
// deck of cards as an array
var cards = [	"SA","S2","S3","S4","S5","S6","S7","S8","S9","S10","SJ","SQ","SK",
				"CA","C2","C3","C4","C5","C6","C7","C8","C9","C10","CJ","CQ","CK",
				"DA","D2","D3","D4","D5","D6","D7","D8","D9","D10","DJ","DQ","DK",
				"HA","H2","H3","H4","H5","H6","H7","H8","H9","H10","HJ","HQ","HK",];

var top = 0;			// index of the top card in deck
var dealercards = []; 	// cards in dealer's hand
var playercards = [];	// cards in player's hand
var ingame = false;		// in the middle of a hand?
var balance = 200;		// player's initial balance is $5000
var bet = 0;			// player's bet
var cardCount = 0;		// the card count


function preload(arrayOfImages) {
    $(arrayOfImages).each(function () {
        $('<img />').attr('src',this).appendTo('body').css('display','none');
    });
}

/*-------------------------------------------------------------------------------------------------
Deck functions
-------------------------------------------------------------------------------------------------*/
function isEmpty(){
	if (top == 52) {
		return true;
	}
	else return false;
};

function howManyCardsInDeck() {
	var num = 52 - top;
	return num;
}

function getNewDeck() {
	top = 0;
	shuffle();
	cardCount = 0;	
	updateCount();
	$('#status').css("background-color","white");
	$('#statusText').css("color","red");
	$('#statusText').html("Dealing new Deck, reset COUNT");	
}

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


/*-------------------------------------------------------------------------------------------------
Hand functions
-------------------------------------------------------------------------------------------------*/
// returns the value of a card
function getCardValue(card) {
	var newcard = new String(card);
	var rank = newcard.charAt(1);
	if (rank == "A") return 11;
	else if (rank == "K") return 10;
	else if (rank == "Q") return 10;
	else if (rank == "J") return 10;	
	else if (rank == "1") return 10;
	else return parseInt(rank);
}

// returns the value of a hand	
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

// is the hand a blackjack?
function hasBlackjack(array){
	if (array.length == 2 && handValue(array) == 21){
		return true;
	} else return false;
}

/*-------------------------------------------------------------------------------------------------
Control functions
-------------------------------------------------------------------------------------------------*/

// greys out buttons
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

// colors buttons
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

/*-------------------------------------------------------------------------------------------------
update Status functions
-------------------------------------------------------------------------------------------------*/

function updateScores() {
	if (ingame == true){
		$('#dealerScoreText').html("Dealer's Hand:   ??");
	} else 		$('#dealerScoreText').html("Dealer's Hand:  " + handValue(dealercards));
	$('#playerScoreText').html("Player's Hand:  " + handValue(playercards));
}

function updateCount(card) {
	var rank = getCardValue(card);
	if (rank == 10 || rank == 11) cardCount--;
	if (rank >= 2 && rank <= 6) cardCount++;
	$('#countText').html(cardCount);
}

function updateBalance() {
	$('#balanceAmount').html("$ "+balance);	
}

function clearStatusText() {
	$('#statusText').html("");
	$('#status').css("background-color","darkgreen");	
	$('#statusText').css("color","gold");		
	$('#dealerScoreText').html("Dealer's Hand:  " );
	$('#playerScoreText').html("Player's Hand:  " );	
}

function dealerWins() {
	$('#status').css("background-color","white");
	$('#statusText').css("color","red");	
	$('#statusText').html("Dealer Wins");
}

function playerWins(message) {
	$('#status').css("background-color","white");
	$('#statusText').css("color","red");
	$('#statusText').html(message);
}

function tie() {
	$('#status').css("background-color","white");
	$('#statusText').css("color","red");
	$('#statusText').html("TIE");
}

/*-------------------------------------------------------------------------------------------------
game functions
-------------------------------------------------------------------------------------------------*/

function dealerPlays() {
	// show both dealer cards
	$('#dealerhand').html("");
	for (var i=0; i<2; i++) {
		var newcard_image = '<img class="card" src="images/' + dealercards[i] + '.png">';
		$('#dealerhand').append(newcard_image);
	}
	// add to Card Count the second dealer card that was revealed
	updateCount(dealercards[1]);
	
	// dealer must hit until 17
	while (handValue(dealercards) < 17) {
		var newcard = draw();
		var newcard_image = '<img class="card" src="images/' + newcard + '.png">';
		$('#dealerhand').append(newcard_image);
		dealercards.push(newcard);
		updateScores();
		updateCount(newcard);
	}
}

// if the player has not busted, the dealer plays.
// this determines the outcome after the dealer plays.
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
	// if dealer did not bust, then compare the two hands
	if (handValue(dealercards) == handValue(playercards)) {
		return "tie";
	}
	else if (handValue(dealercards) > handValue(playercards)) {
		return "dealer";
	}
	else return "player";
}

// what to do if player busts
function busted() {
	deactivateButtons();
	ingame = false;
	updateScores();	
	balance = balance - bet;
	updateBalance()
	$('#status').css("background-color","white");
	$('#statusText').css("color","red");
	$('#statusText').html("You busted");
}

// what happens when STAND button is clicked
function stand() {
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
			balance = balance + (bet * 1.5)
			updateBalance();
			playerWins("Blackjack!!!     You win!!!");
		}
		else {
			balance = balance + bet;
			updateBalance()
			playerWins("You Win");
		}
	}
	else if (x=="dealer"){
		balance = balance - bet;
		updateBalance()
		dealerWins();
	}
}

// what happens when HIT button is clicked
function hit() {
	var handvalue = handValue(playercards);
	 
	if (handvalue > 0 && handvalue <= 21 ) {	
		var newcard = draw();
		var newcard_image = '<img class="card" src="images/' + newcard + '.png">';
		$('#playerhand').append(newcard_image);
		playercards.push(newcard);
		var value = handValue(playercards);
		updateCount(newcard);
		updateScores();		
		console.log(value);
		if (value == 21) {
			stand();
		}
		else if (value > 21) {
			busted();
		}						
	}
	else if (handvalue > 21) {
		$('#status').css("background-color","white");
		$('#statusText').css("color","red");
		$('#statusText').html("you busted already!!!");
	}
}		

/*-------------------------------------------------------------------------------------------------
Buttons Events
-------------------------------------------------------------------------------------------------*/
$('.controlbuttons').click(function() {

	// Which control button was clicked?
	
	// only allow HIT if in the middle of a hand
	 if (this.id == "hit_button" && ingame == true) {
		hit();
	 }
	 
	// only allow STAND if in the middle of a hand
	 if (this.id == "stand_button" && ingame == true) {
		stand();	
	 }

	// only allow DOUBLE if in the middle of a hand	 
	 if (this.id == "double_button" && ingame == true) {
		var double_bet = bet * 2;
		// if player does not have enough money to double, reduce bet to whatever player has in balance
		if (double_bet > balance) {
			double_bet = balance;
		}
		bet = double_bet;
		//update the bet display
		$("#spinner").spinner( "value", bet );
		// hit once ...
		hit();
		// if player has not busted ... then STAND
		if (ingame == true) {
			stand();
		}
	 }	 

	// only allow DEAL if in between hands	 
	 if (this.id == "deal_button" && ingame == false) {	 

		// retrieve bet amount from spinner.
		bet = $('#spinner').spinner("value");
		// if player balance is 0, print sorry message
		if (balance == 0) {
			$('#status').css("background-color","white");
			$('#statusText').css("color","red");
			$('#statusText').html("Sorry, you are broke");
		}
		else if (bet <= balance) {
			activateButtons();
			clearStatusText();
			ingame = true;
			dealercards = [];
			playercards = [];
			$('#dealerhand').html("");
			$('#playerhand').html("");
			
			// if there are less than 10 cards in deck, get a new deck
			console.log("cards left in deck= " + howManyCardsInDeck());
			if (howManyCardsInDeck() < 10) {
				getNewDeck();
			}
			// deal 2 cards to player
			for (var i=0; i<2; i++) {
				var newcard = draw();
				var newcard_image = '<img class="card" src="images/' + newcard + '.png">';
				$('#playerhand').append(newcard_image);
				playercards.push(newcard);
				updateCount(newcard);
			}
			// deal 1 card to dealer face UP
			var newcard = draw();
			var newcard_image = '<img class="card" src="images/' + newcard + '.png">';
			$('#dealerhand').append(newcard_image);
			dealercards.push(newcard);
			updateCount(newcard);	

			// deal 1 card to dealer face DOWN
			var newcard = draw();
			var newcard_image = '<img class="card" src="images/CARDBACK.png">';
			$('#dealerhand').append(newcard_image);
			dealercards.push(newcard);	
			
			updateScores();

			// if player has blackjack...
			if (hasBlackjack(playercards) == true) {
				stand();
			}
		}
		// player is betting more money than he has in balance.
		else if (bet > balance) {
			$('#status').css("background-color","white");
			$('#statusText').css("color","red");
			$('#statusText').html("you do not have $" + bet);
			// set bet Amount to whatever he has left in balance
			$("#spinner").spinner( "value", balance );
		}	
	}
});	


/*-------------------------------------------------------------------------------------------------
Rollovers
-------------------------------------------------------------------------------------------------*/
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

/*-------------------------------------------------------------------------------------------------
Document ready, start up
-------------------------------------------------------------------------------------------------*/

$(document).ready(function($) {  
		
	if (ingame == false) {
		// if not in the middle of a hand, grey out buttons
		deactivateButtons();	
	}
 
	// JQuery UI spinner for wager input
	var spinner = $("#spinner").spinner({max:500, min:20, step:10, incremental:true, numberFormat: "c"});	
	$("#spinner").spinner( "value", 20 );
   
    // JQuery UI tabs
	$( "#tabs" ).tabs();	
				  
	// Prevent user from manually typing values into spinner
	// from: http://stackoverflow.com/users/1054573/leonard-pauli
	$("#spinner").focus(function () {
		$(this).blur();
	});
 
	// display initial balance amount
	$('#balanceAmount').html("$ "+balance);
	
	//preload images 
/*
	//- See more at: http://www.grasmash.com/article/simple-jquery-script-swapping-images-hoverrollover#sthash.8op7JXg9.dpuf
	var cache = new Array(); //add all images to cache array 
	$('img').each(function(){ 
	var cacheImage = new  Image(); 
	cacheImage.src = $(this).attr('src'); 
	cache.push(cacheImage); 
	}); 
*/


	var arrayOfImages = new Array();
	// populate array with image src
	for (var i = 0; i < 52; i++) {
		$('<img/>')[0].src =  = 'images/' + cards[i] + '.png';
	}

	
	// get new deck
	getNewDeck();
	
});



}());
