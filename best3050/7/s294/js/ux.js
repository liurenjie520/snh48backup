// JavaScript Document




/***************************************************
			申明
***************************************************/

//js




/***************************************************
			事件
***************************************************/

//js




/***************************************************
			方法
***************************************************/

//js
function openPic(name){
	layer.open({
		type: 1,
		content: '<img src="pic/' + name + '" alt="图片">' +
				 '<a href="javascript:;" class="layer-close" onClick="layer.closeAll();">✖</a>',
	});
}




/***************************************************
			页面加载
***************************************************/

//js
$(document).ready(function(){
	var gallerSwiper = new Swiper('.gallery', {
		slidesPerView: 4,
		spaceBetween: 20,
		autoplay: true,
		preventClicks: true,
		
		navigation: {
			nextEl: '.gallery .swiper-button-next',
			prevEl: '.gallery .swiper-button-prev',
		},
	});
});























