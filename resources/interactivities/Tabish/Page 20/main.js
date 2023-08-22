const canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

const canvas2 = document.getElementById("canvas2");
let context2 = canvas2.getContext("2d");
canvas2.addEventListener("touchstart", start2, false);
canvas2.addEventListener("touchmove", draw2, false);
canvas2.addEventListener("mousedown", start2, false);
canvas2.addEventListener("mousemove", draw2, false);
canvas2.addEventListener("touchend", stop2, false);
canvas2.addEventListener("mouseup", stop2, false);
canvas2.addEventListener("mouseout", stop2, false);

const canvas3 = document.getElementById("canvas3");
let context3 = canvas3.getContext("2d");
canvas3.addEventListener("touchstart", start3, false);
canvas3.addEventListener("touchmove", draw3, false);
canvas3.addEventListener("mousedown", start3, false);
canvas3.addEventListener("mousemove", draw3, false);
canvas3.addEventListener("touchend", stop3, false);
canvas3.addEventListener("mouseup", stop3, false);
canvas3.addEventListener("mouseout", stop3, false);

const canvas4 = document.getElementById("canvas4");
let context4 = canvas4.getContext("2d");
canvas4.addEventListener("touchstart", start4, false);
canvas4.addEventListener("touchmove", draw4, false);
canvas4.addEventListener("mousedown", start4, false);
canvas4.addEventListener("mousemove", draw4, false);
canvas4.addEventListener("touchend", stop4, false);
canvas4.addEventListener("mouseup", stop4, false);
canvas4.addEventListener("mouseout", stop4, false);

const canvas5 = document.getElementById("canvas5");
let context5 = canvas5.getContext("2d");
canvas5.addEventListener("touchstart", start5, false);
canvas5.addEventListener("touchmove", draw5, false);
canvas5.addEventListener("mousedown", start5, false);
canvas5.addEventListener("mousemove", draw5, false);
canvas5.addEventListener("touchend", stop5, false);
canvas5.addEventListener("mouseup", stop5, false);
canvas5.addEventListener("mouseout", stop5, false);



let draw_color = "black";
let draw_width = "2";


let is_drawing = false;
let restore_array = [];
let index = -1;

let is_drawing2 = false;
let restore_array2 = [];
let index2 = -1;

let is_drawing3 = false;
let restore_array3 = [];
let index3 = -1;

let is_drawing4 = false;
let restore_array4 = [];
let index4 = -1;

let is_drawing5 = false;
let restore_array5 = [];
let index5 = -1;


window.onload = function() {
	a = localStorage.getItem("lastname");
	if(a=='' || a==null || a==undefined){
		localStorage.setItem("lastname", "Smith");
		location.reload();
	}else{
		localStorage.setItem("lastname", "");
	}
	var canvas = document.getElementById("canvas");
	canvas.width = 600;
	canvas.height = 67;
	var ctx = canvas.getContext("2d");
	var img = document.getElementById("scream");
	ctx.drawImage(img, 0, 0);
	
	var canvas2 = document.getElementById("canvas2");
	canvas2.width = 600;
	canvas2.height = 67;
	var ctx2 = canvas2.getContext("2d");
	var img2 = document.getElementById("scream2");
	ctx2.drawImage(img2, 0, 0);
	
	var canvas3 = document.getElementById("canvas3");
	canvas3.width = 600;
	canvas3.height = 67;
	var ctx3 = canvas3.getContext("2d");
	var img3 = document.getElementById("scream3");
	ctx3.drawImage(img3, 0, 0);
	
	var canvas4 = document.getElementById("canvas4");
	canvas4.width = 600;
	canvas4.height = 67;
	var ctx4 = canvas4.getContext("2d");
	var img4 = document.getElementById("scream4");
	ctx4.drawImage(img4, 0, 0);
	
	var canvas5 = document.getElementById("canvas5");
	canvas5.width = 600;
	canvas5.height = 67;
	var ctx5 = canvas5.getContext("2d");
	var img5 = document.getElementById("scream5");
	ctx5.drawImage(img5, 0, 0);

};

function change_color(element){
	draw_color = element.style.background;
	rgb = draw_color;
	let sep = rgb.indexOf(",") > -1 ? "," : " ";
	rgb = rgb.substr(4).split(")")[0].split(sep);

	let r = (+rgb[0]).toString(16),
	 g = (+rgb[1]).toString(16),
	 b = (+rgb[2]).toString(16);

	if (r.length == 1)
		r = "0" + r;
	if (g.length == 1)
		g = "0" + g;
	if (b.length == 1)
		b = "0" + b;
	
	draw_color = "#" + r + g + b;
	$("#c_p").val(draw_color);
	var elementToChange = document.getElementsByClassName("canvas")[0];
	elementToChange.style.cursor = "url('img/pen.png'), auto";
}

