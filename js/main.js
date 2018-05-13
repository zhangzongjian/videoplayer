/** 数据初始化 **/
//用户

$.ajax(
  {
	url:"http://localhost:8080/videoconsole/tests",
	type:"POST",
	dataType:'json',
	success:function(data) {
		alert(data.test);
	},
	error:function(data) {
		alert(data);
	}
  }
);	

var myScore = 2;
var server = "localhost/videoplay/";
//图库
var imgMainArr = [];
//$("#img-main").attr("src", imgMainArr[0]);
//播放器
var videoPlaying = {id:"1000002", src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"};
//$("#video").attr("src", videoPlaying.src);
//$("#videoPlayingId").html(videoPlaying.id);
//播放区 每页8个
var pager = {pageNo:2, pageSum:10, pageEach:8};
var videoArr = [
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:0, src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:1, src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:0, src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:1, src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:0, src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:1, src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"},
];
var imgHtml;
var videoHtml = "";
videoArr.forEach(function(video){
	imgHtml = "";
	video.imgs.forEach(function(imgSrc, index){
		imgHtml += '<li ' + (index==0?'':'style="display:none"') + '><a href="' + imgSrc + '"><img src="' + imgSrc + '" /></a></li>';
	});
	videoHtml += 
	'<div class="cell gallery">' +
	 imgHtml +
     '<h5 class="font-size-big"> ID:' + video.id + ' <span class="videoScore"><font>' + video.score + '</font>积分</span> </h5>' +
     '<a href="javascript:void(0)" class="button expanded">播放</a>' +
    '</div>';
});
$("#videoList").html(videoHtml);
$("#videoPager").html(getPagerHtml(pager));


//下载区 每页8个
var pager = {pageNo:1, pageSum:11, pageEach:8};
var downloadArr = [
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/s/1F4haUzfN8lv30hS4AGZE_g", size:"335M"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/s/1F4haUzfN8lv30hS4AGZE_g", size:"335M"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/s/1F4haUzfN8lv30hS4AGZE_g", size:"335M"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/s/1F4haUzfN8lv30hS4AGZE_g", size:"335M"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/s/1F4haUzfN8lv30hS4AGZE_g", size:"335M"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/s/1F4haUzfN8lv30hS4AGZE_g", size:"335M"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/s/1F4haUzfN8lv30hS4AGZE_g", size:"335M"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/s/1F4haUzfN8lv30hS4AGZE_g", size:"335M"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/s/1F4haUzfN8lv30hS4AGZE_g", size:"335M"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/s/1F4haUzfN8lv30hS4AGZE_g", size:"335M"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/s/1F4haUzfN8lv30hS4AGZE_g", size:"335M"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/s/1F4haUzfN8lv30hS4AGZE_g", size:"335M"},
]
var downloadHtml = "";
var imgHtml;
downloadArr.forEach(function(download){
	imgHtml = "";
	download.imgs.forEach(function(imgSrc, index){
		imgHtml += '<li ' + (index==0?'':'style="display:none"') + '><a href="' + imgSrc + '"><img src="' + imgSrc + '" /></a></li>';
	});
	downloadHtml += 
	'<div class="cell gallery">' +
	 imgHtml +
     '<h5 class="font-size-small"> ID:' + download.id + ' <span class="size">大小：' + download.size + '</span> </h5>' +
     '<p class="font-size-small"> <a href="' + download.downloadUrl+ '" target="_blank">百度网盘</a> <span class="downloadCode">提取码：????</span> </p> ' +
     '<a href="javascript:void(0)" class="button small expanded hollow">提取码<span class="downloadScore">（<font>' + download.score + '</font>积分）</span></a> ' +
    '</div>';
});
$("#downloadList").html(downloadHtml);
$("#downloadPager").html(getPagerHtml(pager));
/** 数据初始化 end **/	

/** 图片操作 **/
var imgIndex = 0;
var imgLen = imgMainArr.length;
$(".prevImg").click(function(){
	if(imgLen >0) {
		imgIndex--;
		if(imgIndex < 0) imgIndex = imgLen - 1;
		$("#img-main").attr("src", imgMainArr[imgIndex]);
	}
	else noData();
});
$(".nextImg").click(function(){
	if(imgLen >0) {
		imgIndex++;
		if(imgIndex > imgLen - 1) imgIndex = 0;
		$("#img-main").attr("src", imgMainArr[imgIndex]);
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
function getPagerHtml(pager) {
	var optionHtml;
	var pagerHtml =
		(pager.pageNo!=1?'<li> <a href="javascript:goPage(1)">首页</a> </li> ':'') +
		(pager.pageNo!=1?'<li> <a href="javascript:goPage(' + (pager.pageNo-1) + ')">上一页</a> </li> ':'') +
			'<select class="form-control" onchange="goPage(this.value)">' +
				function(){
					optionHtml = "";
					for(var i = 1; i<=pager.pageSum; i++) {
						optionHtml += '<option value="' + i + '" ' + (i==pager.pageNo?'selected':'') + '>' + i + '</option>';
					}
					return optionHtml;
				}() +
			'</select> ' +
		(pager.pageNo!=pager.pageSum?'<li> <a href="javascript:goPage(' + (pager.pageNo+1) + ')">下一页</a> </li> ':'') +
		(pager.pageNo!=pager.pageSum?'<li> <a href="javascript:goPage(' + pager.pageSum + ')">末页</a> </li> ':'');
	return pagerHtml;
}
function goPage(pageNo) {
	alert(pageNo);
}
/** 翻页操作 end **/

function noData() {
	alert("数据不存在");
}