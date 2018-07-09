/** 数据初始化 **/
//用户

var myScore;
var username;
var unlocks = {};
var videoPager = {};
var downloadPager = {};
var clipboardMap = {};
var server = "http://jianplayer.tunnel.qydev.com/videoconsole";

doAjax("checkLogin", {}, function(data){
	onLogin(data);
});

//图库
var imgMainArr = [];
doAjax("picture/list/1", {sort:'id'}, function(data){
	var pageData = data.pageData;
	imgMainArr = [];
	for(var i in pageData) {
		imgMainArr.push(pageData[i]);
	}
	var imgHtml = '';
	imgMainArr.forEach(function(img, index) {
		if(index == 0) imgHtml += 
			'<li class="orbit-slide is-active" style="text-align:center">' +
				'<a href="' + img.url + '"><img id="img-main" src="' + img.url + '-image" /></a>' +
			'</li>';
		else imgHtml += 
			'<li style="display:none">' +
				'<a href="' + img.url + '"></a>' +
			'</li>';
	});
	$("#pictureList").html(imgHtml);
	$("#pictureId").html(imgMainArr[0].id);
	$("#pictureGuid").html("1/"+imgMainArr.length);
});

//播放区 每页8个
//下载区 每页12个
var videoArr;
var videoMap;
var downloadArr;
var downloadMap;
var searchID;
goPage(1, 1);
goPage(1, 2);
function goPage(pageNo, type) {
	if(type == 1) {
		if(pageNo < 1) pageNo =  videoPager.pageSum;
		else if(pageNo > videoPager.pageSum) pageNo = 1;
		searchID = $("#searchID1").val();
		doAjax("video/list/"+pageNo, {sort:'id', searchID:searchID}, function(data){
			var pageData = data.pageData;
			var id;
			videoArr = [];
			videoMap = {};
			for(var i in pageData) {
				videoArr.push(pageData[i]);
				id = pageData[i].id;
				videoMap[id] = pageData[i];
			}
			var imgHtml;
			var videoHtml = "";
			var screenImgUrl;
			videoArr.forEach(function(video){
				imgHtml = "";
				video.screenImgs.forEach(function(screenImg, index){
					screenImgUrl = screenImg.url;
					if(index==0)
						imgHtml += '<li><a href="' + screenImgUrl + '"><img src="' + screenImgUrl.replace('?', '-screen?') + '" /></a></li>';
					else
						imgHtml += '<li style="display:none"><a href="' + screenImgUrl + '"></a></li>';
				});
				videoHtml += 
				'<div class="cell gallery">' +
				 imgHtml +
				 '<h5 class="font-size-big"> ID:' + video.id + ' <span class="videoTime">' + timeToStr(video.videoTime) + '</span> </h5>' +
				 '<a href="#panelVideo" class="button expanded" onclick="play(\'' + video.id + '\')">播放<span '+(video.score==0?'style="display:none"':'')+'>（<font class="score" '+(video.score>myScore?'color="red"':'')+'>' + video.score + '</font>积分）</span></a>' +
				'</div>';
			});
			videoPager.pageNo = data.pageNo;
			videoPager.pageSum = data.pageSum;
			$("#videoList").html(videoHtml);
			$("#videoPager").html(getPagerHtml(videoPager, type));
		});
	}
	else if(type == 2) {
		if(pageNo < 1) pageNo =  downloadPager.pageSum;
		else if(pageNo > downloadPager.pageSum) pageNo = 1;
		searchID = $("#searchID2").val();
		doAjax("download/list/"+pageNo, {sort:'id', searchID:searchID}, function(data){
			var pageData = data.pageData;
			downloadArr = [];
			downloadMap = {};
			for(var i in pageData) {
				downloadArr.push(pageData[i]);
				id = pageData[i].id;
				downloadMap[id] = pageData[i];
			}
			var downloadHtml = "";
			var imgHtml;
			downloadArr.forEach(function(download, index){
				imgHtml = "";
				var screenImgUrl;
				download.screenImgs.forEach(function(screenImg, index){
					screenImgUrl = screenImg.url;
					if(index==0)
						imgHtml += '<li><a href="' + screenImgUrl + '"><img src="' + screenImgUrl.replace('?', '-screen?') + '" /></a></li>';
					else
						imgHtml += '<li style="display:none"><a href="' + screenImgUrl + '"></a></li>';
				});
				var fileSize = download.fileSize;
				if(fileSize/1024 < 1024) fileSize = Math.floor(fileSize/1024)+"KB";
				else if(fileSize/1024/1024 < 1024) fileSize = Math.floor(fileSize/1024/1024)+"MB";
				else fileSize = Math.floor(fileSize/1024/1024/1024)+"GB";
				downloadHtml += 
				'<div class="cell gallery">' +
				 imgHtml +
				 '<h5 class="font-size-small"> ID:' + download.id + ' <span class="videoTime">' + timeToStr(download.videoTime) + '</span> </h5>' +
				 '<p class="font-size-small"> <a href="' + download.downloadUrl+ '" target="_blank">百度网盘</a> <span class="size">大小：' + fileSize + '</span> </p> ' +
				 '<a id="d' + download.id + '" href="javascript:getCode(\'' + download.id + '\', \'' + download.score + '\')" class="button small expanded hollow">提取码<span '+(download.score==0?'style="display:none"':'')+'>（<font class="score" '+(download.score>myScore?'color="red"':'')+'>' + download.score + '</font>积分）</span></a> ' +
				'</div>';
			});
			downloadPager.pageNo = data.pageNo;
			downloadPager.pageSum = data.pageSum;
			$("#downloadList").html(downloadHtml);
			$("#downloadPager").html(getPagerHtml(downloadPager, type));
			showCode();
		});
	}
}
/** 数据初始化 end **/	

