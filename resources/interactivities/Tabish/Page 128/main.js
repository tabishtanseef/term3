var q=0;
var r=0;
var s=0;
var t=0;
var u=0;
var v=0;

function check(){
	if(q==1){
		$(".t_1").removeClass('hidden');
		$(".c_1").addClass('hidden');
		bo(1);
	}else{
		$(".c_1").removeClass('hidden');
		$(".t_1").addClass('hidden');
	}
	if(r==1){
		$(".t_2").removeClass('hidden');
		$(".c_2").addClass('hidden');
		bo(2);
	}else{
		$(".c_2").removeClass('hidden');
		$(".t_2").addClass('hidden');
	}
	if(s==1){
		$(".t_3").removeClass('hidden');
		$(".c_3").addClass('hidden');
		bo(3);
	}else{
		$(".c_3").removeClass('hidden');
		$(".t_3").addClass('hidden');
	}
	if(t==1){
		$(".t_4").removeClass('hidden');
		$(".c_4").addClass('hidden');
		bo(4);
	}else{
		$(".c_4").removeClass('hidden');
		$(".t_4").addClass('hidden');
	}
	if(u==1){
		$(".t_5").removeClass('hidden');
		$(".c_5").addClass('hidden');
		bo(5);
	}else{
		$(".c_5").removeClass('hidden');
		$(".t_5").addClass('hidden');
	}
	if(v==1){
		$(".t_6").removeClass('hidden');
		$(".c_6").addClass('hidden');
		bo(6);
	}else{
		$(".c_6").removeClass('hidden');
		$(".t_6").addClass('hidden');
	}
	if(q==1 && r==1 && s==1 && t==1 && u==1 && v==1){
		$("#sol").css("pointer-events", "auto");
		var audio = document.getElementById('audio1');
		audio.play();
		setTimeout(function(){ 
		 $('#blocks').show(); 
		},500);
	}else{
		var audio = document.getElementById('audio2');
		audio.play();
		setTimeout(function(){ 
			$('#blocks2').show();
		},1000);
	}
}

function play(){
	var audio = document.getElementById('audio3');
	audio.play();
}

function solve(){
	a=1;
	while(a<7){
		$(".c_"+a).addClass('hidden');
		//$(".t_"+a).removeClass('hidden');
		b = a+10;
		c = b+100;
		$('#'+a).css('color','white');
		$('#'+a).css('background','green');
		a++;
	}
	$('#blocks2').hide();
	$('#submit').css('pointer-events','none');
	$('#submit').css('opacity','0.5');
}
function go(a){
	$('#'+a).css('background','cyan');
	$('#'+a).css('pointer-events','none');
	
	if(a==1){
		q++;
	}
	if(a==2){
		r++;
	}
	if(a==3){
		s++;
	}
	if(a==4){
		t++;
	}
	if(a==5){
		u++;
	}
	if(a==6){
		v++;
	}
}
function bo(a){
	$('#'+a).css('background','green');
}