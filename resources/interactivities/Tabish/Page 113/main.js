var count=0;
function go(a){
	count++;
	$('#'+a).css('color','white');
	$('#'+a).css('background','green');
	$('#'+a).css("pointer-events", "none");
}

function solve() {
	$('#submit').css("pointer-events", "none");
	$('#submit').css("opacity", "0.7");
	a=26;
	while(a<59){
		$('#'+a).css('color','white');
		$('#'+a).css('background','green');
		$('#'+a).css("pointer-events", "none");
		a=a+2;
	}
}
function check() {
	$("#sol").css("pointer-events", "auto");	
	
	if(count==17){
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
