var HOST = "http://rapapi.org/mockjsdata/25638" //接口域名地址，上线需配置为线上接口地址


UTILS = {
    API: {
        getOperatin: HOST + '/stock/getOperatin', //交易流水列表
        getPendingList: HOST + '/stock/getPendingList', //交易待处理
        getCurrentPosition: HOST + '/stock/getCurrentPosition', //当日持仓列表
        dailyClosing: HOST + '/stock/dailyClosing', //每日收盘统计
        monthlyStat: HOST + '/stock/monthlyStat', //月统计
        singleStockStat: HOST + '/stock/singleStockStat', //个股统计，?code=
    },
    //获取浏览器参数
    parseUrlParam : function(url) {
        if (!url) {
            url=window.location.href;
        }
        var urlParam = {};
        if (url.indexOf("?") < 0) {
            return urlParam;
        }
        var params = url.substring(url.indexOf("?") + 1).split("&");
        for (var i = 0; i < params.length; i++) {
            var k = params[i].substring(0,params[i].indexOf("="));
            var v = params[i].substring(params[i].indexOf("=")+1);
            if (v.indexOf("#") > 0) {
                v = v.substring(0, v.indexOf("#"));
            }
            urlParam[k] = v;
        }
        return urlParam;
    },
    /**
     * 公共ajax请求方法
     * 参数说明：{}
     * url: 请求地址 (string)
     * params: 请求参数 (string || object)
     * callback: 成功回调 function
     * errcallback: 错误回调(错误提示类型tipscode,错误代码errcode, 错误回调 errcb ) (0 || object)
     * type: 请求类型，"GET" || "POST" 默认是"GET"。(string)
     * contentType: 请求内容类型，默认为"application/json"。
     */
    LOAD : function(op) {
        if (!op || !op.url) {
            return;
        }

        if (op.params) {
            op.url = op.url + "?" + decodeURIComponent($.param(op.params));
        }


        var _async = op.async == false ? false : true;
        var options = {
            url: op.url,
            data: JSON.stringify(op.data) || "",
            type: op.type || "GET",//HTTP请求类型
            async: _async,
            contentType:op.contentType || "application/json",
            dataType: "json",
            timeout: op.timeout || 30000,
            success: function(d) {
                if (op.callback && typeof(op.callback) == 'function') {
                    op.callback.apply(null, arguments);
                }

            },
            error: function() {


            }
        };
        $.ajax(options);
    },
    TAB: function(){
        var item = $(".tab-item");

        item.on("click",function(){
            var $this = $(this);
            var target = $this.attr("data-target");

            $this.addClass("active").siblings(".tab-item").removeClass("active");
            $(target).show().siblings(".tab-content-box").hide();
        })
    },
    //显示或隐藏loading动画，true：显示，false：隐藏
    switchLoading: function(status){
        status ? $(".loading-layer").show() : $(".loading-layer").hide();
    },
    //渲染进度条
    renderProgress: function(){
        var _this = this;
        var bar = $(".progress-bar");
        bar.each(function(){
            var $this = $(this);
            var num = $this.attr("progress");
            $this.css("width",num+'%');
        })
    }

}
