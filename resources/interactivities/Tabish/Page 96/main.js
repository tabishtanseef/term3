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
	$("select").css("color","green");
	$("select").css("border","1px solid green");
	
	let size = answers.length;
	var i=0;
	while(i<size){
		$('#tab'+i).val(answers[i]).change();
		i++;
	}
	var i=0;
	while(i<6){
		i++;
		$('.ori'+i).addClass('hidden');
		$('.fake'+i).removeClass('hidden');
	}
}
function check() {
	$('select').css('border','2px solid #73DAD6');
	$("#sol").css("pointer-events", "auto");	
	let size = answers.length;
	var i=0;
	var empty=0;	
	while(i<size){
		input_answer = $("#tab"+i).val();
		console.log(input_answer);
		if(input_answer=='' || input_answer==null){
			empty++;
		}
		i++;
	}
	if(empty==size){
		$("#sol").css("pointer-events", "none");
	}
	var i=0;
	var correct=0;
	while(i<size){
		input_answer = $("#tab"+i).val();
		if(input_answer.toLowerCase()!=answers[i]){
			$('#tab'+i).css("border",'2px solid red');
		}else{
			$('#tab'+i).css("border",'2px solid green');
			correct++;
		}
		i++;
	}
	if(correct==size && total==5){
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
