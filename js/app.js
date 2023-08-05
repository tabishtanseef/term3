const MAX_WORDS = 25;
const HIGLIGHT_LIST = appdb.config.id + '_list';
const HIGLIGHT_KEYWORD = appdb.config.id + '_highlight_';
const NOTE_KEYWORD = appdb.config.id + '_note_';
const AUDIO_KEYWORD = appdb.config.id + '_audio_';
const LAST_PAGE = appdb.config.id + '_LAST_PAGE';
const LAST_CANVAS = appdb.config.id + '_LAST_CANVAS';
const LAST_MODE = appdb.config.id + '_LAST_MODE';
var audioChunks = [];
var isNodeApp = false;
var videoTimeout = 21000;

var firstInitalization = true;
var eBookConfig = {
	total: appdb.config.totalPages,
	current: 1,
	mode: 'double',
	pages: 1,
	currentPages: [1],
	music: true,
	minZoom: 1,
	maxZoom: 2,
	zoomDiff: 0.2,
	zoom: 1,
	recorder: true,
	paintApp: true
}

if (typeof nw == 'object') isNodeApp = true;
if (isNodeApp) {
	window.fs = require('fs');
}

var blobToBase64 = function (blob, cb) {
	var reader = new FileReader();
	reader.onload = function () {
		var dataUrl = reader.result;
		var base64 = dataUrl.split(',')[1];
		cb(base64);
	};
	reader.readAsDataURL(blob);
};

