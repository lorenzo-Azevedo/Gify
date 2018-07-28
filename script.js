var topics = ["Hot Topic", "Kawaii", "Angst", "Emo", "Paramore",
"Buffy", "Party Monster", "suicidegirls", "Kat von D"];
var GIFs = 10;

function renderButtons(){
	for(var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("new-button");
		newButton.text(topics[i]);
		$("#button-container").append(newButton);
	}
	$(".new-button").unbind("click");

	$(".new-button").on("click", function(){
		$(".gif").unbind("click");
		popContainer($(this).text());
	});

}

function addButton(bam){
	if(topics.indexOf(bam) === -1) {
		topics.push(bam);
		$("#button-container").empty();
		renderButtons();
	}
}

function popContainer(bam){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + bam + 
		"&api_key=5Use9zSqqmTPzSORNMQPKeORtTAXUlVq&rating=" + "&limit=" + GIFs,
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individualGif");
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
		
		$(".gif").unbind("click");
		$(".gif").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#emotion").val().trim());
		$("#emotion").val("");
	});
});