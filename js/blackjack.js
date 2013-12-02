/*-------------------------------------------------------------------------------------------------
Buttons
-------------------------------------------------------------------------------------------------*/
$('.controlbuttons').click(function() {
 console.log("hit");
	 // Which control button was clicked?
	 var control_button = $(this).id;
	 
	 if (control_button == "hit") {
	 console.log("hit");
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
 console.log("roll"); 

//preload images 
var cache = new Array(); //cycle through all rollover elements and add rollover img src to cache array 
$(".rollover").each(function(){ 
var cacheImage = document.createElement('img'); 
cacheImage.src = $(this).attr('rel'); 
cache.push(cacheImage); 
}); 
} );
//- See more at: http://www.grasmash.com/article/simple-jquery-script-swapping-images-hoverrollover#sthash.8op7JXg9.dpuf