var boxes = [];
var turn = true;
var you = 0;
var comp = 0;


function load(){

	boxes = [];
	turn = true;
	meribari = true;
	you = 0;
	comp = 0;
	var m = 10;
	var n = 10;
	var offset = 50;

	var sx= sx = window.innerWidth/2 - (m*offset)/2,
	sy = offset*2.5;
	var html = "";
	$("#app").html(html);
	var c = 0;
	for(var j=0; j<m; j++){
		for(var i=0; i<n; i++){

			var x = sx + i * offset,
				y = sy + j * offset;

			html += `
				<div class="box" data-id="${c}" style="z-index=${i-1}; left:${x+2.5}px; top:${y+2.5}px"></div>
				<div class="dot" style="z-index=${i}; left:${x-5}px; top:${y-5}px" data-box="${c}"></div>						
				<div class="line lineh" data-line-1="${c}" data-line-2="${c-m}" style="z-index=${i}; left:${x}px; top:${y}px" data-active="false"></div>
				<div class="line linev" data-line-1="${c}" data-line-2="${c-1}" style="z-index=${i}; left:${x}px; top:${y}px" data-active="false"></div>
				`;			
			boxes.push(0);
			c++;
		}
	}

	//right boxes
	for(var i=0; i<n; i++){
		var x = sx + m * offset,
			y = sy + i * offset;
		html += `				
				<div class="dot" style="z-index=${i}; left:${x-5}px; top:${y-5}px" data-box="${c}"></div>
				<div class="line linev" data-line-1="${m*(i+1)-1}" data-line-2="${-1}" style="z-index=${i}; left:${x}px; top:${y}px" data-active="false"></div>
				`;		
	}

	//bottom boxes
	for(var i=0; i<m; i++){
		var x = sx + i * offset,
			y = sy + n * offset;
		html += `				
				<div class="dot" style="z-index=${i}; left:${x-5}px; top:${y-5}px" data-box="${c}"></div>
				<div class="line lineh" data-line-1="${((n-1)*m)+i}" data-line-2="${-1}" style="z-index=${i}; left:${x}px; top:${y}px" data-active="false"></div>
				`;		
	}

	//right-bottom most dot
	html += `<div class="dot" style="z-index=${i}; left:${sx+m*offset-5}px; top:${sy+n*offset-5}px" data-active="false"></div>`
	
	//append to dom
	$("#app").html(html);
	applyEvents();
}

function applyEvents(){
	$("div.line").unbind('click').bind('click', function(){
		console.log("-1---- " + turn);
		var id1 = parseInt($(this).attr("data-line-1"));
		var id2 = parseInt($(this).attr("data-line-2"));  
		
		if(checkValid(this) && turn){	
			var a = false, b = false;

			if(id1 >= 0) var a = addValue(id1);
			if(id2 >= 0) var b = addValue(id2);
			$(this).addClass("line-active");
			$(this).attr("data-active", "true");

			if(a === false && b === false){
				applyEventsTwo();	
				
			}			
		}	
	});
}

function applyEventsTwo(){
	meribari = false;
	var v;
	$("div.line").unbind('click').bind('click', function(){
			console.log("-2---- " + turn);
			var id1 = parseInt($(this).attr("data-line-1"));
			var id2 = parseInt($(this).attr("data-line-2"));  

			if( turn === true){
				console.log("-----");
				if(id1 >= 0) var a = addValue(id1);
				if(id2 >= 0) var b = addValue(id2);
				$(this).addClass("line-active");
				$(this).attr("data-active", "true");

				if(a === true || b === true){
					console.log("dobara");
					applyEventsTwo();
						
				}else{
					console.log("dobara ni");
					meribari = true;
					$("#turn").text("Turn : " + "You");
				}					
			}
		
	});
}

function acquire(id){

	var color;
	if(meribari){
		color = "salmon";
		you++;
	}else{
		color = "skyblue";
		comp++;
	}
	
	$("div.box[data-id='"+id+"']").css("background-color", color);	
	boxes[id] = "full";

	$(".player2").text("You : " + you);
	$(".player1").text("Computer : " + comp);

	var full = true;
	for(var i=boxes.length-1; i>=0; i--){
		if(boxes[i] != full){
			full = false;
			break;
		}
	}

	if(full) alert(((you>comp) ? "You": "Computer") + " won");
}


function addValue(id){
	boxes[id]++;

	if(boxes[id] === 4){
		acquire(id);
		return true;
	}
	return false;
}


function checkValid(t){
	return($(t).attr("data-active") === "false");
}



load();