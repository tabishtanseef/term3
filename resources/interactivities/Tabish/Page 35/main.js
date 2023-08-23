function play(){
	var audio = document.getElementById('audio3');
	audio.play();
}

countA = 0;
countB = 0;
countC = 0;
countD = 0;
countE = 0;
function go(a){
	$('#'+a).css('background','#FECA0A');
	$('#'+a).css('pointer-events','none');
	if(a==1 || a==2 || a==3){
		countA++;
	}else if(a==20 || a==21 || a==22){
		countA--;
	}
	if(a==4 || a==5 || a==6){
		countB++;
	}else if(a==23 || a==24 || a==25){
		countB--;
	}
	if(a==7 || a==8 || a==9){
		countC++;
	}else if(a==26 || a==27 || a==28){
		countC--;
	}
	if(a==10 || a==11 || a==12){
		countD++;
	}else if(a==29 || a==30 || a==31){
		countD--;
	}
	if(a==13 || a==14 || a==15){
		countE++;
	}else if(a==32 || a==33 || a==34){
		countE--;
	}
}
function bo(a){
	b = a+10;
	c = b+100;
	$('#'+c).css('color','black');
	$('#'+b).css('color','black');
	$('#'+a).css('color','green');
	$('#'+a).css('border','5px solid green');
}

const answers = ['bed','bin','jar','log','bug'];

function solve() {
	$('#blocks2').hide();
	$('#submit').css('pointer-events','none');
	$('#submit').css('opacity','0.5');
	$("select").css("color","green");
	$("select").css("border","1px solid green");
	a=1;
	while(a<40){
		$('#'+a).css('color','black');
		$('#'+a).css('background','white');
		a++;
	}
	a=1;
	while(a<16){
		$('#'+a).css('color','white');
		$('#'+a).css('background','green');
		a++;
	}
	let size = answers.length;
	var i=0;
	while(i<size){
		$('#tab'+i).val(answers[i]).change();
		i++;
	}
}
function check() {
	if(countA==3){
		$('.t_1').removeClass('hidden');
		$('.c_1').addClass('hidden');
	}else{
		$('.c_1').removeClass('hidden');
		$('.t_1').addClass('hidden');
	}
	if(countB==3){
		$('.t_2').removeClass('hidden');
		$('.c_2').addClass('hidden');
	}else{
		$('.c_2').removeClass('hidden');
		$('.t_2').addClass('hidden');
	}
	if(countC==3){
		$('.t_3').removeClass('hidden');
		$('.c_3').addClass('hidden');
	}else{
		$('.c_3').removeClass('hidden');
		$('.t_3').addClass('hidden');
	}
	if(countD==3){
		$('.t_4').removeClass('hidden');
		$('.c_4').addClass('hidden');
	}else{
		$('.c_4').removeClass('hidden');
		$('.t_4').addClass('hidden');
	}
	if(countE==3){
		$('.t_5').removeClass('hidden');
		$('.c_1').addClass('hidden');
	}else{
		$('.c_5').removeClass('hidden');
		$('.t_5').addClass('hidden');
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
		if(input_answer.toLowerCase()!=answers[i]){
			$('#tab'+i).css("border",'2px solid red');
		}else{
			$('#tab'+i).css("border",'2px solid green');
			correct++;
		}
		i++;
	}
	if(correct==size && countA==3 && countB==3 && countC==3 && countD==3 && countE==3){
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
