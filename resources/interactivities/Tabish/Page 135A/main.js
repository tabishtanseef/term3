var count=0;
const correct = [];
const incorrect = [];
function go(a){
	$('#'+a).css('pointer-events','none');
	$('#'+a).css('border','2px solid blue');
	if(a<5){
		count++;
		correct.push(a);
	}else{
		incorrect.push(a);
	}
}

function check(){
	correct.forEach(myFunction);
	incorrect.forEach(myFunction2);
	len = incorrect.length;
	if(count>=4 && len==0){
		var audio = document.getElementById("audio1");
		audio.play();
		setTimeout(function(){ 
			$('#blocks').show();
		},1000);
	}
	else{
	 var audio = document.getElementById("audio2");
		   audio.play();
		setInterval(function(){ 
			$('#blocks2').show();
		},1000);
	}
}
function myFunction(a, index){
	$('#'+a).css('border','2px solid green');
	$('.t_'+a).removeClass('hidden');
}
function myFunction2(a, index){
	$('#'+a).css('border','2px solid red');
	$('.c_'+a).removeClass('hidden');
}
function solve(){
	$('#submit').css('pointer-events','none');
	$('#submit').css('opacity','0.5');
	a = 1;
	while(a<=8){
		$('#'+a).css('border','0px');
		$('.t_'+a).addClass('hidden');
		$('.c_'+a).addClass('hidden');
		a++;
	}
	a = 1;
	while(a<=4){
		$('#'+a).css('border','2px solid green');
		$('.t_'+a).removeClass('hidden');
		a++;
	}
}
 
 
function play(){
	var audio = document.getElementById('audio3');
	audio.play();
}