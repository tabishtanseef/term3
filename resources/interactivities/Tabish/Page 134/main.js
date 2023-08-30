var countL=0;
var countNL=0;
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
function drop1(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log('drop1',data);
  if(data=='drag1'){
	countNL++;
  }
  ev.target.appendChild(document.getElementById(data));
}
function drop2(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log('drop2',data);
  if(data=='drag2'){
	countL++;
  }
  ev.target.appendChild(document.getElementById(data));
}


function check(){
	if(countL==7 && countNL==7){
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

function solve(){
	$('#submit').css('pointer-events','none');
	$('#submit').css('opacity','0.5');
	$('.answers').removeClass('hidden');
	$('.ans').css('visibility','hidden');
	$('.solve').removeClass('hidden');
}
 
 
function play(){
	var audio = document.getElementById('audio3');
	audio.play();
}