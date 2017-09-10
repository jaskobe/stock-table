var INDEX = function(){
    this.tabBox = ['#operatin-table','#pending-table'];
    this.positionFlag = false;
    return this;
};

INDEX.prototype = {
    init: function(){
        var _this = this;
	    UTILS.TAB();
        _this.getData();
        _this.bindEvent();
    },
    getData: function(){
        var _this = this;
        _this.getOperatin();
        _this.getPendingList();
    },
    bindEvent: function () {
        var _this = this;
        $("#position").on("click",function () {
            if(!_this.positionFlag){
                UTILS.switchLoading(true);
                _this.getCurrentPosition();
            }else {
	            $(".layer").show();
                $(".position-box").show();
            }
        })
        
        $(".icon-close").on("click",function () {
	        $(".position-box").hide();
	        $(".layer").hide();
        })

	    $("table").on("dblclick",".list",function () {
	    	var oid = $(this).attr("oid");
	    	_this.cancelOrde(oid,this);
	    })


    },
    getOperatin: function(){
        var _this = this;
        UTILS.LOAD({
            url: UTILS.API.getOperatin,
	        // async: false,
	        dataDone:function () {
		        UTILS.switchLoading(false);

	        },
            callback:function(result){
                if(result.errorCode == 1){
	                var html = "";
                    var list = result.rows;
                    var typeCls = "";
                    var floatCls = "";
                    for(i in list){
                        typeCls = (list[i].type == "买入") ? 'fc-green' : 'fc-red';
	                    floatCls = (list[i].floatNum < 0) ? 'fc-green' : 'fc-red';
                        html += '<tr oid="'+list[i].orderId+'" class="list">'+
                        '<td>'+list[i].entrustTime+'</td>'+
                        '<td><a href="single-stock.html?code='+list[i].stockCode+'">'+list[i].stockCode+'</a></td>'+
                        '<td><a href="single-stock.html?code='+list[i].stockCode+'">'+list[i].stockName+'</a></td>'+
                        '<td class="fc-yellow">'+list[i].dealPrice+'</td>'+
                        '<td class="fc-yellow">'+list[i].entrustPrice+'</td>'+
                        '<td>'+list[i].dealAmount+'</td>'+
                        '<td>'+list[i].entrustAmount+'</td>'+
                        '<td><div class="progress-wrap"><div class="progress-bar" progress="'+list[i].ratio+'"></div><span>'+list[i].ratio+'%</span></div></td>'+
                        '<td class="'+typeCls+'">'+list[i].type+'</td>'+
                        '<td>'+list[i].cancelAmount+'</td>'+
                        '<td>'+list[i].signalIn+'</td>'+
                        '<td>'+list[i].signalOut+'</td>'+
                        '<td>'+list[i].signalCancel+'</td>'+
                        '<td class="'+floatCls+'">'+list[i].floatNum+'</td>'+
                        '<td>'+list[i].entrustId+'</td>'+
                        '<td>'+list[i].orderId+'</td>'+
                        '<td>'+list[i].tradeNum+'</td>'+
                        '<td class="fc-red">'+list[i].isUnwind+'</td>'+
                        '</tr>'
                    }

                    $(_this.tabBox[0]).append(html);
                    UTILS.renderProgress();

                }
            },
        })

    },
    getPendingList: function(){
        var _this = this;
        UTILS.LOAD({
            url: UTILS.API.getPendingList,
	        // async: false,
            callback:function(result){
                if(result.errorCode == 1){
	                var html = "";
                    var list = result.rows;
                    var typeCls = "";
	                var floatCls = "";
                    for(var i in list){
                        typeCls = (list[i].type == "买入") ? 'fc-green' : 'fc-red';
	                    floatCls = (list[i].floatNum < 0) ? 'fc-green' : 'fc-red';
                        html += '<tr oid="'+list[i].orderId+'" class="list">'+
                        '<td>'+list[i].entrustTime+'</td>'+
                        '<td><a href="single-stock.html?code='+list[i].stockCode+'">'+list[i].stockCode+'</a></td>'+
                        '<td><a href="single-stock.html?code='+list[i].stockCode+'">'+list[i].stockName+'</a></td>'+
                        '<td class="fc-yellow">'+list[i].dealPrice+'</td>'+
                        '<td class="fc-yellow">'+list[i].entrustPrice+'</td>'+
                        '<td>'+list[i].dealAmount+'</td>'+
                        '<td>'+list[i].entrustAmount+'</td>'+
                        '<td><div class="progress-wrap"><div class="progress-bar" progress="'+list[i].ratio+'"></div><span>'+list[i].ratio+'%</span></div></td>'+
                        '<td class="'+typeCls+'">'+list[i].type+'</td>'+
                        '<td>'+list[i].cancelAmount+'</td>'+
                        '<td>'+list[i].signalIn+'</td>'+
                        '<td>'+list[i].signalOut+'</td>'+
                        '<td>'+list[i].signalCancel+'</td>'+
                        '<td class="'+floatCls+'">'+list[i].floatNum+'</td>'+
                        '<td>'+list[i].entrustId+'</td>'+
                        '<td>'+list[i].orderId+'</td>'+
                        '<td>'+list[i].tradeNum+'</td>'+
                        '<td class="fc-red">'+list[i].isUnwind+'</td>'+
                        '</tr>'
                    }
                    $(_this.tabBox[1]).append(html);
                    UTILS.renderProgress();
                }
            }
        })
    },
    getCurrentPosition: function () {
	    var _this = this;
	    UTILS.LOAD({
		    url: UTILS.API.getCurrentPosition,
		    callback:function(result){
			    if(result.errorCode == 1){
				    var html = "";
				    var list = result.rows;
				    for(var i in list){
					    html += '<tr>'+
						    '<td>'+list[i].entrustTime+'</td>'+
						    '<td>'+list[i].stockCode+'</td>'+
						    '<td>'+list[i].stockName+'</td>'+
						    '<td class="fc-yellow">'+list[i].dealPrice+'</td>' +
                            '</tr>'
                    }
                    $("#position-table").append(html);
				    UTILS.switchLoading(false,false);
				    $(".position-box").show();

				    _this.positionFlag = true;
			    }
		    }
	    })
    },

	cancelOrde: function (oid,obj) {
		var _this = this;
		UTILS.LOAD({
			url: UTILS.API.cancelOrder,
			type: "POST",
			data: {
				orderId: oid
			},
			dataDone:function () {
				UTILS.switchLoading(false);

			},
			callback: function (result) {
				if(result.errorCode == 1){
					alert("撤销成功");
					obj.remove();
				}
			}
		})
	}


};

$(function(){
    new INDEX().init();
});