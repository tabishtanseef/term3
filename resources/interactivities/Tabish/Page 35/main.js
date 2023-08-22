function play(){
	var audio = document.getElementById('audio3');
	audio.play();
}

count = 0;
function go(a){
	$('#'+a).css('background','#FECA0A');
	$('#'+a).css('pointer-events','none');
	if(a<=15){
		count++;
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
	if(count!=15){
		
	}else{
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
		if(correct==size && count==15){
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
}
