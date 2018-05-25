/** 数据初始化 **/
//用户

var myScore = 2;
var videoPager = {};
var downloadPager = {};
var server = "http://192.168.1.7:8080/videoconsole";

//图库
var imgMainArr = [];
doAjax("picture", "list", {pageNo:1}, function(data){
	var pageData = data.pageData;
	for(var i in pageData) {
		imgMainArr.push(pageData[i]);
	}
	$("#img-main").attr("src", imgMainArr[0].url+"-image");
	$("#img-main").parent().attr("href", imgMainArr[0].url+"-image");
	$("#pictureId").html(imgMainArr[0].id);
	$("#pictureGuid").html("1/"+imgMainArr.length);
});

//播放区 每页8个
//下载区 每页12个
var videoArr;
var videoMap;
var downloadArr;
goPage(1, 1);
goPage(1, 2);
function goPage(pageNo, type) {
	if(pageNo < 1) pageNo =  videoPager.pageSum;
	else if(pageNo > videoPager.pageSum) pageNo = 1;
	if(type == 1) {
		doAjax("video", "list", {pageNo:pageNo}, function(data){
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
					screenImgUrl = screenImg.url + '-screen';
					imgHtml += '<li ' + (index==0?'':'style="display:none"') + '><a href="' + screenImgUrl + '"><img src="' + screenImgUrl + '" /></a></li>';
				});
				videoHtml += 
				'<div class="cell gallery">' +
				 imgHtml +
				 '<h5 class="font-size-big"> ID:' + video.id + ' <span class="videoScore" '+((video.score==0)?'style="display:none"':'')+'><font>' + video.score + '</font>积分</span> </h5>' +
				 '<a href="javascript:void(0)" class="button expanded" onclick="play(\'' + video.id + '\')">播放</a>' +
				'</div>';
			});
			videoPager.pageNo = data.pageNo;
			videoPager.pageSum = data.pageSum;
			$("#videoList").html(videoHtml);
			$("#videoPager").html(getPagerHtml(videoPager, type));
		});
	}
	else if(type == 2) {
		doAjax("download", "list", {pageNo:pageNo}, function(data){
			var pageData = data.pageData;
			downloadArr = [];
			for(var i in pageData) {
				downloadArr.push(pageData[i]);
			}
			var downloadHtml = "";
			var imgHtml;
			downloadArr.forEach(function(download, index){
				imgHtml = "";
				var screenImgUrl;
				download.screenImgs.forEach(function(screenImg, index){
					screenImgUrl = screenImg.url + '-screen';
					imgHtml += '<li ' + (index==0?'':'style="display:none"') + '><a href="' + screenImgUrl + '"><img src="' + screenImgUrl + '" /></a></li>';
				});
				downloadHtml += 
				'<div class="cell gallery">' +
				 imgHtml +
				 '<h5 class="font-size-small"> ID:' + download.id + ' <span class="size">大小：' + download.fileSize + '</span> </h5>' +
				 '<p class="font-size-small"> <a href="' + download.downloadUrl+ '" target="_blank">百度网盘</a> <span class="downloadCode">提取码：????</span> </p> ' +
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
		imgIndex--;
		if(imgIndex < 0) imgIndex = imgLen - 1;
		$("#img-main").attr("src", imgMainArr[imgIndex].url+"-image");
		$("#pictureId").html(imgMainArr[imgIndex].id);
		$("#pictureGuid").html((imgIndex+1)+"/"+imgMainArr.length);
	}
	else noData();
});
$(".nextImg").click(function(){
	var imgLen = imgMainArr.length;
	if(imgLen >0) {
		imgIndex++;
		if(imgIndex > imgLen - 1) imgIndex = 0;
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

function doAjax(type, op, pager, callback) {
	$.ajax(
	  {
		url:server+"/"+type+"/"+op+"/"+pager.pageNo,
		type:"POST",
		async:true,
		data:{pageEach:pager.pageEach},
		dataType:'json',
		success:function(data) {
			callback(data);
			$.getScript('js/zoom.min.js');
		}
	  }
	);
}
