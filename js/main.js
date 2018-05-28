/** 数据初始化 **/
//用户

var myScore = 2;
var videoPager = {};
var downloadPager = {};
var server = "http://192.168.1.7:8080/videoconsole";

//图库
var imgMainArr = [];
doAjax("picture/list/"+pageNo, {sort:'id'}, function(data){
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
goPage(1, 1);
goPage(1, 2);
function goPage(pageNo, type) {
	if(type == 1) {
		if(pageNo < 1) pageNo =  videoPager.pageSum;
		else if(pageNo > videoPager.pageSum) pageNo = 1;
		doAjax("video/list/"+pageNo, {sort:'id'}, function(data){
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
				 '<h5 class="font-size-big"> ID:' + video.id + ' <span class="videoTime">' + video.videoTime + '</span> </h5>' +
				 '<a href="#panelVideo" class="button expanded" onclick="play(\'' + video.id + '\')">播放<span class="videoScore">（<font>' + video.score + '</font>积分）</span></a>' +
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
		doAjax("download/list"+pageNo, {sort:'id'}, function(data){
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
				downloadHtml += 
				'<div class="cell gallery">' +
				 imgHtml +
				 '<h5 class="font-size-small"> ID:' + download.id + ' <span class="videoTime">' + download.videoTime + '</span> </h5>' +
				 '<p class="font-size-small"> <a href="' + download.downloadUrl+ '" target="_blank">百度网盘</a> <span class="size">大小：' + download.fileSize + '</span> </p> ' +
				 '<a href="javascript:void(0)" class="button small expanded hollow">提取码<span class="downloadScore">（<font>' + download.score + '</font>积分）</span></a> ' +
				'</div>';
			});
			downloadPager.pageNo = data.pageNo;
			downloadPager.pageSum = data.pageSum;
			$("#downloadList").html(downloadHtml);
			$("#downloadPager").html(getPagerHtml(downloadPager, type));
		});
	}
}
/** 数据初始化 end **/	

/** 图片操作 **/
var imgIndex = 0;
$(".prevImg").click(function(){
	var imgLen = imgMainArr.length;
	if(imgLen >0) {
		if(imgIndex == 0) return;
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
		if(imgIndex == imgLen - 1) return;
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
	$("#videocenter-text").html(randomView);
	$("#videocenter").show(); 
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
	$("#video").attr("src", videoPlaying.playUrl);
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
		video.src = "#";
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
		url:server+"/"+url;
		type:"POST",
		async:true,
		data: data,
		dataType:'json',
		success:function(data) {
			callback(data);
			$.getScript('js/zoom.min.js');
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
	var username = $("#username").value();
	var password = $("#password").value();
	var email = $("#email").value();
	if($("#loginCheckbox")[0].checked) {
		doAjax("login", {username:username, password:password}, function(data) {
			
		});
	}
	else {
		doAjax("register", {username:username, password:password, email:email}, function(data) {
			
		});
	}
});