var readerApp = {

	'setFancyBoxIframe': function () {
		var _this = this;
		$(".iframe-fancybox").fancybox({
			beforeLoad: function (instance, slide) {
				if (window.fancyboxURL != undefined && window.fancyboxURL != null && window.fancyboxURL != "") {
					slide.src = window.fancyboxURL;
					window.fancyboxURL = "";
				}
			},
			afterLoad: function (instance, slide) {

				if (eBookConfig.music == true) {
					_this.toggleMusic();
				}
				stopAudio();
				if (window.fancyboxSize != undefined && window.fancyboxSize != null && window.fancyboxSize != "") {
					var iSize = window.fancyboxSize.split('x');

					if (iSize[0].indexOf('%') != -1) {
						$(".fancybox-content").css({
							height: iSize[1],
							width: iSize[0]
						});
						window.fancyboxSize = "";
					}
					else {
						$(".fancybox-content").css({
							height: iSize[1] + 'px',
							width: iSize[0] + 'px'
						});
						window.fancyboxSize = "";
					}

					console.log($(".fancybox-content").width() + " ___ " + $(".fancybox-content").height() + ' width');

					/////////
					localStorage.setItem("fancyboxSizeW", $(".fancybox-content").width());
					localStorage.setItem("fancyboxSizeH", $(".fancybox-content").height());
					/////////

				} else {
					var height = instance.current.opts.width;
					var width = instance.current.opts.height;

					/////////
					width = localStorage.getItem("fancyboxSizeW");
					height = localStorage.getItem("fancyboxSizeH");
					/////////

					console.log(width + " ___ " + height + 'widtrh');
					if (width.indexOf('%') != -1) {
						$(".fancybox-content").css({
							height: height,
							width: width
						});
					}
					else {
						$(".fancybox-content").css({
							height: height + 'px',
							width: width + 'px'
						});
					}
				}

			}
		});
	},

	'setFancyBoxVideo': function () {
		var _this = this;


		$(".video-fancybox").click(function (e) {
			e.preventDefault();

			if (eBookConfig.music == true) {
				_this.toggleMusic();
			}
			stopAudio();

			var fancyVidDim = {
				width: '637px',
				height: '479px'
			};
			if (window.fancyboxSize != undefined && window.fancyboxSize != null && window.fancyboxSize != "") {
				var iSize = window.fancyboxSize.split('x');
				//fancyVidDim.width = (parseInt(iSize[0]) + 150) + 'px';
				//fancyVidDim.height = (parseInt(iSize[1]) + 250) + 'px';
				window.fancyboxSize = "";
			}
			//$("#popupVideo").css({width: fancyVidDim.width, height: fancyVidDim.height});

			var videoSource = {
				'chrome': {
					src: $(this).attr('data-video-mp4'),
					type: 'video/ogg'
				}
			}

			$("#video-container").html('<div id="jp_container_1" class="jp-video jp-video-360p" role="application" aria-label="media player"><div class="jp-type-single"><div id="jquery_jplayer_1" class="jp-jplayer"></div><div class="jp-gui"><div class="jp-video-play"><button class="jp-video-play-icon" role="button" tabindex="0">play</button></div><div class="jp-interface"><div class="jp-progress"><div class="jp-seek-bar"><div class="jp-play-bar"></div></div></div><div class="jp-current-time" role="timer" aria-label="time">&nbsp;</div><div class="jp-duration" role="timer" aria-label="duration">&nbsp;</div><div class="jp-controls-holder"><div class="jp-controls"><button class="jp-play" role="button" tabindex="0">play</button><button class="jp-stop" role="button" tabindex="0">stop</button></div><div class="jp-volume-controls"><button class="jp-mute" role="button" tabindex="0">mute</button><button class="jp-volume-max" role="button" tabindex="0">max volume</button><div class="jp-volume-bar"><div class="jp-volume-bar-value"></div></div></div><div class="jp-toggles"><button class="jp-full-screen" role="button" tabindex="0">full screen</button></div></div></div></div><div class="jp-no-solution"><span>Uh oh! Video not supported.</span></div></div></div>');

			if (window.fancyboxURL != undefined && window.fancyboxURL != null && window.fancyboxURL != "") {
				videoSource.chrome.src = window.fancyboxURL;
				window.fancyboxURL = "";
			}
			$("#jquery_jplayer_1").jPlayer({
				ready: function () {
					console.log('Video dependency loaded.');

					$("#jquery_jplayer_1").jPlayer("setMedia", {
						title: "",
						ogv: videoSource.chrome.src
					});
					console.log(videoSource.chrome.src);

					setTimeout(function () {
						$("#jquery_jplayer_1").jPlayer("play", 0);
					}, 400);
				},
				swfPath: "js/plugins/jPlayer-2.9.2/jplayer",
				supplied: "ogv",
				size: {
					width: fancyVidDim.width,
					height: fancyVidDim.height,
					cssClass: "jp-video-360p"
				},
				useStateClassSkin: true,
				autoBlur: false,
				smoothPlayBar: true,
				keyEnabled: true,
				remainingDuration: true,
				toggleDuration: true
			});


			/*
			var video = videojs("animation-video");
			video.autoplay(true);
			video.src([videoSource.chrome]);
			setTimeout(function() {
				video.load();
			}, 400);
			*/


			$.fancybox.open({
				src: '#popupVideo',
				type: 'inline',
				opts: {
					beforeOpen: function () {

					},

					afterClose: function () {
						//var video = videojs("animation-video");
						//video.pause();
						$("#jquery_jplayer_1").jPlayer("pause", 0);
					}
				}
			});

		});

	},

	'prepareMenu': function () {
		var menuListHTML = "";
		for (var key in appdb.ebook) {
			var groupism = key;
			if (key != "zother") {
				var mItem = appdb.ebook[key];
				var menuSubHead = '<a href="#"><i class="fa ' + mItem.icon + '"></i> <span class="nav-label">' + mItem.menu + '</span> <span class="fa arrow"></span></a>';
				var menuSubHTML = '';
				for (var i = 0; i < mItem.data.length; i++) {
					var item = mItem["data"][i];
					var linkHref = "";
					var classList = "";
					if (mItem["link"] == "iframe") {
						var isPage = (typeof item['page'] == 'undefined' ? null : item['page']);
						var onClick = "";
						if (isPage != null) { onClick = "onClick=readerApp.turnPage(" + item['page'] + ") "; }
						var size = item['size'].split('x');
						linkHref = onClick + 'data-fancybox="' + groupism + '" data-type="iframe" data-height="' + size[0] + '" data-width="' + size[1] + '" data-src="' + item['path'] + '" data-fancysize="' + item['size'] + '"';
						classList = "iframe-fancybox";
					} else if (mItem["link"] == "video") {
						var isPage = (typeof item['page'] == 'undefined' ? null : item['page']);
						var onClick = "onClick=\"openVideo(\'" + item['path'] + "\')\"";
						if (isPage != null) { onClick = "onClick=readerApp.turnPage(" + item['page'] + ") "; }
						linkHref = onClick + 'data-video-mp4="' + item['path'] + '" data-src="#popupVideo"';
						classList = "video-fancybox";
					} else if (mItem["link"] == "content") {
						linkHref = 'data-page="' + item['page'] + '" onClick="readerApp.turnPage(' + item['page'] + ')"';
						classList = "ebook-toc";
					} else if (mItem["link"] == "external") {
						linkHref = 'onClick="readerApp.openLink(\'' + item['path'] + '\')"';
						classList = "external-link";
					}
					menuSubHTML += '<li><a ' + linkHref + ' class="' + classList + '" href="javascript:void(0)">' + item['title'] + '</a></li>';
				}
				menuListHTML += '<li>' + menuSubHead + '<ul class="nav nav-second-level">' + menuSubHTML + '</ul>' + '</li>'
			}
		}

		for (var i = 0; i < appdb.ebook["zother"].length; i++) {
			var item = appdb.ebook["zother"][i];

			var linkHref = "";
			var classList = "";
			if (item["link"] == "iframe") {
				linkHref = 'data-fancybox data-src="' + item['path'] + '" data-fancysize="' + item['size'] + '"';
				classList = "iframe-fancybox";
			}

			menuListHTML += '<li><a ' + linkHref + ' class="' + classList + '" href="javascript:void(0)"><i class="fa ' + item['icon'] + '"></i> <span class="nav-label">' + item['title'] + '</span> </a></li>';
		}

		$("#side-menu-wrapper").html('<ul class="nav" id="side-menu">' + menuListHTML + '</ul>');
		$('#side-menu').metisMenu();	//MetsiMenu


		$("#side-menu-wrapper [data-fancysize]").click(function (e) {
			window.fancyboxSize = this.getAttribute('data-fancysize');
		});
	},

	'openLink': function (url) {
		window.open(url, "_blank");
		return false;
	},

	'turnPageHelper': function (pages) {
		$('#book').turn('page', pageNum);
	},

	'togglebgMusic': function () {
		var audio = $("#bgMusic")[0];
		var src = $('#mute').attr('src');
		var newsrc = (src == 'img/ic-music.png') ? 'img/ic-musicmute.png' : 'img/ic-music.png';
		$('#mute').attr('src', newsrc);
		if (audio.paused) {

			audio.play();
		}
		else {

			audio.pause();
		}
	},

	'flipNext': function () {
		$('#book').turn('next');
		var audio = $("#pageflip")[0];
		audio.currentTime = 0;
		audio.play();
		audio.loop = false;
	},

	'flipPrev': function () {
		$('#book').turn('previous');
		var audio = $("#pageflip")[0];
		audio.currentTime = 0;
		audio.play();
		audio.loop = false;
	},

	'navigatePage': function (e) {
		$("#alert-009").addClass('hide');
		var keyCode = (window.event) ? e.which : e.keyCode;
		if (keyCode == 13) {
			var newPage = $("#pageSearch").val();


			if (!isNaN(newPage)) {

				if ((newPage == eBookConfig.total) || (newPage == eBookConfig.total - 1)) {
					$('#book').turn('page', parseFloat(newPage) + 2);
					$("#pageSearch").blur();
				} else {

					newPage = parseFloat(newPage) + 2;
					//console.log('val:'+newPage+ ': '+eBookConfig.total);

					if (newPage < eBookConfig.total + 1 && eBookConfig.total > 0) {
						//this.turnPage(newPage);
						$('#book').turn('page', newPage);
						$("#pageSearch").blur();
					} else {
						$("#alert-009")
							.removeClass('hide')
							.find('.alert')
							.text("Please enter page number between 1 and " + eBookConfig.total);

						setTimeout(function () {
							$("#alert-009").addClass('hide');
						}, 3000);
					}
				}
			} else {
				$("#alert-009")
					.removeClass('hide')
					.find('.alert')
					.text("Please enter valid number.");

				setTimeout(function () {
					$("#alert-009").addClass('hide');
				}, 3000);

			}
		}
	},

	'getCurrentPage': function () {
		var page = $('#book').turn('view');
		if (page[0] == 0) {
			return [1]
		} else {
			return page;
		}

	},

	'clearPagi': function () {
		$("#pageSearch").val('');
	},

	'turnPage': function (pageNum) {
		$('#book').turn('page', pageNum);
	},

	'invalidPage': function (pageNum) {
		if (pageNum > 0 && pageNum <= eBookConfig.total) {
			return false;
		} else {
			return true;
		}
	},

	'setPageNumBack': function () {
		var currentPages = $("#book").turn('view');

		var bookMode = $('#book').turn('display');

		if (currentPages[0] == 0) { theArray = ['cover']; }
		else if (currentPages[0] == 2) { theArray = [0, 1]; }
		else { theArray = [currentPages[0] - 2, currentPages[0] - 1]; }
		//else{theArray = [currentPages[0]-2,currentPages[0]-1];}

		//console.log(theArray + ' : ' + currentPages);

		currentPages = theArray;

		var currentPage = currentPages.join(" -- ");
		if (currentPage == "0-1") {
			currentPage = '1';
		}
		if (currentPage == eBookConfig.total + '-' + (parseFloat(eBookConfig.total) + 1)) {
			currentPage = eBookConfig.total;
		}

		if (bookMode == 'single') {
			//console.log(currentPages[0]);
			if (currentPages[0] == -1) {
				currentPage = 'cover';
			} else {
				currentPage = currentPages[0];
				setStorage(LAST_PAGE, currentPages[0] - 1);
			}
		} else {

			if (currentPage.indexOf("-0") != -1) {
				currentPage = currentPage.replace("-0", "");
			}
			setStorage(LAST_PAGE, currentPage.split("-")[0]);
		}

		$("#pageSearch").val(currentPage);
		eBookConfig.current = currentPages[0];
		if (eBookConfig.current == 0) eBookConfig.current = 1;
		for (var i = 0; i < currentPages.length; i++) {
			console.log(currentPages[i]);
			getNotes(currentPages[i]);
		}
		readerApp.bookmark.presentui();
		closeAllPannels();
	},

	'findSearch':function replaceText() {

		$("body").find(".highlight").removeClass("highlight");
	
		var searchword = $("#searchtxt").val();
	
		var custfilter = new RegExp(searchword, "ig");
		var repstr = "<span class='highlight'>" + searchword + "</span>";
	
		if (searchword != "") {
			$('body').each(function() {
				$(this).html($(this).html().replace(custfilter, repstr));
			})
		}
	},

	'bookmark': {

		'get': function () {
			var bookmarksList = [];
			var items = readerApp.storage.get(appdb.config.id + '_bookmark');
			if (items != undefined && items != null && items != "") {
				bookmarksList = JSON.parse(items);
			}
			return bookmarksList;
		},

		'add': function () {
			$("#takeBookmark").addClass('booked');
			var bookmarksList = readerApp.bookmark.get();
			var currentPage = $("#book").turn('view')[0];

			var bookmarkIndex = bookmarksList.indexOf(currentPage);

			if (bookmarkIndex == -1) {
				bookmarksList.push(currentPage);
				bookmarksList.sort(function (a, b) { return a - b; });
				readerApp.storage.set(appdb.config.id + '_bookmark', JSON.stringify(bookmarksList));
			}

			readerApp.bookmark.initialize();

		},

		'remove': function () {
			$("#takeBookmark").removeClass('booked');
			var bookmarksList = readerApp.bookmark.get();
			var bookmarkIndex = bookmarksList.indexOf(eBookConfig.current);
			if (bookmarkIndex == -1) {
				console.log("Error! Bookmark not available.");
			} else {
				bookmarksList.splice(bookmarkIndex, 1);
				if (bookmarksList.length == 0) {
					readerApp.storage.del(appdb.config.id + '_bookmark');
				} else {
					bookmarksList.sort(function (a, b) { return a - b; });
					readerApp.storage.set(appdb.config.id + '_bookmark', JSON.stringify(bookmarksList));
				}

			}

			readerApp.bookmark.initialize();
		},

		'action': function () {
			if ($("#takeBookmark").hasClass('booked')) {
				this.remove();
			} else {
				this.add();
			}
		},

		'presentui': function () {
			var bookmarksList = readerApp.bookmark.get();
			var currentPages = $("#book").turn('view');

			$("#takeBookmark").removeClass("booked");
			for (var i = 0; i < currentPages.length; i++) {
				if (bookmarksList.indexOf(currentPages[i]) != -1) {
					$("#takeBookmark").addClass("booked");
				}
			}
		},

		'initialize': function () {
			var bookmarksList = readerApp.bookmark.get();
			bookmarksList.sort(function (a, b) { return a - b; });
			var $container = $("#bookmark-container");
			if (bookmarksList.length == 0) {
				$container.html('<li class="bookmarks list">\
				<div class="text-center link-block">\
					<strong>No Bookmarks Yet.</strong>\
					<i class="fa fa-angle-right"></i>\
				</div>\
			</li>');;
			} else {
				var bookingHTML = "";
				for (var i = 0; i < bookmarksList.length; i++) {
					bookingHTML += '<li>\
                            <a href="#" onClick="readerApp.turnPage(' + bookmarksList[i] + ')">\
                                <div>\
                                    <i class="fa fa-chevron-right fa-fw"></i> Page ' + (bookmarksList[i] - 1) + '\
                                </div>\
                            </a>\
                        </li>';
					$container.html(bookingHTML);
				}
				$container.html(bookingHTML);
				 $('#bookmark-container li:eq(0)').before("<h4>Bookmarks</h4>");
			}


		
			$('#bookmark-container li:eq(0)').before("<li class='addbookmarkbtn' data-toggle='modal' onclick='readerApp.bookmark.action()' data-tooltip='tooltip' data-placement='bottom'><div class='text-center link-block'><strong>Add Bookmarks </strong><i class='fa fa-angle-right'></i></div></li>");

			$("#total-bookmarks").text(bookmarksList.length);
			this.presentui();
		}

	},

	'storage': {
		'get': function (key) {
			return window.localStorage.getItem(key);
		},

		'set': function (key, data) {
			window.localStorage.setItem(key, data);
		},

		'del': function (key) {
			window.localStorage.removeItem(key);
		}
	},

	'spotight': {
		'init': function () {
			$('.searchlight')
				.on('mousemove', function (event) {
					$(this).addClass('on').css({ 'margin-left': event.pageX - 150, 'margin-top': event.pageY - 150 });
				})
				.on('mouseout', function (event) {
					$(this).removeClass('on');
				})
				.on('click', function () {
					$(this).fadeOut(function () {
						$(this).remove();
					});
				});
		},

		'activate': function (width, height) {
			console.log(width, height);
			$("#spotlight-selection-menu").modal('hide');
			if ($("#spotlight-section").length) {
				$("#spotlight-section").remove();
			} else {
				$("body").append('<div style="height: ' + height + 'px; width: ' + width + 'px;" class="searchlight" id="spotlight-section"></div>');
				this.init();
			}
		}
	},

	// 	'Home': function() {
	// 		$('#home_btn').click(function(){
	// 			window.location.href='home.html';
	// 		 })
	// },

	'zoom': {
		resizeBook: function () {
			resizeBook();
		},

		'max': function () {
			if (eBookConfig.zoom + eBookConfig.zoomDiff <= eBookConfig.maxZoom) {
				eBookConfig.zoom += eBookConfig.zoomDiff;
				zoomBook(eBookConfig.zoom);
			}

		},

		'min': function () {
			if (eBookConfig.zoom - eBookConfig.zoomDiff >= eBookConfig.minZoom) {
				eBookConfig.zoom += -eBookConfig.zoomDiff;
				zoomBook(eBookConfig.zoom);
			}
		}

	},

	'getHighlights': function () {
		var $highlightContainer = $('#highlights-containers');
		$highlightContainer.empty();

		var highlightPage = window.localStorage.getItem(HIGLIGHT_LIST);
		if (highlightPage != null && highlightPage != undefined && highlightPage != "") {
			var dataObj = JSON.parse(highlightPage);

			for (var i = 0; i < dataObj.length; i++) {
				$highlightContainer.append('<li>\
					<a href="#" onClick="readerApp.turnPage(' + dataObj[i] + ')">\
						<div>\
							<i class="fa fa-chevron-right fa-fw"></i> <b>Page ' + (dataObj[i] - 2) + '</b> \
						</div>\
					</a>\
				</li>');
			}
		}

		$('#highlights-containers li:eq(0)').before("<a class='menu-drop' data-toggle='modal' onclick='readerApp.draw.toggleTools()' data-tooltip='tooltip' data-placement='bottom'><i class='fa fa-pencil'> </i> Add highlights </a>");


		

		$('#highlights-containers li:eq(0)').before("<h4>View pen and highlight</h4>");

		var totalHighlights = $("#highlights-containers > li").length;
		$("#total-highlights").text(totalHighlights);
		if (totalHighlights == 0) {
			$("#highlights-containers").html('<a class="menu-drop" data-toggle="modal" onclick="readerApp.draw.toggleTools()" data-tooltip="tooltip" data-placement="bottom"><i class="fa fa-pencil"> </i> Add highlights</a>\
				<li>\
					<div class="text-center link-block">\
						<strong>No Highlights Yet.</strong>\
						<i class="fa fa-angle-right"></i>\
					</div>\
				</li>');
		}

	},

	'prepareNoteAdd': function (_self) {
		$("#textarea-note").val('');
		var pages = this.getCurrentPage();
		var selectHTML = '';
		for (var i = 0; i < pages.length; i++) {
			selectHTML += '<option value="' + pages[i] + '">Page ' + (pages[i] - 2) + '</option>'
		}
		$(_self).find('.pages-list-inner').html(selectHTML)


	},

	'saveNote': function () {
		$("#notes-validation").addClass('hide');
		var pageNum = $("#notes-pages").val();
		var notesval = $.trim($("#textarea-note").val());
		if (notesval == "") {
			$("#notes-validation").removeClass('hide');
			return false;
		}

		var localkey = NOTE_KEYWORD + pageNum;
		var localData = window.localStorage.getItem(localkey);

		var notesData = [];
		if (localData != undefined && localData != null) {
			notesData = JSON.parse(localData);
		}

		var noteObj = {
			title: notesval,
			posX: 50,
			posY: 50,
			page: pageNum,
			timestamp: moment().unix()
		}

		notesData.push(noteObj);
		window.localStorage.setItem(localkey, JSON.stringify(notesData));
		$("#notes-addition").modal('hide');
		this.reloadNotes();
		getNotes(pageNum);

	},

	'reloadNotes': function () {


		$('#notes-containers').empty();
		var i = 1;
		while (i <= eBookConfig.total) {
			var checkUnique = new Array();
			var notesData = window.localStorage.getItem(NOTE_KEYWORD + i);
			if (notesData != null) {
				myNote = JSON.parse(notesData);
				var textOnly = "";
				for (j = 0; j < myNote.length; j++) {

					var textOnly = myNote[j].title;


					if (textOnly.length > MAX_WORDS)
						textOnly = textOnly.substr(0, MAX_WORDS) + "...";


					$('#notes-containers').append('<li>\
                            <a href="#" onClick="readerApp.turnPage(' + i + ')">\
                                <div>\
                                    <i class="fa fa-chevron-right fa-fw"></i> <b>Page ' + i + '</b> ' + textOnly + '\
                                </div>\
                            </a>\
                        </li>');
				}
			}
			i++;
		}

		$('#notes-containers li:eq(0)').before("<a class='menu-drop' data-toggle='modal' data-target='#notes-addition' id='ebook-addnote' data-tooltip='tooltip' data-placement='bottom'><i class='fa fa-pencil-square-o'> Add New Notes </i></a>");

		$('#notes-containers li:eq(0)').before("<h4>View Notes</h4>");

		var totalNotes = $("#notes-containers > li").length;
		$("#total-notes").text(totalNotes);
		if (totalNotes == 0) {
			$("#notes-containers").html('<a class="menu-drop" data-toggle="modal" data-target="#notes-addition" id="ebook-addnote" data-tooltip="tooltip" data-placement="bottom"><i class="fa fa-pencil-square-o"> Add New Notes </i></a>\
					<li>\
					<div class="text-center link-block">\
						<strong>No Notes Yet.</strong>\
						<i class="fa fa-angle-right"></i>\
					</div>\
				</li>');
		}


	},

	'initMusic': function () {
		var _this = this;
		soundManager.setup({
			url: 'js/plugins/soundmanagerv297a-20150601/swf/',
			flashVersion: 9, // optional: shiny features (default = 8)
			// optional: ignore Flash where possible, use 100% HTML5 mode
			preferFlash: false,
			onready: function () {
				_this.bgMusicOn();
				eBookConfig.music = true;
				_this.toggleMusic();
			}
		});
	},

	'bgMusicOn': function () {

		var bgSoundMusic = soundManager.createSound(
			{
				id: 'bgMusic',
				url: './audio/background.mp3',
				useFlashBlock: false,
				autoLoad: true,
				autoPlay: true,
				onfinish: function () {
					bgSoundMusic.play();
				}
			});


	},

	'toggleMusic': function () {
		if (eBookConfig.music == true) {
			$("#music_controls_off").hide();
			$("#music_controls_on").show();
			soundManager.getSoundById('bgMusic').stop()
		} else {
			$("#music_controls_on").hide();
			$("#music_controls_off").show();
			soundManager.getSoundById('bgMusic').play();
		}
		eBookConfig.music = !eBookConfig.music;
	},

	'toggleBookMode': function () {
		var bookMode = $('#book').turn('display');
		var label;
		if (bookMode == 'single') {
			$('#book').turn('display', 'double');
			eBookConfig.mode = 'double';
		} else {
			$('#book').turn('display', 'single');
			eBookConfig.mode = 'single';
		}
		resizeBook();
		$("#toggle_multi_on").toggle();
		$("#toggle_multi_off").toggle();
		this.setPageNumBack();
	},

	'closeAudio': function () {
		$("#record-audio").fadeOut();
	},

	'showAudioPanel': function () {
		closeAllPannels("#record-audio");
		$("#record-audio").show();

		var ele = document.getElementById('record-audio');
		readerApp.prepareNoteAdd(ele);
		if (firstInitalization) {
			firstInitalization = false;
			readerApp.initAudioRecorder();
		}
		if (eBookConfig.music == true) {
			readerApp.toggleMusic();
		}
		stopAudio();
	},

	'initAudioRecorder': function () {

		if (navigator.mediaDevices == null || navigator.mediaDevices == undefined || navigator.mediaDevices == "") {
			$("#recorder-support").removeClass('hide');
			return false;
		}

		if (eBookConfig.recorder) {
			$("#recorder-info").removeClass('hide');

			navigator.mediaDevices.getUserMedia({ audio: true })
				.then(stream => {

					rec = new MediaRecorder(stream);
					$("#recorder-info").addClass('hide');
					$("#recorder-area").removeClass('hide');
					rec.ondataavailable = e => {
						audioChunks.push(e.data);
						if (rec.state == "inactive") {
							var blob = new Blob(audioChunks, { type: 'audio/x-mpeg-3' });
							var recordedAudio = document.getElementById('recordedAudio');

							var aud = document.createElement('audio');
							aud.src = URL.createObjectURL(blob);
							aud.controls = true;
							console.log(aud);
							//$("#record-list").append(aud);

							var currentPage = $("#record-pages-list option:selected").text();
							var newId = 'recorditem-' + $("#record-list tr").length;
							$("#record-list").append('<tr><td>' + currentPage + '</td></tr><tr><td id="' + newId + '"></td></tr>');
							$('#' + newId).append(aud);

							$("#no-recording-info").hide();
							$("#total-recordings").text($("#record-list audio").length);
							if (isNodeApp) {
								blobToBase64(blob, function (base64) { // encode
									var buf = new Buffer(base64, 'base64'); // decode
									var filename = moment().unix() + '.wav';
									var audiopath = "data/content/resources/records/";
									fs.writeFile(audiopath + filename, buf, function (err) {
										if (err) {
											console.log("err", err);
										} else {
											console.log({ 'status': 'success' });
										}
									});

									saveAudioInStorage(audiopath + filename, filename, $("#record-pages-list option:selected").val());

								})
							}


							/*
							audioDownload.href = recordedAudio.src;
							audioDownload.download = 'mp3';
							audioDownload.innerHTML = 'download';
							*/
						}
					}
				})
				.catch(e => console.log(e));
			eBookConfig.recorder = false;


		}
	},

	'searchContent': function () {
		var searchValue = $("#top-search").val();
		if (searchValue == "") return false;

		$("#search-box iframe").attr('src', 'search/search.html?q=' + searchValue);
		closeAllPannels("#search-box");
		$("#search-box").removeClass('hide').show();
		var ifrHeight = $("#search-box .search-wrapper").height();
		$("#search-box iframe").css('height', ifrHeight + 'px');

		return false;
	},

	'closeSearch': function () {
		$("#search-box").addClass('hide');
		$("#top-search").val('');
	},

	'setBookFrameSize': function () {
		var $container = $("#book-viewport");

		var win = $(window).height();
		var header = $("#topbar-section").height();
		var footer = $("#app-footer").height();
		var padding = 80;

		var frameHeight = win - header - footer - padding;
		var frameWidth = $container.width();

		$container.css({
			width: frameWidth + 'px',
			height: frameHeight + 'px'
		});

	},

	'init': function () {
		this.prepareMenu();
		this.setFancyBoxIframe();
		this.setFancyBoxVideo();
		this.bookmark.initialize();
		//this.zoom.resizeBook();
		this.reloadNotes();
		this.initMusic();

		/*
		$(window).resize(function() {
			readerApp.zoom.resizeBook();
		});
		*/

		eBookConfig["total"] = eBookConfig["total"] - 2;
		$("#totalPages").text(eBookConfig["total"]);

		$("#pageSearch").val(eBookConfig["current"]);
		$("#subject-head").text(appdb.config["subject"]);
		//$("#class-level").text(appdb.config["class"]);

		//add Event Listeners

		$("#form1").on("click", function () {
			window.location = "www.google.com";
		});

		$("#btn-musicmute").on("click", function () {
			readerApp.togglebgMusic();
			// var src = $(this).attr('src');
			// var newsrc = (src=='img/ic-music.png') ? 'img/ic-musicmute.png' : 'img/ic-music.png';
			// $(this).attr('src', newsrc );
		});

		$("#takeBookmark").on("click", function () {
			readerApp.bookmark.action();
		});

		$("#ebook-next").on("click", function () {
			readerApp.flipNext();
		});

		$("#ebook-prev").on("click", function () {
			readerApp.flipPrev();
		});

		this.getHighlights();

		$("#notes-addition").on('shown.bs.modal', function () {
			readerApp.prepareNoteAdd(this);
		});

		$("#textarea-note").on('keypress', function (e) {
			$("#notes-validation").addClass('hide');
		});

		this.setBookFrameSize();

	},

	activatePaint: function () {
		if (eBookConfig.paintApp == false) {
			this.deactivatePaint();
		} else {

			$('.iframe-blocker').hide();
			$('body').addClass('action-highlight');
			var eles = document.querySelectorAll('#book iframe');
			for (var i = 0; i < eles.length; i++) {
				document.querySelectorAll('#book iframe')[i].contentWindow.postMessage("show-tools", "*");
			}
		}
		eBookConfig.paintApp = false;
	},

	deactivatePaint: function () {
		$('.iframe-blocker').show();
		$('body').removeClass('action-highlight');
		var eles = document.querySelectorAll('#book iframe');
		for (var i = 0; i < eles.length; i++) {
			document.querySelectorAll('#book iframe')[i].contentWindow.postMessage("hide-tools", "*");
		}
		eBookConfig.paintApp = true;
	},

	draw: {
		showTools: function () {
			closeAllPannels("#drawing-tools");
			$("#drawing-tools").show();
			$("#color-selection").trigger('change');
			$("#color-selection")[0].options.selectedIndex = 0;
			var $pages = $("#pageSearch").val().split("-");

			if ($pages[0] == 1) { $pages = ['0', '1']; }

			var toolPageHTML = "";
			for (var i = 0; i < $pages.length; i++) {
				toolPageHTML += '<option value="' + $pages[i] + '">Page ' + $pages[i] + '</option>'
			}
			$("#tools-pageselection").html(toolPageHTML);
			$('.pnt-tool.active').removeClass('active');
			clearStorage(LAST_CANVAS);

		},
		hideTools: function () {
			$("#drawing-tools").fadeOut();

			$('.iframe-blocker').show();
			$('body').removeClass('action-highlight');
			var eles = document.querySelectorAll('#book iframe');
			for (var i = 0; i < eles.length; i++) {
				document.querySelectorAll('#book iframe')[i].contentWindow.postMessage('show-tools-0', "*");
			}
			$('.pnt-tool.active').removeClass('active');
		},
		toggleTools: function () {
			if (!$("#drawing-tools").is(":visible")) {
				this.showTools();
			} else {
				this.hideTools();
			}
		},

		selectTool: function (msg, ele) {
			$('.pnt-tool.active').removeClass('active');
			$(ele).addClass('active');
			$('body').addClass('action-highlight');
			$('.iframe-blocker').hide();
			var eles = document.querySelectorAll('#book iframe');
			for (var i = 0; i < eles.length; i++) {
				document.querySelectorAll('#book iframe')[i].contentWindow.postMessage(msg, "*");
			}

		},

		undo: function () {
			var currentPageId = $("#tools-pageselection").val();

			currentPageId = parseFloat(currentPageId) + 2;
			//console.log(' currentPageId : '+currentPageId);

			var frameObj = document.querySelector('#canvas-' + currentPageId);
			frameObj.contentWindow.postMessage("action-undo", "*");
		},

		clear: function () {
			var currentPageId = $("#tools-pageselection").val();

			currentPageId = parseFloat(currentPageId) + 2;

			var frameObj = document.querySelector('#canvas-' + currentPageId);
			frameObj.contentWindow.postMessage("action-clear", "*");
		}
	}
}

