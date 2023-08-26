var q = 0;
var r = 0;
var s = 0;
var t = 0;
var u = 0;
function on(a){
	if(a==1){
		q=1;
	}
	else if(a==2){
		r=1;
	}
	else if(a==3){
		s=1;
	}
	else if(a==4){
		t=1;
	}
	else if(a==5){
		u=1;
	}
	$('.blank'+a).addClass('hidden');
	$('.bis'+a).removeClass('hidden');
}

const answers = ['16','17','18','19','20'];

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
}
function check() {
	if(q==1){
		$(".t_1").removeClass('hidden');
		$(".c_1").addClass('hidden');
	}else{
		$(".c_1").removeClass('hidden');
		$(".t_1").addClass('hidden');
	}
	if(r==1){
		$(".t_2").removeClass('hidden');
		$(".c_2").addClass('hidden');
	}else{
		$(".c_2").removeClass('hidden');
		$(".t_2").addClass('hidden');
	}
	if(s==1){
		$(".t_3").removeClass('hidden');
		$(".c_3").addClass('hidden');
	}else{
		$(".c_3").removeClass('hidden');
		$(".t_3").addClass('hidden');
	}
	if(t==1){
		$(".t_4").removeClass('hidden');
		$(".c_4").addClass('hidden');
	}else{
		$(".c_4").removeClass('hidden');
		$(".t_4").addClass('hidden');
	}
	if(u==1){
		$(".t_5").removeClass('hidden');
		$(".c_5").addClass('hidden');
	}else{
		$(".c_5").removeClass('hidden');
		$(".t_5").addClass('hidden');
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
	if(correct==size && q==1 && r==1 && s==1 && t==1 && u==1){
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
