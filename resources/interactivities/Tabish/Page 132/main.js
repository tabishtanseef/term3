var count=0;
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
function drop1(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log(data);
  if(data=='drag1'){
	count++;
  }
  ev.target.appendChild(document.getElementById(data));
}
function drop2(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log(data);
  if(data=='drag2'){
  count++;
  }
  ev.target.appendChild(document.getElementById(data));
}
function drop3(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log(data);
  if(data=='drag3'){
  count++;
  }
  ev.target.appendChild(document.getElementById(data));
}
function drop4(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log(data);
  if(data=='drag4'){
  count++;
  }
  ev.target.appendChild(document.getElementById(data));
}
function drop5(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log(data);
  if(data=='drag5'){
	count++;
  }
  ev.target.appendChild(document.getElementById(data));
}
function drop6(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log(data);
  if(data=='drag6'){
	count++;
  }
  ev.target.appendChild(document.getElementById(data));
}
function check(){
	if(count>=6){
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
	$('.ans').addClass('hidden');
	$('.aa').addClass('hidden');
	$('.solve').removeClass('hidden');
}
 
 
function play(){
	var audio = document.getElementById('audio3');
	audio.play();
}