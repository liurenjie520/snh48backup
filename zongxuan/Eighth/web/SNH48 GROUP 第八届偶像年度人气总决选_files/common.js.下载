// 弹出用户登录框

function OpenLoginDialog(redirect_url) {
    $("#redirect_url").val(redirect_url);

    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        area: ['auto', 'auto'],
        shade: .7,
        zIndex: 10,
        shadeClose: false,
        content: $('#login_dialog'),
        success: function (layero) {
            $(".dialog_title .close").click(function () {
                layer.closeAll();
            });
        }
    });
}
function stop(){
    return false;
}
document.oncontextmenu=stop;
(function() {
    try {
        var $_console$$ = console;
        Object.defineProperty(window, "console", {
            get: function() {
                if ($_console$$._commandLineAPI)
                    throw "抱歉, 为了用户安全, 本网站已禁用console脚本功能";
                return $_console$$
            },
            set: function($val$$) {
                $_console$$ = $val$$
            }
        })
    } catch ($ignore$$) {
    }
})();
// (function() {var a = new Date(); debugger; return new Date() - a > 100;}())
//去左右空格;
function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
}


// 弹出成功信息框
function show_OK_msg(title, msg) {
    layer.alert(msg, {
        icon: 1,
        title: title,
        btn: ['OK']
    });
}

// 弹出失败信息框
function show_NG_msg(title, msg) {
    layer.open({
        content: title,
        btn: ['好吧'],
        time: 2 //2秒后自动关闭
    });
    // layer.msg(msg, {
    //     icon: 2,
    //     title: title,
    //     btn: ['好吧']
    // });
}

// 设置cookies函数
function SetCookie(name, value) {
    var now = new Date();
    var time = now.getTime();
    time += 3600 * 1000 * 2;
    now.setTime(time);
    document.cookie = name + "=" + escape(value) + '; expires=' + now.toUTCString();
}

// 取cookies函数
function GetCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}

// 删除cookie函数
function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

// 取得URL参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 激活码格式检查
function IsCode(s) {
    var patrn = /^[a-zA-Z0-9]{51}$/;
    return patrn.exec(s);
}


// AJAX通用失败处理
function ajax_error_handle(response) {
    $("#action_ctrl").val(0);
    show_NG_msg('处理失败', response.errmsg);
    return false;
}

// 调用API共通函数
var api_site_path = 'https://voteapi.48.cn/8thvote/';