$(document).ready(function (e) {
	scrollBody()
	readerApp.init();
	preventRightClick();
	loadAudioFromStorage();


	/* start audio recorder */
	var startRecord = document.getElementById('startRecord');
	startRecord.onclick = e => {

		if (typeof rec != 'undefined') {
			startRecord.disabled = true;
			stopRecord.disabled = false;
			audioChunks = [];
			rec.start();
		} else {
			alert("Please click on allow to use your microphone.");
		}
	}

	var stopRecord = document.getElementById('stopRecord');
	stopRecord.onclick = e => {
		if (typeof rec != 'undefined') {
			startRecord.disabled = false;
			stopRecord.disabled = true;
			rec.stop();
		} else {
			alert("Please click on allow to use your microphone.");
		}
	}
	/* start audio recorder */



	$("#btn-skip").on("click", function () {

		$('#btn-skip').hide();
		$("#app-preloader").hide();
		$("#app-preloader video")[0].pause();
		$('#wrapper').show();
	});

	$("#btn-play_video").on("click", function () {
		$("#app-preloader video")[0].play();

		setTimeout(function () {
			$("#app-preloader").addClass('animated bounceOutLeft');
			$("#app-preloader video")[0].pause();

		}, videoTimeout);

	});

	$("#color-selection").on('change', function (e) {
		var bgcolor = $(this).val();
		$(this).css('background', bgcolor);
		var message = "select-color-" + bgcolor;

		var eles = document.querySelectorAll('#book iframe');
		for (var i = 0; i < eles.length; i++) {
			eles[i].contentWindow.postMessage(message, "*");
		}
	}).change();
	
	$('#searchForm').submit(function() {
	  
	  readerApp.searchContent();
	  return false;
	});

	$('.searchIcon').click(function(){
		readerApp.searchContent();
	  return false;
	});
});



