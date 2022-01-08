$(function () {
    /*
    $.getJSON("../resource/json/vote_member.json", function(data) {//默认本地文件../resource/json/vote_member.json
      // 定义成员列表
      var rnd_members = new Array();
      // 成员列表赋值
      $.each(data.rows, function(idx, item) {
        rnd_members[idx] = item;
        //rnd_members[idx] = item.sid + "_" + item.tname + "_" + item.sname;
      });
      // 成员列表随机排列
      rnd_members.sort(function() { return Math.random() - 0.5; });//随机性太差，某人十有八次出现
	    var newNum=Math.abs(Math.random()*(Math.random()*200));//增加随机性
	    rnd_members = rnd_members.slice(newNum, newNum+16);
      // 前7位成员显示
      for(ic = 0 ; ic < 7 ; ic++){
        var item = rnd_members[ic]
        var member_html = '';
        member_html += '<li class="'+formatTname(item.tname)+'">';
        member_html += '<a href="member-detail.html?sid='+item.sid+'" class="photo"><img src="../resource/img/member/zp_'+ item.sid +'.jpg" alt="公式照"></a>';
        member_html += '<p><b class="name">'+item.sname+'</b><i class="pinyin">' + item.pinyin + '</i></p>';
        member_html += '<i class="team">TEAM ' + item.tname + '</i>';
        member_html += '<a href="###" class="btn btn-h22"><span>成员资料</span></a>';
        member_html += '</li>';
        $(".mem_con").append(member_html);
      }
    });*/
    //top 16 展示
    $.getJSON("../resource/json/reprotinfo.json", function(data) {
        if(data.content.week1 == null){
          $(".great").addClass("great-repeat")
          $(".container .report").hide()
          $(".img-report").show()
        }else{
          var curWeek;
          for(var j=1;j<=8;j++){
            console.log(data.content['week'+j])
            if(data.content['week'+j] != null){
              curWeek = data.content['week'+j]
            }
          }
          
          $(".rank-grid-16").html("")
          for(i = 0 ; i < curWeek.top16.length ; i++){
            var item = curWeek.top16[i]
            var member_html = '<li>';
            member_html += '<div>';
            member_html += '<a href="javascript:;">';
            member_html += '<div class="photo-bg"></div>';
            //member_html += '<div class="photo" style="background-image: url(https://vote.48.cn/resource/img/member/zp_'+item.sid+'.jpg);"></div>';
            member_html += '<div class="photo" style="background-image: url(https://vote.48.cn/resource/img/report/'+item.sid+'.png);"></div>';
            member_html += '</a>';
            member_html += '</div>';
            member_html += '</li>';
            $(".rank-grid-16").append(member_html);
            $(".report p").html("("+curWeek.subTitle+")")
          }
        }
    },function(){
      alert(2)
    })
    
});