/** 图片操作 **/
var imgIndex = 0;
$(".prevImg").click(function(){
	var imgLen = imgMainArr.length;
	if(imgLen >0) {
		if(imgIndex == 0) {
			alert("没有了！");
			return;
		}
		imgIndex--;
		$("#img-main").attr("src", imgMainArr[imgIndex].url+"-image");
		$("#pictureId").html(imgMainArr[imgIndex].id);
		$("#pictureGuid").html((imgIndex+1)+"/"+imgMainArr.length);
	}
	else noData();
});
$(".nextImg").click(function(){
	var imgLen = imgMainArr.length;
	if(imgLen >0) {
		if(imgIndex == imgLen - 1) {
			alert("没有了！");
			return;
		}
		imgIndex++;
		$("#img-main").attr("src", imgMainArr[imgIndex].url+"-image");
		$("#pictureId").html(imgMainArr[imgIndex].id);
		$("#pictureGuid").html((imgIndex+1)+"/"+imgMainArr.length);
	}
	else noData();
});
/** 图片操作 end **/

/** 视频操作 **/
var pause = "播放";
var waiting = ["缓冲中","缓冲中.","缓冲中..","缓冲中..."];
var randomView = "随便看看";
var timerId = -1;
var i = 0;

$("#videocenter-text").html(randomView);
$("#videocenter").show();

var video=document.getElementById("video");
video.onended = function() {
	$("#clearVideo").click();
}
video.onpause = function() { 
	$("#videocenter-text").html(pause);
	$("#videocenter").show(); 
};
video.onwaiting = function() {
	if(timerId == -1) {
		timerId = window.setInterval(function(){
			$("#videocenter-text").html(waiting[i++]);
			if(i >= waiting.length) i = 0;
		}, 800);
	}
	$("#videocenter").show();
};
video.onplaying = function() {
	if(timerId != -1) {
		window.clearInterval(timerId);
		timerId = -1;
		i = 0;
	}
	$("#videocenter").slideUp("slow"); 
}
//播放
function play(videoId) {
	videoPlaying = videoMap[videoId];
	if(!videoPlaying) {
		noData();
		return;
	}
	video.src = videoPlaying.playUrl;
	$("#videoPlayingId").html(videoPlaying.id);
	$($(".tabs-title")[1]).click();
	video.play();
}
//视频中间按键
$("#videocenter").click(function(){
	if("播放" == $("#videocenter-text").html())
	{
		video.play();
	}
	else if("随便看看" == $("#videocenter-text").html())
	{
		videoPlaying = videoArr[Math.floor(Math.random()*videoArr.length)];
		video.src = videoPlaying.playUrl;
		$("#videoPlayingId").html(videoPlaying.id);
		video.play();
	}
});
//清除
$("#clearVideo").click(function() {
	if(timerId != -1) {
		window.clearInterval(timerId);
		timerId = -1;
		i = 0;
	}
	video.src = "";
	$("#videocenter-text").html(randomView);
	$("#videoPlayingId").html("000000");
	$("#videocenter").show(); 
});
/** 视频操作 end **/

/** 翻页操作 **/
function getPagerHtml(pager, type) {
	var optionHtml;
	var pagerHtml =
		'<li> <a href="javascript:goPage(1, '+type+')">首页</a> </li> ' +
		'<li> <a href="javascript:goPage(' + (pager.pageNo-1) + ', '+type+')">上一页</a> </li> ' +
			'<select class="form-control" onchange="goPage(this.value, '+type+')">' +
				function(){
					optionHtml = "";
					for(var i = 1; i<=pager.pageSum; i++) {
						optionHtml += '<option value="' + i + '" ' + (i==pager.pageNo?'selected':'') + '>' + i + '</option>';
					}
					return optionHtml;
				}() +
			'</select> ' +
		'<li> <a href="javascript:goPage(' + (pager.pageNo+1) + ', '+type+')">下一页</a> </li> ' +
		'<li> <a href="javascript:goPage(' + pager.pageSum + ', '+type+')">末页</a> </li> ';
	return pagerHtml;
}
/** 翻页操作 end **/