function start(){
	is_drawing = true;
	context.beginPath();
	context.moveTo(event.clientX - canvas.offsetLeft,
					event.clientY - canvas.offsetTop);
	event.preventDefault();
}

function start2(){
	is_drawing2 = true;
	context2.beginPath();
	context2.moveTo(event.clientX - canvas2.offsetLeft,
					event.clientY - canvas2.offsetTop);
	event.preventDefault();
}

function start3(){
	is_drawing3 = true;
	context3.beginPath();
	context3.moveTo(event.clientX - canvas3.offsetLeft,
					event.clientY - canvas3.offsetTop);
	event.preventDefault();
}

function start4(){
	is_drawing4 = true;
	context4.beginPath();
	context4.moveTo(event.clientX - canvas4.offsetLeft,
					event.clientY - canvas4.offsetTop);
	event.preventDefault();
}

function start5(){
	is_drawing5 = true;
	context5.beginPath();
	context5.moveTo(event.clientX - canvas5.offsetLeft,
					event.clientY - canvas5.offsetTop);
	event.preventDefault();
}

function start6(){
	is_drawing6 = true;
	context6.beginPath();
	context6.moveTo(event.clientX - canvas6.offsetLeft,
					event.clientY - canvas6.offsetTop);
	event.preventDefault();
}

function draw(event) {	
	if(is_drawing){
		context.lineTo(event.clientX - canvas.offsetLeft,
					   event.clientY - canvas.offsetTop);
		context.strokeStyle = draw_color;
		context.lineWidth = draw_width;
		context.lineCap = "round";
		context.lineJoin = "round";
		context.stroke();
	}
	event.preventDefault();
}

function draw2(event) {	
	if(is_drawing2){
		context2.lineTo(event.clientX - canvas2.offsetLeft,
					   event.clientY - canvas2.offsetTop);
		context2.strokeStyle = draw_color;
		context2.lineWidth = draw_width;
		context2.lineCap = "round";
		context2.lineJoin = "round";
		context2.stroke();
	}
	event.preventDefault();
}

function draw3(event) {	
	if(is_drawing3){
		context3.lineTo(event.clientX - canvas3.offsetLeft,
					   event.clientY - canvas3.offsetTop);
		context3.strokeStyle = draw_color;
		context3.lineWidth = draw_width;
		context3.lineCap = "round";
		context3.lineJoin = "round";
		context3.stroke();
	}
	event.preventDefault();
}

function draw4(event) {	
	if(is_drawing4){
		context4.lineTo(event.clientX - canvas4.offsetLeft,
					   event.clientY - canvas4.offsetTop);
		context4.strokeStyle = draw_color;
		context4.lineWidth = draw_width;
		context4.lineCap = "round";
		context4.lineJoin = "round";
		context4.stroke();
	}
	event.preventDefault();
}

function draw5(event) {	
	if(is_drawing5){
		context5.lineTo(event.clientX - canvas5.offsetLeft,
					   event.clientY - canvas5.offsetTop);
		context5.strokeStyle = draw_color;
		context5.lineWidth = draw_width;
		context5.lineCap = "round";
		context5.lineJoin = "round";
		context5.stroke();
	}
	event.preventDefault();
}