$(window).on("message", function (e) {
	var data = e.originalEvent.data;  // Should work.

	var splitData = data.split("-");

	if (data == 'refresh-highlights') {
		readerApp.getHighlights();
	} else if (splitData[0] == 'turnpage') {
		readerApp.turnPage(splitData[1]);
	} else if(splitData[0] == 'turnpageS') {
		searchClick = 1;
		readerApp.turnPage(splitData[1]);
	} else if (splitData[0] == 'canvas') {

		var newval = splitData[1] - 2;
		//console.log(splitData[1]);

		if (newval < 0) {
			newval = 0;
		}

		//$("#tools-pageselection").val(splitData[1]);
		$("#tools-pageselection").val(newval);

		setStorage(LAST_CANVAS, splitData[1]);
		//setStorage(LAST_CANVAS, newval);
	}
});


function scrollBody() {
	var curYPos, curXPos, curDown;
	var ele = document.getElementById('book-viewport');

	ele.addEventListener('mousemove', function (e) {
		if (curDown) {
			//ele.scrollTo(document.body.scrollLeft + (curXPos - e.pageX), document.body.scrollTop + (curYPos - e.pageY));
			var topPos = ele.scrollTop;
			var leftPos = ele.scrollLeft;
			ele.scrollTop = topPos + (curYPos - e.pageY);
			ele.scrollLeft = leftPos + (curXPos - e.pageX);
		}
	});

	ele.addEventListener('mousedown', function (e) {
		curYPos = e.pageY;
		curXPos = e.pageX;
		curDown = true;
	});

	ele.addEventListener('mouseup', function (e) {
		curDown = false;
	});
}

