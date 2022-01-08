Function.prototype.binding = function() {
    if (arguments.length < 2 && typeof arguments[0] == "undefined") return this;
    var __method = this, args = jQuery.makeArray(arguments), object = args.shift();
    return function() {
        return __method.apply(object, args.concat(jQuery.makeArray(arguments)));
    }
}

var Class = function(subclass){
	subclass.setOptions = function(options){
		this.options = jQuery.extend({}, this.options,options);
		for(var key in options){
			if(/^on[A-Z][A-Za-z]*$/.test(key)){
				$(this).bind(key,options[key]);
			}
		}
	}
    var fn =  function(){
        if(subclass._init && typeof subclass._init == 'function'){
            this._init.apply(this,arguments);
        }
    }
    if(typeof subclass == 'object'){
        fn.prototype = subclass;
    }
    return fn;
}

var PopupLayer = new Class({
	options:{
		trigger:null,                            //触发的元素或id,必填参数
		popupBlk:null,                           //弹出内容层元素或id,必填参数
		closeBtn:null,                           //关闭弹出层的元素或id
		popupLayerClass:"popupLayer",            //弹出层容器的class名称
		eventType:"click",                       //触发事件的类型
		offsets:{                                //弹出层容器位置的调整值
			x:0,
			y:0
		},
		vMiddle:false,                           //是否垂直居中
		useFx:false,                             //是否使用特效
		useOverlay:false,                        //是否使用全局遮罩
		usePopupIframe:true,                     //是否使用容器遮罩
		isShadeClose:false,						 //是否使用容器遮罩关闭事件
		isresize:true,                           //是否绑定window对象的resize事件
		shadeIndex:0,							 //遮罩层的索引，为了更新id:shadeTemp0这样
		onBeforeStart:function(){},            //自定义事件
		onAfterEnd:function(){},              //自定义事件
		onOpenEnd:function(){}              //自定义事件
	},
	_init:function(options){
		this.setOptions(options);                //载入设置
		this.isSetPosition = this.isDoPopup = this.isOverlay = true;    //定义一些开关
		this.popupLayer = $(document.createElement("div")).addClass(this.options.popupLayerClass);     //初始化最外层容器
		this.popupIframe = $(document.createElement("iframe")).attr({border:0,frameborder:0});         //容器遮罩,用于屏蔽ie6下的select
		this.trigger = $(this.options.trigger);                         //把触发元素封装成实例的一个属性，方便使用及理解
		this.popupBlk = $(this.options.popupBlk);                       //把弹出内容层元素封装成实例的一个属性
		$(this).trigger("onBeforeStart");                               //执行自定义事件。
		this.vMiddle=this.options.vMiddle;                              //是否垂直居中
		this.isShadeClose=this.options.isShadeClose;                    //是否点击遮罩关闭浮动层
		this._construct()                                               //通过弹出内容层，构造弹出层，即为其添加外层容器及底层iframe
		this.trigger.bind(this.options.eventType,function(){            //给触发元素绑定触发事件
			if(this.isSetPosition){
				this.setPosition(this.trigger.offset().left + this.options.offsets.x, this.trigger.offset().top + this.trigger.get(0).offsetHeight + this.options.offsets.y);
			}
			else{//新增，使用原来的位置modify by huangping
				var leftT=this.popupBlk.css("left")?this.popupBlk.css("left"):this.popupBlk.position().left;
				var topT=this.popupBlk.css("top")?this.popupBlk.css("top"):this.popupBlk.position().top;
				this.setPosition(leftT, topT);
				if(this.popupBlk.css("margin-left")){
					this.popupLayer.css("margin-left",this.popupBlk.css("margin-left"));
				}
				if(this.popupBlk.css("margin-top")){
					this.popupLayer.css({"margin-top":this.popupBlk.css("margin-top")});
				}
			}
			this.options.useOverlay?this._loadOverlay():null;               //如果使用遮罩则加载遮罩元素
			this.options.isShadeClose?this.overlay.bind("click",this.close.binding(this)):null;
			(this.isOverlay && this.options.useOverlay)?this.overlay.show():null;
			if(this.isDoPopup && (this.popupLayer.css("display")== "none")){
				this.options.useFx?this.doEffects("open"):this.popupLayer.show();
			}
			$(this).trigger("onOpenEnd");							 
		}.binding(this));
		this.closeBtn = $(this.options.closeBtn);                       //把关闭按钮素封装成实例的一个属性
		this.shadeIndex=this.options.shadeIndex;                       //遮罩元素索引 作为id
		this.isresize?$(window).bind("resize",this.doresize.binding(this)):null;
		this.options.closeBtn?this.closeBtn.bind("click",this.close.binding(this)):null;   //如果有关闭按钮，则给关闭按钮绑定关闭事件
		$(this).trigger("onAfterEnd");  
	},
	_construct:function(){                  //构造弹出层
		this.popupBlk.show();
		this.popupLayer.append(this.popupBlk.css({opacity:1})).appendTo($(document.body)).css({position:"absolute",'z-index':3,width:this.popupBlk.get(0).offsetWidth,height:this.popupBlk.get(0).offsetHeight});
		this.options.usePopupIframe?this.popupLayer.append(this.popupIframe):null;
		this.recalculatePopupIframe();
		this.popupLayer.hide();
	},
	_loadOverlay:function(){                //加载遮罩
		pageWidth = ($.browser.version=="6.0")?$(document).width()-21:$(document).width();
		this.overlay?this.overlay.remove():null;
		this.overlay = $(document.createElement("div"));
		$(this.overlay).attr("id","shadeTemp"+this.shadeIndex);
		this.overlay.css({position:"absolute","z-index":2,left:0,top:0,zoom:1,display:"none",width:pageWidth,height:$(document).height()}).appendTo($(document.body)).append("<div  style='position:absolute;z-index:2;width:100%;height:100%;left:0;top:0;opacity:0.5;filter:Alpha(opacity=50);background:#000'></div><iframe frameborder='0' border='0' style='width:100%;height:100%;position:absolute;z-index:1;left:0;top:0;filter:Alpha(opacity=0);'></iframe>")
	},
	doresize:function(){
		this.overlay?this.overlay.css({width:($.browser.version=="6.0")?$(document).width()-21:$(document).width(),height:($.browser.version=="6.0")?$(document).height()-4:$(document).height()}):null;
		if(this.isSetPosition){
			this.setPosition(this.trigger.offset().left + this.options.offsets.x, this.trigger.offset().top + this.trigger.get(0).offsetHeight + this.options.offsets.y);
		}
		else{//新增，使用原来的位置modify by huangping
			var leftT=this.popupBlk.css("left")?this.popupBlk.css("left"):this.popupBlk.position().left;
			var topT=this.popupBlk.css("top")?this.popupBlk.css("top"):this.popupBlk.position().top;
			this.setPosition(leftT, topT);
			if(this.popupBlk.css("margin-left")){
				this.popupLayer.css({marginLeft:this.popupBlk.css("margin-left")});
			}
			if(this.popupBlk.css("margin-top")){
				this.popupLayer.css({marginTop:this.popupBlk.css("margin-top")});
			}
		}
	},
	setPosition:function(left,top){          //通过传入的参数值改变弹出层的位置
		this.popupLayer.css({left:left,top:top});
		if(this.vMiddle){
			this.popupLayer.css({top:$(window).height()/2-this.popupBlk.height()/2+50+$(document).scrollTop()});
		}
	},
	doEffects:function(way){                //做特效
		way == "open"?this.popupLayer.show("slow"):this.popupLayer.hide("slow");
	},
	recalculatePopupIframe:function(){     //重绘popupIframe,这个不知怎么改进，只好先用这个笨办法。
		this.popupIframe.css({position:"absolute",'z-index':-1,left:0,top:0,opacity:0,width:this.popupBlk.get(0).offsetWidth,height:this.popupBlk.get(0).offsetHeight});
	},
	close:function(){                      //关闭方法
		this.options.useOverlay?this.overlay.hide():null;
		this.options.useFx?this.doEffects("close"):this.popupLayer.hide();
	}
});﻿