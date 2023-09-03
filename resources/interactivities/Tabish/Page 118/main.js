var count=0;
var c=[];
function go(a){
	if(a%5==0){
		count++;
	}else{
		c.push(a);
	}
	$('#'+a).css('color','white');
	$('#'+a).css('background','green');
	$('#'+a).css("pointer-events", "none");
}

function solve() {
	$('#submit').css("pointer-events", "none");
	$('#submit').css("opacity", "0.7");
	a=20;
	while(a<=100){
		$('#'+a).css('color','white');
		$('#'+a).css('background','green');
		$('#'+a).css("pointer-events", "none");
		a=a+5;
	}
}
function myFunction(item, index, arr) {
	$('#'+item).css('color','white');
	$('#'+item).css('background','red');
	$('#'+item).css("pointer-events", "none");
}
function check() {
	$("#sol").css("pointer-events", "auto");	
	c.forEach(myFunction);
	
	if(count>=17){
		setTimeout(function(){
			var audio = document.getElementById("audio1");
			audio.play();
			$('#blocks').show(); 
		},1000);
	}else{
		setTimeout(function(){ 
			var audio = document.getElementById("audio2");
			audio.play();
			$('#blocks2').show(); 
		},1000);
	}
}