function openFancyModal(url, dimension) {
	$("#fancy-iframe")
		.attr('data-src', url)
		.attr('data-size', dimension);
	window.fancyboxSize = dimension;
	window.fancyboxURL = url;
	$("#fancy-iframe").trigger('click');
}

function openFancyModalVideo(url, dimension) {
	$("#fancy-video")
		.attr('data-video-mp4', url)
		.attr('data-size', dimension);
	window.fancyboxURL = url;
	window.fancyboxSize = dimension;
	$("#fancy-video").trigger('click');

}

function openVideo(url) {
	console.log(url);
}

var soundHolder;
var soundFlag = false;
function playAudio(url) {
	//readerApp.bgMusicOff();

	if (soundFlag == true) {
		soundHolder.stop();
		soundFlag = false;
		return;
	}
	soundHolder = soundManager.createSound({
		onfinish: function () {
			this.destruct();
			soundFlag = false;
			console.log('completd');
		},
		multiShot: false,
		url: url,
		autoLoad: true,
		autoPlay: true
	});
	soundFlag = true;
}

function stopAudio() {
	if (soundFlag == true) {
		soundHolder.stop();
		soundFlag = false;
		return;
	}
}

function saveAudioInStorage(path, filename, pageId) {
	var data = window.localStorage.getItem(AUDIO_KEYWORD + pageId);
	var audioData = [];
	if (data == null || data == undefined || data == "") {
		audioData = [];
	} else {
		audioData = JSON.parse(data);
	}
	audioData.push({ 'path': path, 'pageId': pageId, 'filename': filename });
	setStorage(AUDIO_KEYWORD + pageId, JSON.stringify(audioData));
}

