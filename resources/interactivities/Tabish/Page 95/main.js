var q = 0;
var r = 0;
var s = 0;
var t = 0;
function on(a){
	if(a==2){
		r=1;
	}
	else if(a==3){
		s=1;
	}
	else if(a==4){
		t=1;
	}
	$('.blank'+a).addClass('hidden');
	$('.bis'+a).removeClass('hidden');
}

const answers = ['1','6','2'];

function solve() {
	j=2
	while(j<5){
		$('.blank'+j).addClass('hidden');
		$('.bis'+j).removeClass('hidden');
		j++;
	}
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
		if(input_answer!=answers[i]){
			$('#tab'+i).css("border",'2px solid red');
		}else{
			$('#tab'+i).css("border",'2px solid green');
			correct++;
		}
		i++;
	}
	if(correct==size && r==1 && s==1 && t==1){
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

function play(){
	var audio = document.getElementById('audio3');
	audio.play();
}