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
	if(q==1 && r==1 && s==1 && t==1){
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
	while(a<5){
		$(".c_"+a).addClass('hidden');
		//$(".t_"+a).removeClass('hidden');
		b = a+10;
		c = b+100;
		$('#'+c).css('color','black');
		$('#'+b).css('color','black');
		$('#'+a).css('color','white');
		$('#'+a).css('background','green');
		a++;
	}
	$('#blocks2').hide();
	$('#submit').css('pointer-events','none');
	$('#submit').css('opacity','0.5');
}
function go(a){
	$('#'+a).css('background','#FECA0A');
	$('#'+a).css('pointer-events','none');
	if(a==1 || a==2 || a==3 || a==4){
		b = parseFloat(a)+10;
		c = parseFloat(b)+100;
		$('#'+b).css('pointer-events','none');
		$('#'+c).css('pointer-events','none');
	}else if(a>100){
		b = parseFloat(a)-100;
		c = parseFloat(b)-10;
		$('#'+b).css('pointer-events','none');
		$('#'+c).css('pointer-events','none');
	}else{
		b = parseFloat(a)+100;
		c = parseFloat(a)-10;
		$('#'+b).css('pointer-events','none');
		$('#'+c).css('pointer-events','none');
	}
	
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
}
function bo(a){

	b = a+10;
	c = b+100;
	$('#'+c).css('color','black');
	$('#'+b).css('color','black');
	$('#'+a).css('color','green');
	$('#'+a).css('border','5px solid green');
}