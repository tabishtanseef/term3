var q = 0;
var r = 0;
var s = 0;
var t = 0;
var u = 0;

var tabish = 0;
var count=0;
function on(a,b){
	console.log('Tabihs',tabish);
	console.log('a',a);
	$("#"+b+a).css("pointer-events", "none");
	if(tabish==0){
		tabish=a;
	}
	else{
		if(tabish==a){
			$('.blank'+a).addClass('hidden');
			$('.bis'+a).removeClass('hidden');
			count++;
		}else{
			tabish = a;
			$("#"+b+a).css("pointer-events", "auto");
		}
	}
}

const answers = ['16','17','18','19','20'];

function solve() {
	j=0
	while(j<=12){
		$('.blank'+j).addClass('hidden');
		$('.bis'+j).removeClass('hidden');
		j++;
	}
	$('#submit').css("pointer-events", "none");
	$('#submit').css("opacity", "0.7");
}
function check() {
	$('select').css('border','2px solid #73DAD6');
	$("#sol").css("pointer-events", "auto");	
	
	if(count==6){
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
