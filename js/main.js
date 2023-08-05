let index = 1;
let chap = 1;
let TOC = '';
let player = '';

$(document).ready(function()
{
	if(DATA.font == 'hindi') $('body').css('font-family','var(--chanakyaregular)');
	else if(DATA.font == 'english') $('body').css('font-family','var(--helvitica)');
		
	TOC = DATA.toc;
	player = $('#introplayer');
	addVideo('video/intro.mp4', loadQuestion);
	//loadQuestion();
});

function addVideo(src, fun=null)
{
	player.show();
	player.attr('src',src);
	player.get(0).play();
	
	let id = player.attr('id');
	
	document.getElementById(id).addEventListener('ended', (event) => 
	//player.on('ended', function ()
	{
		if(fun != null) 
		{
			fun();
			fun = null;
		}
	});
}

function loadQuestion()
{
	$('.skip').remove();
	$('#introplayer').hide();
	$('#screen1').show();
	str = '<ul class="chapterList">';
	
	for(var i = 0; i <TOC.length; i++)
	{
		str += '<li onclick="openData(this)" id=chap_'+(i+1)+'>';
		str += '<label>'+TOC[i].chapter+'</label>';
		str += '</li>';
	}
	str += '</ul>';
	$('#screen1').html(str);
}

function openData(_this)
{
	chap = $(_this).attr('id').replace('chap_','');
	index = 1;
	$('#screen1').hide();
	$('#screen2').show();
	
	player = $('#videoplayer');
	
	updateButtons();
}

function onVideoEnd()
{
	console.log('video ends here.....');
}

function gotoHome()
{
	player.get(0).pause();
	player.attr('src','');
	player = null;
	
	window.open('../../../../../../../index.html','_self');
	
	/* $('#screen2').hide();
	$('#screen1').show(); */
}

function gotoNext()
{
	if(index != TOC[chap-1].data.length)
	{
		index++;
	}
	else 
	{
		if(chap != TOC.length)
		{
			chap++;
			index = 1;
		}
	}
	updateButtons();
}

function gotoPrev()
{	
	if(index != 1)
	{
		index--;
	}
	else 
	{
		if(chap != 1)
		{
			chap--;
			index = TOC[chap-1].data.length;
		}
	}
	updateButtons();
}

function updateButtons()
{
	if(chap == 1 && index == 1)
	{
		$('#prev').addClass('disable');
		$('#next').removeClass('disable');
	}
	else if(chap == TOC.length && index == TOC[chap-1].data.length)
	{
		$('#prev').removeClass('disable');
		$('#next').addClass('disable');
	}
	else
	{
		$('#next, #prev').removeClass('disable');	
	}
	
	if(TOC[chap-1].data.length == 1)
	{
		$('#next, #prev').removeClass('disable');
	}
	
	path = TOC[chap-1].data[index-1].path;
	
	$('.chaptxt').html(TOC[chap-1].chapter);
	
	addVideo(path, onVideoEnd);
}