function draw6(event) {	
	if(is_drawing6){
		context6.lineTo(event.clientX - canvas6.offsetLeft,
					   event.clientY - canvas6.offsetTop);
		context6.strokeStyle = draw_color;
		context6.lineWidth = draw_width;
		context6.lineCap = "round";
		context6.lineJoin = "round";
		context6.stroke();
	}
	event.preventDefault();
}
function stop(event) {
	if(is_drawing){
		context.stroke();
		context.closePath();
		is_drawing = false;
	}
	event.preventDefault();
	if(event.type != 'mouseout'){
		restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
		index += 1;
	}
}
function stop2(event) {
	if(is_drawing2){
		context2.stroke();
		context2.closePath();
		is_drawing2 = false;
	}
	event.preventDefault();
	if(event.type != 'mouseout'){
		restore_array2.push(context2.getImageData(0, 0, canvas2.width, canvas2.height));
		index2 += 1;
	}
}
function stop3(event) {
	if(is_drawing3){
		context3.stroke();
		context3.closePath();
		is_drawing3 = false;
	}
	event.preventDefault();
	if(event.type != 'mouseout'){
		restore_array3.push(context3.getImageData(0, 0, canvas3.width, canvas3.height));
		index3 += 1;
	}
}
function stop4(event) {
	if(is_drawing4){
		context4.stroke();
		context4.closePath();
		is_drawing4 = false;
	}
	event.preventDefault();
	if(event.type != 'mouseout'){
		restore_array4.push(context4.getImageData(0, 0, canvas4.width, canvas4.height));
		index4 += 1;
	}
}
function stop5(event) {
	if(is_drawing5){
		context5.stroke();
		context5.closePath();
		is_drawing5 = false;
	}
	event.preventDefault();
	if(event.type != 'mouseout'){
		restore_array5.push(context5.getImageData(0, 0, canvas5.width, canvas5.height));
		index5 += 1;
	}
}
function stop6(event) {
	if(is_drawing6){
		context6.stroke();
		context6.closePath();
		is_drawing6 = false;
	}
	event.preventDefault();
	if(event.type != 'mouseout'){
		restore_array6.push(context6.getImageData(0, 0, canvas6.width, canvas6.height));
		index6 += 1;
	}
}

function clear_canvas() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var img = document.getElementById("scream");
	ctx.drawImage(img, 0, 0);
	restore_array=[];
	index=-1;
}


function clear_canvas2() {
	var canvas2 = document.getElementById("canvas2");
	var ctx2 = canvas2.getContext("2d");
	var img2 = document.getElementById("scream2");
	ctx2.drawImage(img2, 0, 0);
	restore_array2=[];
	index2=-1;
}


function clear_canvas3() {
	var canvas3 = document.getElementById("canvas3");
	var ctx3 = canvas3.getContext("2d");
	var img3 = document.getElementById("scream3");
	ctx3.drawImage(img3, 0, 0);
	restore_array3=[];
	index3=-1;
}


function clear_canvas4() {
	var canvas4 = document.getElementById("canvas4");
	var ctx4 = canvas4.getContext("2d");
	var img4 = document.getElementById("scream4");
	ctx4.drawImage(img4, 0, 0);
	restore_array4=[];
	index4=-1;
}

function clear_canvas5() {
	var canvas5 = document.getElementById("canvas5");
	var ctx5 = canvas5.getContext("2d");
	var img5 = document.getElementById("scream5");
	ctx5.drawImage(img5, 0, 0);
	restore_array5=[];
	index5=-1;
}

function clear_canvas6() {
	var canvas6 = document.getElementById("canvas6");
	var ctx6 = canvas6.getContext("2d");
	var img6 = document.getElementById("scream6");
	ctx6.drawImage(img6, 0, 0);
	restore_array6=[];
	index6=-1;
}



function undo_last() {
	if(index<=0){
		clear_canvas();
	}else{
		index -= 1;
		restore_array.pop();
		context.putImageData(restore_array[index],0,0);
	}
}

function undo_last2() {
	if(index2<=0){
		clear_canvas2();
	}else{
		index2 -= 1;
		restore_array2.pop();
		context2.putImageData(restore_array2[index2],0,0);
	}
}

function undo_last3() {
	if(index3<=0){
		clear_canvas3();
	}else{
		index3 -= 1;
		restore_array3.pop();
		context3.putImageData(restore_array3[index3],0,0);
	}
}

function undo_last4() {
	if(index4<=0){
		clear_canvas4();
	}else{
		index4 -= 1;
		restore_array4.pop();
		context4.putImageData(restore_array4[index4],0,0);
	}
}

function undo_last5() {
	if(index5<=0){
		clear_canvas5();
	}else{
		index5 -= 1;
		restore_array5.pop();
		context5.putImageData(restore_array5[index5],0,0);
	}
}

function undo_last6() {
	if(index6<=0){
		clear_canvas6();
	}else{
		index6 -= 1;
		restore_array6.pop();
		context6.putImageData(restore_array6[index6],0,0);
	}
}

function erase() {
	draw_color = 'white';
	draw_width = "20";
	var elementToChange = document.getElementsByClassName("canvas")[0];
	elementToChange.style.cursor = "url('img/eraser.png'), auto";
}
function pen() {
	draw_color = 'black';
	draw_width = "2";
	var elementToChange = document.getElementsByClassName("canvas")[0];
	elementToChange.style.cursor = "url('img/pen.png'), auto";
}
 
function play(){
	var audio = document.getElementById('audio3');
	audio.play();
}

