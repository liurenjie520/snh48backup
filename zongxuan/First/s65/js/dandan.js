// JavaScript Document
$(document).ready(function(e) {
	$('#r_menu').localScroll(500);
	
	
	$("#r_menu ul li a").each(function(index, element) {
        $(this).click(function(){
			var data_s = $(this).attr("data-scroll");
			$("#r_menu").animate({"top":data_s+"px"},500)
		})
    });
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		
		if(scrollTop >= 524 && scrollTop < 1320){
			//$("#r_menu").stop(true, true).animate({"top":"50px"});
			$("#r_menu li a").removeClass("on");
			$("#r_menu li a").eq(0).addClass("on");
		}else if(scrollTop >= 1320 && scrollTop < 2100){
			//$("#r_menu").stop(true, true).animate({"top":"600px"})
			$("#r_menu li a").removeClass("on");
			$("#r_menu li a").eq(1).addClass("on");
		}else if(scrollTop >= 2100 && scrollTop < 2500){
			//$("#r_menu").stop(true, true).animate({"top":"1150px"})
			$("#r_menu li a").removeClass("on");
			$("#r_menu li a").eq(2).addClass("on");
		}else if(scrollTop >= 2500){
			//$("#r_menu").stop(true, true).animate({"top":"1150px"})
			$("#r_menu li a").removeClass("on");
			$("#r_menu li a").eq(3).addClass("on");
		}else{
			//$("#r_menu").stop(true, true).animate({"top":"1720px"})
			$("#r_menu li a").removeClass("on");
		}
	})
});
