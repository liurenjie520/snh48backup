// JavaScript Document

/***************************************************
			state
***************************************************/






/***************************************************
			event
***************************************************/

//tips
$('.tips').on('mouseover', function(){
	var html = $(this).find('.tips-detail').html(),
		_tips;
	
	//弹出定位
	if($(window).width() > 768){
		_tips = '4';
	}else{
		_tips = '1';
	}
	
	layer.tips(html, this, {
		tips: _tips,
		skin: 'tips-style',
	});
});



/***************************************************
			function
***************************************************/

//layer
function layerOpen(className){
	var html = $('.' + className).prop('outerHTML');
	layer.open({
		type: 1,
		title: false,
		content: html,
		skin: 'layer-style',
		shadeClose: true,
	});
}




/***************************************************
			onload
***************************************************/