function loadAudioFromStorage() {
	var audioData = []
	for (var i = 1; i <= eBookConfig.total; i++) {

		var data = window.localStorage.getItem(AUDIO_KEYWORD + i);
		if (data != null && data != undefined && data != "") {
			audioData.push.apply(audioData, JSON.parse(data));
		}

	}
	console.log(audioData);
	for (var i = 0; i < audioData.length; i++) {
		var aud = document.createElement('audio');
		aud.src = 'resources/records/' + audioData[i].filename;
		aud.controls = true;
		console.log(aud);
		//$("#record-list").append(aud);

		var currentPage = audioData[i].pageId;
		var newId = 'recorditem-' + $("#record-list tr").length;
		$("#record-list").append('<tr><td>Page ' + currentPage + '</td></tr><tr><td id="' + newId + '"></td></tr>');
		$('#' + newId).append(aud);
	}

	$("#total-recordings").text($("#record-list audio").length);
}

function closeAllPannels(ele) {
	$("#drawing-tools, #search-box, #record-audio").not(ele).fadeOut();
	if (ele != '#drawing-tools') {
		readerApp.deactivatePaint();
	}
}

function closePannel(ele) {
	$(ele).fadeOut();
	if (ele != '#drawing-tools') {
		readerApp.deactivatePaint();
	}
}

