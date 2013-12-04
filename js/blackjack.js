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



/*-------------------------------------------------------------------------------------------------
Buttons
-------------------------------------------------------------------------------------------------*/
$('.controlbuttons').click(function() {

	 // Which control button was clicked?
	 
	 if (this.id == "hit_button") {
		var handvalue = handValue(playercards);
	 
		if (handvalue == 0) {
			$('#status').html("wait for the dealer to deal cards first!");
		}
		else if (handvalue > 0 && handvalue <= 21 ) {
		
			var newcard = draw();
			var newcard_image = '<img class="card" src="images/' + newcard + '.png">';
			$('#playerhand').append(newcard_image);
			playercards.push(newcard);
			var x = handValue(playercards);
		}
		else if (handvalue > 21) {
			$('#status').html("you busted!!!");
		}		

	 }
	 
	 if (this.id == "deal_button") {	 

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
	}
	 
});	



$('.controlbuttons').on( "mouseenter", function() {

    console.log( "mouse hovered over" );

	var img_src = ""; 
	var new_src = ""; 
	img_src = $(this).attr('src'); //grab original image 
	new_src = $(this).attr('rel'); //grab rollover image 
	$(this).attr('src', new_src); //swap images 
	$(this).attr('rel', img_src); //swap images   

});

$('.controlbuttons').on( "mouseleave", function() {

	var img_src = ""; 
	var new_src = ""; 	
	img_src = $(this).attr('src'); //grab original image 
	new_src = $(this).attr('rel'); //grab rollover image 	
	$(this).attr('src', new_src); //swap images 
	$(this).attr('rel', img_src); //swap images   
});



$(document).ready(function($) {  
	console.log("document ready"); 

		
	
 
	//preload images 
	var cache = new Array(); //cycle through all rollover elements and add rollover img src to cache array 
	$(".rollover").each(function(){ 
	var cacheImage = document.createElement('img'); 
	cacheImage.src = $(this).attr('rel'); 
	cache.push(cacheImage); 
	}); 
});
//- See more at: http://www.grasmash.com/article/simple-jquery-script-swapping-images-hoverrollover#sthash.8op7JXg9.dpuf