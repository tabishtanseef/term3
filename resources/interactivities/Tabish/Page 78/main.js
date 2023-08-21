function check(){
	val1 = $('#1').val();
	val2 = $('#2').val();
	
	if(val1!='n'){
		$(".c_1").removeClass('hidden');
		$(".t_1").addClass('hidden');
	}
	if(val2!='d'){
		$(".c_2").removeClass('hidden');
		$(".t_2").addClass('hidden');
	}
	if(val1=='n' && val2=='d'){
		$(".t_1").removeClass('hidden');
		$(".c_1").addClass('hidden');
		$(".t_2").removeClass('hidden');
		$(".c_2").addClass('hidden');
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
	$('#1').val('n');
	$('#2').val('d');
	$('#blocks2').hide();
	$('#submit').css('pointer-events','none');
	$('#submit').css('opacity','0.5');
}
