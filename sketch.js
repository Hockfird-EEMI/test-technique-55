console.log("in-script");
	

	function gotData() {
	console.log("in-getData");

		$.ajax({
		    url: "http://cdn.55labs.com/demo/api.json",
		    method:'GET',
		    dataType: 'json'
		}).done(function(response) {


		// LOAD DATA
		    var dates = response.data.DAILY.dates;
		    var members = response.data.DAILY.dataByMember.players;
		    var barChart = [];


		    var names = [];
	    	for(var i in members){
	    		names.push(i);
	    		console.log(i);
	    		console.log(members[i]['points']);
	    		var points = members[i]['points'];

	    		barChart.push(points);
	    	}

			var append = "";
			var result = [];

	    	for(var o = 0; o < barChart.length; o++){
	    		//console.log("o : " + o)
	    		for(var a= 0; a < barChart[o].length; a++){

	    			if(!result[a])
	    				result[a] = new Array(); 
    				result[a].push(barChart[o][a]);
	    			
	    		}
	    	}


	    	var colors = ["#3498db", "#1abc9c", "red", "blue", "black", "green", "yellow"];

	    	for(var e = 0; e < result.length; e++){
	    	if (dates[e] == null && result[e][x] == null) {
				dates[e] = "Date not found";
			}
	    		console.log(result[e]);
	    		for(var x = 0; x < result[e].length; x++){
	    			if (result[e][x] == null) {
	    				result[e][x] = 0;
					}
	    			if(x > 0) {
	    				append += "<li class=\"elem\" data-info='Player : " + names[x] + " & " + result[e][x] + " points on the "+dates[e]+"'>" + result[e][x] + ":" + ":" + colors[x] +"</li>";
	    			} else {
	    				append += "<li class=\"elem\" data-info='Player : " + names[x] + " & " + result[e][x] + " points on the "+dates[e]+"'>" + result[e][x] + ":" + dates[e] + ":" + colors[x] +"</li>";
					}
	    		}
	    	}
	    	$(".iddeul").append(append);	
	    	    


makeGraph("graph", "labels");
		});

	}

gotData();



function makeGraph(container, labels)
{
    container = document.getElementById(container);
    labels = document.getElementById(labels)
    var dnl = container.getElementsByTagName("li");
    for(var i = 0; i < dnl.length; i++)
    {
        var item = dnl.item(i);
        var value = item.innerHTML;
        var color = item.style.background=color;
        var content = value.split(":");
        value = content[0];
        // console.log(value);

        value = parseInt(value);
        // console.log(value);
        if (!isNaN(value)) {
        value = value/2;
        value = String(value);
        }

        item.style.height=value + "px";
        item.style.top=(500 - value) + "px";
        item.style.left = (i * 50 + 20) + "px";
        item.style.height = value + "px";

        value = parseInt(value);
        if (!isNaN(value)) {
        value = value*2;
        value = String(value);
        }

        item.innerHTML = value;
        item.style.visibility="visible";	
        color = content[2];

        if(color != false) item.style.background=color;
        labels.innerHTML = labels.innerHTML +
             "<span style='margin:3px; margin-botton:23px; writing-mode: vertical-rl; text-orientation:sideways; padding-right:0.4%;'>" + 
             content[1] + "</span>";
    }	
}

console.log("out-script");