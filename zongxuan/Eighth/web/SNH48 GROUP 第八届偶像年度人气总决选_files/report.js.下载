var tabSwiper 
var vm = new Vue({
  el:'#report',
  data:{
    week1:[],
    week2:[],
    week3:[],
    week4:[],
    week5:[],
    week6:[],
    week7:[],
    week8:[],
    sel:'',
    index:0
  },
  mounted: function () {
    
    tabSwiper = new Swiper('.tab-content', {
        allowTouchMove: false,
        autoHeight: true,
        observer: true,
    });
    $('.tab a').on('click', function(){
      //console.log($(this).index())
      var id = $(this).attr("id");
      console.log(id)
      $(this).addClass('seled').siblings().removeClass();
      tabSwiper.slideTo(id);
    });

    this.getList()
    //https://vote.48.cn/resource/img/member/zp_10221.jpg
  },
  filters:{
    avatar:function(img){
      return 'https://source.48.cn'+img;
    },
    formatclass:function(_tname){
      return formatTname(_tname)
    },
    formatT:function(_tname){
      if(_tname == "S预备生" ){
        return "预"
      }else if(_tname == "G预备生" ){
        return "预"
      }else{
        return _tname
      }
    }
  },
  methods: {
      //获取排名数据
      getList:function(url){
        var that = this;
        $.getJSON("../resource/json/reprotinfo.json", function(data) {
            if(data.content.week1 != null){
              that.week1 = data.content.week1
              that.index = 7;
            }
            if(data.content.week2 != null){
              that.week2 = data.content.week2
              that.index = 6;
            }
            if(data.content.week3 != null){
              that.week3 = data.content.week3
              that.index = 5;
            }
            if(data.content.week4 != null){
              that.week4 = data.content.week4
              that.index = 4;
            }
            if(data.content.week5 != null){
              that.week5 = data.content.week5
              that.index = 3;
            }
            if(data.content.week6 != null){
              that.week6 = data.content.week6
              that.index = 2;
            }
            if(data.content.week7 != null){
              that.week7 = data.content.week7
              that.index = 1;
            }
            if(data.content.week8 != null){
              that.week8 = data.content.week8
              that.index = 0;
            }
            setTimeout(function(){
              $('.tab a').eq(that.index).click()
            },100)
            tabSwiper.init();
        })
      }
       // formatTeam:function(_tname){
       //    if(_tname == "新成员" || _tname == "预备生" || _tname == "未列队"){
       //      return "未入列"
       //    }
       //  }
  }
})

