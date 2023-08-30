var first=0;
var second=0;
var third=0;
var count=0;
function colorpick(a){
	console.log(a);
	if(a==11){
		$('#dim').css('cursor','url(img/yb.png),pointer');
		first=1;
		second=0;
		third=0;
	}
	if(a==12){
		$('#dim').css('cursor','url(img/rb.png),pointer');
		second=1;
		first=0;
		third=0;
	}
	if(a==13){
		$('#dim').css('cursor','url(img/gb.png),pointer');
		third=1;
		first=0;
		second=0;
	}
}



function go(a) {
	if(a==3 && first==1){
		var b=a+1;
		$('#'+a).addClass('hidden');
		$('#'+b).removeClass('hidden');
		count++;
	}else if(a==0 && second==1){
		var b=a+1;
		$('#'+a).addClass('hidden');
		$('#'+b).removeClass('hidden');
		count++;
	}else if(a==5 && third==1){
		var b=a+1;
		$('#'+a).addClass('hidden');
		$('#'+b).removeClass('hidden');
		count++;
	}
}


function check() {
	$("#sol").css("pointer-events", "auto");
	if(count==3){
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
function solve() {
	$('#submit').css("pointer-events", "none");
	$('#submit').css("opacity", "0.7");
	$('#0').addClass('hidden');
	$('#3').addClass('hidden');
	$('#5').addClass('hidden');
	$('#1').removeClass('hidden');
	$('#4').removeClass('hidden');
	$('#6').removeClass('hidden');
}