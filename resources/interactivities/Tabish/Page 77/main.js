var q = 0;
var r = 0;
var s = 0;
var t = 0;
function on(a){
	if(a>=1 && a<=6){
		q++;
	}
	else if(a>=7 && a<=9){
		r++;
	}
	else if(a>=10 && a<=14){
		s++;
	}
	else if(a>=15 && a<=18){
		t++;
	}
	$('.blank'+a).addClass('hidden');
	$('.bis'+a).removeClass('hidden');
}

const answers = ['6','3','5','4'];

function solve() {
	j=0
	while(j<19){
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
	if(q==1){
		$(".t_1").removeClass('hidden');
		$(".c_1").addClass('hidden');
	}else{
		$(".c_1").removeClass('hidden');
		$(".t_1").addClass('hidden');
	}
	if(t==7){
		$(".t_2").removeClass('hidden');
		$(".c_2").addClass('hidden');
	}else{
		$(".c_2").removeClass('hidden');
		$(".t_2").addClass('hidden');
	}
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
	if(correct==size && q==6 && r==3 && s==5 && t==4){
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
