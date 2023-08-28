const answers = ['2','3','1','6','2'];
total=0;
function go(a){
	$('.ori'+a).addClass('hidden');
	$('.fake'+a).removeClass('hidden');
	total++;
}
function solve() {
	$('#submit').css("pointer-events", "none");
	$('#submit').css("opacity", "0.7");

	var i=0;
	while(i<5){
		i++;
		$('.ori'+i).addClass('hidden');
		$('.fake'+i).removeClass('hidden');
	}
}
function check() {
	$('select').css('border','2px solid #73DAD6');
	$("#sol").css("pointer-events", "auto");	
	
	if(total==4){
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
