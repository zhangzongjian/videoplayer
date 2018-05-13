/** 数据初始化 **/
//用户
var myScore = 2;
//图库
var imgMainArr = [
	"http://placehold.it/1920x1080",
	"http://placehold.it/920x880",
	"http://placehold.it/1920x1080",
	"http://placehold.it/786x1080"
];
$("#img-main").attr("src", imgMainArr[0]);
//播放器
var videoPlaying = {id:"1000002", src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"};
$("#video").attr("src", videoPlaying.src);
$("#videoPlayingId").html(videoPlaying.id);
//播放区
var videoArr = [
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:0, src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:1, src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:0, src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:1, src:"http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4"},
];
var videoHtml = "";
var imgHtml;
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
//下载区
var downloadArr = [
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/share/init?surl=F4haUzfN8lv30hS4AGZE_g", size:"335M"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/share/init?surl=F4haUzfN8lv30hS4AGZE_g", size:"335M"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/share/init?surl=F4haUzfN8lv30hS4AGZE_g", size:"335M"},
	{id:"1000002", imgs:["http://placehold.it/250x140", "http://placehold.it/1920x1080", "http://placehold.it/786x1080"], score:5, downloadUrl:"https://pan.baidu.com/share/init?surl=F4haUzfN8lv30hS4AGZE_g", size:"335M"},
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
     '<p class="font-size-small"> <a href="' + download.downloadUrl+ '">百度网盘</a> <span class="downloadCode">提取码：????</span> </p> ' +
     '<a href="javascript:void(0)" class="button small expanded hollow">提取码<span class="downloadScore">（<font>' + download.score + '</font>积分）</span></a> ' +
    '</div>';
});
$("#downloadList").html(downloadHtml);
/** 数据初始化 end **/	

/** 图片操作 **/
var imgIndex = 0;
var imgLen = imgMainArr.length;
$(".prevImg").click(function(){
	imgIndex--;
	if(imgIndex < 0) imgIndex = imgLen - 1;
	$("#img-main").attr("src", imgMainArr[imgIndex]);
});
$(".nextImg").click(function(){
	imgIndex++;
	if(imgIndex > imgLen - 1) imgIndex = 0;
	$("#img-main").attr("src", imgMainArr[imgIndex]);
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
		video.src = "http://vd3.bdstatic.com/mda-iba247rx1ffpppb7/mda-iba247rx1ffpppb7.mp4";
		video.play();
	}
});
//清除
$("#clearVideo").click(function() {
	video.src = "";
	$("#videocenter-text").html(randomView);
	$("#videocenter").show(); 
});
/** 视频操作 end **/