function noData() {
	alert("数据不存在");
}

function doAjax(url, data, callback) {
	$.ajax(
	  {
		url:server+"/"+url,
		type:"POST",
		async:true,
		xhrFields: {  
          withCredentials: true  
        },  
		data: data,
		dataType:'json',
		success:function(data) {
			callback(data);
			if(data.isOk == 0)
			{
				if(data.msg) alert(data.msg);
			}
			else if(data.returnUrl && data.openType)
			{
				if(data.openType == 1) location.href = data.returnUrl;
				else window.open(data.returnUrl);
			}
			if(data.pageData) {
				$.getScript('js/zoom.min.js');
			}
		}
	  }
	);
}

$("#loginCheckbox").change(function(){
	if(this.checked) {
		$("#loginBtn").html("<b>登录</b>");
		$("#email").hide();
		$("#loginBtn").addClass("btn-success");
		$("#loginBtn").removeClass("btn-primary");
	}
	else {
		$("#loginBtn").html("<b>注册</b>");
		$("#email").show();
		$("#loginBtn").removeClass("btn-success");
		$("#loginBtn").addClass("btn-primary");
	}
});

$("#loginBtn").click(function() {
	var username = $("#username").val();
	var password = $("#password").val();
	var email = $("#email").val();
	if($("#loginCheckbox")[0].checked) {
		doAjax("login", {username:username, password:password}, function(data) {
			onLogin(data);
		});
	}
	else {
		doAjax("register", {username:username, password:password, email:email}, function(data) {
			if(data.isOk) {
				doAjax("login", {username:username, password:password}, function(data) {
					onLogin(data);
				});
			}
		});
	}
});

function onLogin(data) {
	if(data.isOk) {
		unlocks = data.unlocks;
		$("#formLogin").hide();
		$("#formUser").show();
		$("#loginName").html(data.username);
		username = data.username;
		updateMyScore(data.score);
		if(videoPager.pageNo) goPage(videoPager.pageNo, 1);
		if(downloadPager.pageNo) goPage(downloadPager.pageNo, 2);
	}
}

function updateMyScore(score) {
	myScore = score;
	$("#loginScore").html(myScore);
}

$("#logout").click(function() {
	doAjax("logout", {}, function(data) {
		if(data.isOk) {
			updateMyScore(undefined);
			username = undefined;
			unlocks = {};
			$("#formLogin")[0].reset();
			if($("#loginCheckbox")[0].checked)
			{
				$($("#loginCheckbox")[0]).trigger("click");
				$($("#loginCheckbox")[0]).trigger("click");
			}
			$("#formLogin").show();
			$("#formUser").hide();
			if(videoPager.pageNo) goPage(videoPager.pageNo, 1);
			if(downloadPager.pageNo) goPage(downloadPager.pageNo, 2);
		}
	});
});

function getCode(id, score) {
	if(myScore == undefined) {
		alert("请先登录！");
	}
	else if(myScore < score) {
		alert("积分不足！");
	}
	else
	doAjax("getCode", {id:id}, function(data) {
		if(data.isOk) {
			updateMyScore(data.score);
			alert(data.code);
			setCode(id, data.code);
		}
	});
}

function showCode() {
	downloadArr.forEach(function(download, index){
		var id = download.id;
		var code = unlocks[id];
		if(code) {
			setCode(id, code);
		}
	});
}

function setCode(id, code) {
	if(!clipboardMap[id]) {
		var clipboard = new Clipboard("#d"+id ,{ 
		   text: function(trigger) { 
			  alert("提取码已复制");
			  return code; 
		   }
		});
		clipboardMap[id] = clipboard;
	}
	$("#d"+id).attr("href", "javascript:void(0)");
	$("#d"+id).find('span').html("("+code+")");
}

function openPay() {
	if(username == undefined) alert("请先登录！");
	else window.open(server+"/demo?id="+username);
}

function timeToStr(second) {
	var h = Math.floor(second/3600);
	var m = Math.floor(second%3600/60);
	var s = Math.floor(second%3600%60);
	return pad(h, 2)+":"+pad(m, 2)+":"+pad(s, 2);
}


function pad(num, n) {  
	return Array(n>(num.toString()).split('').length?(n-(''+num).length+1):0).join(0)+num;  
}

$("[type=search]").on("keydown", function(e){
	var key = e.which;
    if (key == 13) {
		goPage(1, String(this.id).replace("searchID", ""));
	}
});
