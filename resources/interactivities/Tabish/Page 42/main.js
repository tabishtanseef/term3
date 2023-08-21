function check(){
	val1 = $('#1').val();
	val2 = $('#2').val();
	val3 = $('#3').val();
	val4 = $('#4').val();
	val5 = $('#5').val();
	
	if(val1!='<'){
		$("#1").css('border',"3px solid red");
	}
	if(val2!='<'){
		$("#2").css('border',"3px solid red");
	}
	if(val3!='>'){
		$("#3").css('border',"3px solid red");
	}
	if(val4!='<'){
		$("#4").css('border',"3px solid red");
	}
	if(val5!='>'){
		$("#5").css('border',"3px solid red");
	}
	if(val1=='<' && val2=='<' && val3=='>' && val4=='<' && val5=='>'){
		i=1;
		while(i<6){
			$("#"+i).css('border',"3px solid green");
			i++;
		}
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
	$('#1').val('<');
	$('#2').val('<');
	$('#3').val('>');
	$('#4').val('<');
	$('#5').val('>');
	$('#blocks2').hide();
	$('#submit').css('pointer-events','none');
	$('#submit').css('opacity','0.5');
}
