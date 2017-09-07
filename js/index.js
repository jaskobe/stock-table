var INDEX = function(){
    this.tabBox = ['#operatin-table','#pending-table'];
    return this;
}

INDEX.prototype = {
    init: function(){
        var _this = this;
        UTILS.TAB();
        _this.getData();
    },
    getData: function(){
        var _this = this;
        _this.getOperatin();
        _this.getPendingList();
    },
    getOperatin: function(){
        var _this = this;
        UTILS.LOAD({
            url: UTILS.API.getOperatin,
            callback:function(result){
                if(result.errorCode == 1){
                    var html = "";
                    var list = result.rows;
                    var typeCls = "";
                    for(i in list){
                        typeCls = (list[i].type == "买入") ? 'fc-green' : 'fc-red';
                        html += '<tr>'+
                        '<td>'+list[i].entrustTime+'</td>'+
                        '<td>'+list[i].stockCode+'</td>'+
                        '<td>'+list[i].stockName+'</td>'+
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
                        '<td class="fc-red">'+list[i].floatNum+'</td>'+
                        '<td>'+list[i].entrustId+'</td>'+
                        '<td>'+list[i].orderId+'</td>'+
                        '<td>'+list[i].tradeNum+'</td>'+
                        '<td class="fc-red">'+list[i].isUnwind+'</td>'+
                        '</tr>'
                    }
                    UTILS.switchLoading(false);
                    $(_this.tabBox[0]).append(html);
                    UTILS.renderProgress();
                }
            }
        })

    },
    getPendingList: function(){
        var _this = this;
        UTILS.LOAD({
            url: UTILS.API.getPendingList,
            callback:function(result){
                if(result.errorCode == 1){
                    var html = "";
                    var list = result.rows;
                    var typeCls = "";
                    for(i in list){
                        typeCls = (list[i].type == "买入") ? 'fc-green' : 'fc-red';
                        html += '<tr>'+
                        '<td>'+list[i].entrustTime+'</td>'+
                        '<td>'+list[i].stockCode+'</td>'+
                        '<td>'+list[i].stockName+'</td>'+
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
                        '<td class="fc-red">'+list[i].floatNum+'</td>'+
                        '<td>'+list[i].entrustId+'</td>'+
                        '<td>'+list[i].orderId+'</td>'+
                        '<td>'+list[i].tradeNum+'</td>'+
                        '<td class="fc-red">'+list[i].isUnwind+'</td>'+
                        '</tr>'
                    }
                    UTILS.switchLoading(false);
                    $(_this.tabBox[1]).append(html);
                    UTILS.renderProgress();
                }
            }
        })
    },
    
}

$(function(){
    new INDEX().init();
})