function CallApi(api_url, post_data, suc_func, error_func) {
    post_data = post_data || {};
    suc_func = suc_func || function () {};
    error_func = error_func || function () {};

    //console.log('Call API:' + api_url);
    //console.log(JSON.stringify(post_data));

    $.ajax({
        url: api_site_path + api_url,
        type: "post",
        data: JSON.stringify(post_data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            //console.log(JSON.stringify(response));
            // API返回失败
            if (response.status != 200) {
                error_func(response);
            } else {
                // 成功处理数据
                suc_func(response);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // API错误异常
            var response = {"errcode": -1, "errmsg": '系统异常，请稍候再试'};
            // 异常处理
            error_func(response);
        }
    });
}

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

// 调用特定函数
function CallApiSpecify(api_url, post_data, suc_func, error_func) {

    var api_site = 'https://h5.48.cn/2018voteapi/web/';

    post_data = post_data || {};
    suc_func = suc_func || function () {};
    error_func = error_func || function () {};

    //console.log('Call API:' + api_url);
    //console.log(JSON.stringify(post_data));

    $.ajax({
        url: api_site + api_url,
        type: "post",
        // data: JSON.stringify(post_data),
        contentType: "application/x-www-form-urlencoded",

        dataType: "jsonp",
        data: post_data,
        // dataType: "json",
        success: function (response) {
            //console.log(JSON.stringify(response));
            // API返回失败
            if (response.errcode != 0) {
                error_func(response);
            } else {
                // 成功处理数据
                suc_func(response);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // API错误异常
            var response = {"errcode": -1, "errmsg": '系统异常，请稍候再试'};
            // 异常处理
            error_func(response);
        }
    });
}

// 用户本地Cookie删除处理
function DelUserCookie() {
    // 退出删除所有Cookie
    DelCookie('token');
    DelCookie('vote_name');
    DelCookie('vote_rest');
    DelCookie('vote_total');
}

// 用户登录处理
function Login(username, password, valid,suc_func, error_func) {
    // 用户本地Cookie删除处理
    DelUserCookie();
    var api_url = 'api/v1/login/web';
    var device = getBrowserInfo();
    var post_data = {"sgAccount": username, "sgPwd": password ,"smsCode": valid,"device": device};

    CallApi(api_url, post_data, suc_func, error_func);
}

//檢查票數的小數位數
function checknum(obj)
{
    if(/^\d+\.?\d{0,1}$/.test(obj.value)){
        obj.value = obj.value;
    }else{
        obj.value = obj.value.substring(0,obj.value.length-1);
    }
}

// 用户退出处理
function Logout() {
    // 用户本地Cookie删除处理
    DelUserCookie();
    window.location.href = "index.html";
}

// 用户退出处理
function LogoutWithoutRedirect() {
    // 用户本地Cookie删除处理
    DelUserCookie();
    CallApi("logout.php", {});
}
//获取丝瓜账号绑定的手机号验证码
function getCode2(username,suc_func, error_func) {
  // 用户本地Cookie删除处理
  CallApi('api/v2/sms/sg/send', {"username": username}, suc_func, error_func);
}
//用户是否已登录
function isLogin() {
    return GetCookie('vote_name') != null && GetCookie('vote_rest') != null && GetCookie('vote_total') != null && GetCookie('token') != null;
}

// 查询用户信息
function UserInfo(suc_func, error_func) {
    var api_url = 'api/v1/userinfo/get';

    CallApi(api_url, {token:GetCookie('token')}, suc_func, error_func);
}

// 投票券激活处理
function ActiveCode(tpcd, suc_func, error_func) {
    var api_url = 'api/v1/code/act';
    var post_data = {"token": GetCookie('token'),"appToken":"","tpCd":tpcd,"device":getBrowserInfo(),"platform":"WEB"};

    CallApi(api_url, post_data, suc_func, error_func);
}


// 投票券激活处理
function VipGift(suc_func, error_func) {
    var api_url = 'api/v1/freetp/sgvip';
    var post_data = {"token": GetCookie('token'),"device":getBrowserInfo()};

    CallApi(api_url, post_data, suc_func, error_func);
}

// 登录用户投票处理
function UserVote(token,sid, cost,device,platform,appToken,  suc_func, error_func) {
    var api_url = 'api/v1/vote';
    var post_data = {"token":token,"sid": sid,"voteNum":cost,"device":device,"platform":platform,appToken:appToken };

    CallApi(api_url, post_data, suc_func, error_func);
}

// 非注册用户投票处理
function GuestVote(sid, tpcd, suc_func, error_func) {
    var api_url = 'api/v1/guest/vote';
    var post_data = {"sid": sid, "tpCd": tpcd,"device":getBrowserInfo()};

    CallApi(api_url, post_data, suc_func, error_func);
}

// 投票记录查询
function VoteLog(page, suc_func, error_func) {
    var api_url = 'api/v1/vote/history/page';

    CallApi(api_url, {token:GetCookie('token'),page: page, limit: 10}, suc_func, error_func);
}

// 合计投票记录查询
function VoteSumLog(suc_func, error_func) {
    var api_url = 'api_vote_sum_log.php';
    CallApi(api_url, {}, suc_func, error_func);
}

//故障申诉
function Feedback(phone, pic_url, submit_info, suc_func, error_func) {
    var api_url = 'api_feedback.php';
    var browser = getBrowserInfo();

    var params = {
        token: GetCookie('token'),
        uname: GetCookie('vote_name'),
        phone: phone,
        browser: browser,
        submit_info: submit_info
    };
    if (pic_url) {
        params.pic_url = pic_url;
    }
    CallApiSpecify(api_url, params, suc_func, error_func);
}

// 故障申诉记录查询
function FeedbackLog(limit, offset, token,suc_func, error_func) {
    var api_url = 'api_feedback_log.php';
    CallApiSpecify(api_url, {limit: limit, offset: offset,token:token,uname:GetCookie('vote_name')}, suc_func, error_func);
}
// 电子券购买记录
function purchaseLog(page,suc_func,error_func){

    var api_url = 'api/v1/order/history/page';
    CallApi(api_url,{token:GetCookie('token'),page:page,limit:10},suc_func,error_func);
}
//激活记录
function ActiveLog(page,suc_func,error_func){

    var api_url = 'api/v1/code/act/history/page';
    CallApi(api_url,{token:GetCookie('token'),page:page,limit:10},suc_func,error_func);
}
//前六位投票记录
// function VoteSix(suc_func,error_func) {
//     var api_url = "api/v1/vote/history/page";
//     CallApi(api_url,{"token":GetCookie('token'),"page":1,"limit":6},suc_func,error_func);
// }

function VoteSix(suc_func,error_func) {
    var api_url = "api/v1/vote/history/top5";
    CallApi(api_url,{"token":GetCookie('token')},suc_func,error_func);
}

// 用户晒票
function VoteShow(suc_func, error_func) {
    var api_url = 'api/v1/voteshow/getcode';
    CallApi(api_url, {"token":GetCookie('token'),"device":getBrowserInfo()}, suc_func, error_func);
}
// 已激活券号搜索
function searchLog(_tpCd,suc_func, error_func) {
    var api_url = 'api/v1/act/history/query';
    CallApi(api_url, {"tpCd":_tpCd,"token":GetCookie('token')}, suc_func, error_func);
}
//晒票记录取得（按总投票数逆序）
function VoteShowLog(srh_code, suc_func, error_func) {
    var api_url = 'api/v1/voteshow/query';
    CallApi(api_url, {showCode: srh_code}, suc_func, error_func);
}

//更新用户信息
function updateUserInfo() {
    UserInfo(function (response) {
        var response = response.content;
        SetCookie('vote_name', response.nickName);
        SetCookie('vote_rest', Number(response.tpRest));
        SetCookie('vote_total', Number(response.tpTotal));
    }, function (response) {
        //console.warn("更新用户数据失败：" + response.errmsg);
        if (response.status == 401&&response.message.indexOf('授权验证失败')==0) {
            DelUserCookie();
        }
        if(response.status==400&&response.message.indexOf('请求超限')==0){

            show_NG_msg('错误<br>' + '操作频率过快');
        }
    })
}

// 取得浏览器信息
function getBrowserInfo() {
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}

//上传文件
function uploadFile(files, callback) {
    //console.log(files);
    var form = new FormData();
    for (var i in files) {
        if (files.hasOwnProperty(i)) {
            var file = files[i];
            form.append("images[" + i + "]", file);
        }
    }

    $.ajax({
        "crossDomain": true,
        "url": 'https://h5.48.cn/service/upload/upload_image.php',
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form,
        success: function (response) {
            callback(JSON.parse(response));
        }, error: function (err) {

        }
    });
}

/**
 * 禁用按钮
 * @param $this 按钮对象
 * @param btnText 按钮文本内容 默认为"处理中"
 * @return {boolean}
 */
function DisableClick($this, btnText) {
    if (!$this) {
        console.warn("$this 不能为空");
        return true;
    }
    var status = Number($this.attr('data-clickStatus') || 1);
    if (status == 0) {
        return true;
    }

    btnText = btnText ? btnText : "<span>处理中</span>";
    $this.attr('data-clickStatus', 0);
    //$this.html(btnText);
    return false;
}

/**
 * 激活按钮
 * @param $this 按钮对象
 * @param btnText 按钮文本内容 默认为"处理中"
 */
function ActiveClick($this, btnText) {
    if (!$this) {
        console.warn("$this 不能为空");
        return;
    }
    btnText = btnText ? btnText : "确认";
    $this.attr('data-clickStatus', 1);
    //$this.html(btnText);
}
//队伍命名
function formatTname(_tname){
    var tname = _tname
    if(tname=='SII')
      tname = 's2';
  if(tname=='NII')
    tname = 'n2';
    if(tname=='HII')
      tname = 'h2';
  if(tname=='X')
    tname = 'x';
    if(tname=='B')
      tname = 'b';
  if(tname=='E')
    tname = 'e';
  if(tname=='J')
    tname = 'j';
  if(tname=='G')
    tname = 'g';
  if(tname=='NIII')
    tname = 'n3';
  if(tname=='Z')
    tname = 'z';
  if(tname=='预备生')
    tname = 'bej-def';
  if(tname=='G预备生')
    tname = 'gnz-def';
  if(tname=='未列队')
    tname = 'gnz-def';
  if(tname=='BEJ48')
    tname = 'bej';
  if(tname=='CKG48')
    tname = 'ckg';
  return tname
}
function formatT(_tname){
    if(_tname == "idft"){
        return "IDOLS Ft"
    }else if(_tname == "新成员" || _tname == "预备生" || _tname == "未列队"){
        return "未入列成员"
    }else if(_tname == "S预备生"){
        return "SNH48 预备生"
    }else if(_tname == "G预备生"){
        return "GNZ48 预备生"
    }else if(_tname == "BEJ48" || _tname == "CKG48"){
        return _tname
    }else{
        return "TEAM "+_tname
    }
}
//弹框
function showPopMsg(_title,_msg){

    layerOpen('layer-popup')
    $(".pop-title").html(_title)
    $(".pop-msg").html(_msg)

}