function setStorage(key, value) {
	window.localStorage.setItem(key, value);
}

function getStorage(key) {
	return window.localStorage.getItem(key);
}

function clearStorage(key) {
	window.localStorage.removeItem(key);
}

function preventRightClick() {
	document.addEventListener('contextmenu', function (event) {
		event.preventDefault()
	});
}

/*--------------- Clear Data JS	--------------*/



function clearData(_type) {
	if (_type == 'all') {
		deleteBookmarks();
		deleteHighlights();
		deleteNotes();
		//deleteAudio();
	}
	else if (_type == 'bookmarks') {
		deleteBookmarks();
	}
	else if (_type == 'highlights') {
		deleteHighlights();
	}
	else if (_type == 'notes') {
		deleteNotes();
	}
	else if (_type == 'audio') {
		deleteAudio();
	}
}

function deleteBookmarks() {
	var bookmarksList = readerApp.bookmark.get();
	//console.log(':' + appdb.config.id + ' : ' + bookmarksList);
	readerApp.storage.del(appdb.config.id + '_bookmark');
	//$('#bookmark-container').children().empty();
	//$("#total-bookmarks").text(0);
	readerApp.bookmark.initialize();
	$('.linking-container .pageBookm').remove();
}

function deleteHighlights() {
	var container_h = $('#highlights-containers').html();
	var arr = container_h.split('onclick="');
	window.localStorage.removeItem(HIGLIGHT_LIST);

	for (i = 1; i < arr.length; i++) {
		var arr1 = arr[i].split('"');
		if (arr1[0].indexOf("readerApp.turnPage") >= 0) {
			var pageId = arr1[0].replace('readerApp.turnPage(', '');
			pageId = pageId.replace(')', '');
			var item = window.localStorage.removeItem(HIGLIGHT_LIST);
			window.localStorage.removeItem(HIGLIGHT_KEYWORD + pageId);
			//console.log('len:'+$('#canvas-'+ pageId).length);
			$('#canvas-' + pageId).attr('src', function (i, val) { return val; });
		}
	}
	//$('#highlights-containers').children().empty();
	$("#total-highlights").text(0);
}

function deleteNotes() {
	var container_h = $('#notes-containers').html();
	var arr = container_h.split('onclick="');
	for (i = 1; i < arr.length; i++) {
		var arr1 = arr[i].split('"');
		if (arr1[0].indexOf("readerApp.turnPage") >= 0) {
			var pageId = arr1[0].replace('readerApp.turnPage(', '');
			pageId = pageId.replace(')', '');
			window.localStorage.removeItem(NOTE_KEYWORD + pageId);
		}
	}
	readerApp.reloadNotes();
	$('.notes-fixicon').remove();
}

function deleteAudio() {
	var key = '';
	for (var i = 1; i <= eBookConfig.total; i++) {

		var data = window.localStorage.getItem(AUDIO_KEYWORD + i);
		if (data != null && data != undefined && data != "") {
			key = AUDIO_KEYWORD + i;
			clearStorage(key);
		}

	}

	$(".recording_info").html('No Recordings Yet.');
	$("#total-recordings").text(0);
}


