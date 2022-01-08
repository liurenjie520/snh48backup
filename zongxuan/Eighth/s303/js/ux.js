// JavaScript Document

/***************************************************
			state
***************************************************/






/***************************************************
			event
***************************************************/

//tips
$('.tips>p').on('mouseenter', function(){
	var html = $(this).siblings('.tips-detail').html(),
		_tips;
	
	//弹出定位
	if($(window).width() > 768){
		_tips = '2';
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
		shade: [0.16, '#fff'],
		shadeClose: true,
		scrollbar: false,
	});
}




/***************************************************
			onload
***************************************************/













