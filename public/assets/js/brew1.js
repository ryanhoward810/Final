;(function(){

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCzTeSc1g5Lr8rij8rSxbIPBXjTzkeFgJo",
    authDomain: "brew-buddy-fe6e4.firebaseapp.com",
    databaseURL: "https://brew-buddy-fe6e4.firebaseio.com",
    projectId: "brew-buddy-fe6e4",
    storageBucket: "brew-buddy-fe6e4.appspot.com",
    messagingSenderId: "815675537636"
  };

firebase.initializeApp(config);
// 
var database = firebase.database();	

// // 2. Button for adding Employees
//   // Grabs user input
  var brewInput = $("#newBrewInput").val().trim();
//  
//   // Creates local "temporary" object for holding brew data
  var newBrew = {
    name: brewInput
   
  };
  // Uploads employee data to the database
  database.ref('/brewList').push(newBrew);

  $("#newBrewInput").val("");

// // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
	database.ref('/brewList').on("child_added", function(childSnapshot, prevChildKey) {

});


var brewTitle = ["Stout", "IPA", "Double IPA", "Lager", "Pilsner", "Porter", "Ale"];


//creates buttons
// function createButtons(){
// 	$("#brewButtons").empty();
// 	for(var i = 0; i < brewTitle.length; i++){
// 		var brewBtn = $("<button>").text(brewTitle[i]).addClass("brewBtn").attr({"data-name": brewTitle[i]});
// 		$("#brewButtons").append(brewBtn);
// 	}
	function createButtons(){
	$("#brewButtons1 button").remove();
	$("#brewButtons2").empty();
	for(var i = 0; i < brewTitle.length; i++){
		var brewBtn = $("<button>").text(brewTitle[i]).attr("id", "brewBtn"+(i+1)).attr({"data-name": brewTitle[i]}).addClass("brewBtn");
		if(i<7){
		$("#brewButtons1").append(brewBtn);	
		}
		else{
		$("#brewButtons1").append(brewBtn);
		console.log(brewBtn);
	}
}
	//displays buttons on click
	$(".brewBtn").on("click", function(){
		$(".display").empty();

		var thisBrew = $(this).data("name");
		var brewURL = "http://api.brewerydb.com/v2/search?key=8ebe8cb050c4850b0c188999ca2f0d35&withSocialAccounts=Y&type=beer&q="+thisBrew;
		var proxy = 'http://www.chrisstead.com/proxy/?apikey=' + "08e200551e5b26e89410cfcdec2305a85bce6219" + '&requesturl=' + brewURL;
		$.ajax({
			url: proxy, 
			method: "GET"
		}).done(function(data){
			data=JSON.parse(data);
			console.log(data);
	//make sure we have data
		if(!data || !data.data || !data.data.length){
			//search fail
			$(".display").html("<h2>Data Not Found In Our Database...Sorry!</h2>");
			return;
		}
	//make sure icon
	var icon;
	var i=0;
	var html = "";
	for(var results=0, maxResults=Math.min(3, data.data.length);results<maxResults; results++){
		if(i>=data.data.length)break;
	for(i; i<data.data.length; i++) {
		if(data.data[i].labels&&data.data[i].labels.medium) {
			icon = data.data[i].labels.medium;
			break;
		}

	}
	if(!icon) {
		//icon fail
		$(".display").html("<h2>No Image Found In Our Database...Sorry!</h2>");
		return;
	}
	//output brew info
	var brew = data.data[i];
	i++;
	console.log(brew);
	// var html = "";
	html+="<img src='"+icon+"'>";
	icon=null;
	html+="<h1><strong>"+brew.name+"</strong></h1>";
	html+="<p><strong>Category:</strong> "+brew.style.category.name+"</p>";
	html+="<p><strong>Style:</strong> "+brew.style.description+"</p>";
	html+="<p><strong>Description:</strong> "+brew.description+"</p>";
	html+="<p><strong>ABV:</strong> "+brew.abv+"</p>";
	html+="<p><strong>IBU:</strong> "+brew.ibu+"</p>";
	html+="<p><strong>Is Organic:</strong> "+brew.isOrganic+"</p>";
	// html+="<p><strong>Is Organic:</strong> "+brew.styleId+"</p>";
	// html+="<p><strong>Availability:</strong> "+availableId+"</p>";
	html+="<p><strong>Serving Temp:</strong> "+brew.servingTemperature+"</p>";
	html+="<p><strong>Food Pairings:</strong> "+brew.foodPairings+"</p>";
	if(brew.socialAccounts && brew.socialAccounts.length) {
		for(let j=0; j<brew.socialAccounts.length; j++) {
			if(brew.socialAccounts[j].link) {
				html+="<p><strong>Social Review:</strong> <a target='_blank' href='"+brew.socialAccounts[j].link+"'>"+brew.socialAccounts[j].link+"</a></p>";	
			}
		}
	}
	
}
	$(".display").html(html);	
		});
	});
}
 
//sets a button from input
$("#addBrew").on("click", function(){
	var newBrew = $("#newBrewInput").val().trim();
	brewTitle.push(newBrew);
	createButtons();
	return false;
});

createButtons();

$("#age").on("change", function(){
	if($(this).val()==="1996"){
		$("aside").remove();		
	}
	else{
		$("output").text("You're Too Young!!!");
	}
});
})();