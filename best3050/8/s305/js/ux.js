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
function openLayer(target, name){
	var html = $('.' + target).prop('outerHTML');
	
	layer.open({
		type: 1,
		title: name,
		content: html,
		area: 'auto',
		maxWidth: '800',
		maxHeight: '600',
		skin: 'layer-skin',
		resize: false,
		move: false,
		scrollbar: false,
		shade: ['0.8'],
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























