// JavaScript Document



/***************************************************

			申明

***************************************************/

var tabSwiper = "";

/***************************************************

			事件

***************************************************/

//移动端菜单

$('.menu').on('click', function(){

	if($(this).hasClass('open')){

		$(this).removeClass('open');

		$('.menu-nav').removeClass('open');

		$('body').css('overflow', 'auto');

	}else{

		$(this).addClass('open');

		$('.menu-nav').addClass('open');

		$('body').css('overflow', 'hidden');

	}

});



//导航hover

$('nav li').hover(function(){

	$(this).addClass('hover');

}, function(){

	$(this).removeClass('hover');

});



//按钮

$('.btn').on('click', function(){

	var _this = this;

	$(this).addClass('btn-ani');

	setTimeout(function(){

		$(_this).removeClass('btn-ani');

	}, 250);

});



//tab选项卡

$('.tab a').on('click', function(){

	$(this).addClass('seled').siblings().removeClass();

	tabSwiper.slideTo($(this).index());

});



//侧边漂浮关闭

$('.layer-activate-box').on('click', '.btn-close', function(){

	$(this).closest('.layer-activate').removeClass('open');

	$('.layer-activate-open').removeClass('close');

});



//打开直笔宣言
$('#member-detail .tab-content .zoom-img').on('click', function(){
	var _src = $(this).find('img').attr('src'),
		_html = '<div class="layer layer-login"><a href="javascript:;" class="btn btn-close" onclick="layer.closeAll();"><span>关闭层</span></a>' +
					'<img src="' + _src + '" width="100%">'
				'</div>';
	
	layer.open({
		type: 1,
		content: _html,
		className: 'layer-open',
		style: 'background: transparent;',
		shade: 'background: rgba(0, 0, 0, .5)',
		success: function(){
			$('body').css('overflow', 'hidden');
		},
		end: function(){
			$('body').css('overflow', 'auto');
		},
	});
});









/***************************************************

			方法

***************************************************/

//获取页面名称

function pageName(){

    var strUrl = location.pathname;

    var arrUrl = strUrl.split('/');

    var name = arrUrl[arrUrl.length - 1];

    return name;

}



//复制nav拷贝

function navCopy(){

	if($(window).width() <= 640){

		if(!$('.menu-nav-copy').html()){

			$('.menu-nav').clone().addClass('menu-nav-copy').removeClass('menu-nav').appendTo('nav');

		}

	}else{

		$('.menu-nav-copy').remove();

	}

}



//选项卡

function tabInit(){

	tabSwiper = new Swiper('.tab-content', {

		allowTouchMove: false,

		autoHeight: true,

		observer: true,

	});

}

//弹窗

function layerOpen(value){

	var html = $('.' + value).prop('outerHTML');

	layer.open({

		type: 1,

		content: html,

		className: 'layer-open',

		style: 'background: transparent; border-radius: 0 60px;',

		shade: 'background: rgba(0, 0, 0, .5)',

		shadeClose: false,

		success: function(){

			$('body').css('overflow', 'hidden');

		},

		end: function(){

			$('body').css('overflow', 'auto');

		},

	});

}

function closeAll(){

	layer.closeAll();

}

//侧边漂浮

// function layerActivate(value){

// 	switch(true){

// 		case value == 'login':

// 			$('.layer-activate-open').addClass('close');

// 			$('.layer-activate-login').addClass('open');

// 			break;

// 		case value == 'vote':

// 			$('.layer-activate-open').addClass('close');

// 			$('.layer-activate-vote').addClass('open');

// 			break;

// 		default:

// 			break;

// 	}

// }



//切换成员列表队伍显示

function teamSelect(value){

	var pname = pageName(),

		wfb = '';

	

	switch(true){

		case value == 's2' || value == 'n2' || value == 'h2' || value == 'x':

			wfb = 'snh-wfb';

			break;

		case value == 'b' || value == 'e' || value == 'j':

			wfb = 'bej-wfb';

			break;

		case value == 'g' || value == 'n3' || value == 'z':

			wfb = 'gnz-wfb';

			break;

	}

	

	//if(pname.search('vote.html') != -1){
	if(pname.search('vote.html') != -1){

		if(value != 'group'){

			$('#all_member').children().hide();

			$('.content .' + value).show();

			if(wfb != ''){

				$('.content .' + wfb).show();

			}

		}else{

			$('.content').children().show();

		}

	}else{

		location.href = 'vote.html#' + value;

	}

}



//toolsbar定位

function toolsbarFixed(){

	var tbTop = $('.toolsbar').offset().top;

	

	$(window).scroll(function(){

		var wt = $(window).scrollTop();

		if(wt >= tbTop){

			$('.toolsbar').addClass('fixed');

		}else{

			$('.toolsbar').removeClass('fixed');

		}

	});

}

/***************************************************

			页面加载

***************************************************/

//members.html

function members(){

	toolsbarFixed();

	var teamSeled = location.hash.replace(/#/gi, ''),

		wfb = '';

	

	switch(true){

		case teamSeled == 's2' || teamSeled == 'n2' || teamSeled == 'h2' || teamSeled == 'x':

			wfb = 'snh-wfb';

			break;

		case teamSeled == 'b' || teamSeled == 'e' || teamSeled == 'j':

			wfb = 'bej-wfb';

			break;

		case teamSeled == 'g' || teamSeled == 'n3' || teamSeled == 'z':

			wfb = 'gnz-wfb';

			break;

	}

	

	if(teamSeled != 'group' && teamSeled != ''){

		$('#all_member').children().hide();

		$('#all_member .' + teamSeled).show();

		if(wfb != ''){

			$('#all_member .' + wfb).show();

		}

	}else{

		$('.content').children().show();

	}

}

//member-detail.html

function memberDetail(){

	toolsbarFixed();

	var picSwiper = new Swiper('.pic .swiper-container', {

		autoplay: true,

		pagination: {

			el: '.pic .swiper-pagination',

			clickable: true,

		},

	});

}

//activate.html

// function activate(){

	

// 	//激活记录分页

// 	var pageRecord = pageInit({

// 		pages: 10,

// 		currentPage: 1,

// 		element: '.page-record',

// 		callback: function(page) {

// 			console.log("当前页:", page);

// 		}

// 	});

	

// 	//购买电子票分页

// 	var pagePurchase = pageInit({

// 		pages: 10,

// 		currentPage: 1,

// 		element: '.page-purchase',

// 		callback: function(page) {

// 			console.log("当前页:", page);

// 		}

// 	});

	

// 	//故障查询

// 	var pageError = pageInit({

// 		pages: 10,

// 		currentPage: 1,

// 		element: '.page-error',

// 		callback: function(page) {

// 			console.log("当前页:", page);

// 		}

// 	});

	

// 	//投票数量

// 	var pageVote = pageInit({

// 		pages: 10,

// 		currentPage: 1,

// 		element: '.page-vote',

// 		callback: function(page) {

// 			console.log("当前页:", page);

// 		}

// 	});

	

// 	//feed-swiper

// 	new Swiper('.feed-swiper', {

// 		freeMode: true,

// 		slidesPerView: 'auto',

// 		navigation: {

// 			nextEl: '.swiper-button-next',

// 			prevEl: '.swiper-button-prev',

// 		},

// 	});

	

// 	tabSwiper.update();

// }



//tab初始化

$(document).ready(function(){

	if($('.tab').html()){

		tabInit();

	}

	

	$(window).resize(function(){

		navCopy();

	});

	

	navCopy();


	


});



















