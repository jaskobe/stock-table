/**
 * Created by Jasko
 */
var SINGLE = function(){
	this.tabBox = ['#operatin-table','#pending-table'];
	this.positionFlag = false;
	return this;
};

SINGLE.prototype = {
	init: function(){
		var _this = this;
		_this.getData();
		_this.bindEvent();
	},
	getData: function(){
		var _this = this;
		var code = UTILS.parseUrlParam().code;
		UTILS.switchLoading(true);
		_this.getStat(code);
	},
	bindEvent: function () {
		var _this = this;

	},
	getStat: function(code){
		var _this = this;
		var stockCode = code;
		UTILS.LOAD({
			url: UTILS.API.singleStockStat + '?code='+code,
			callback:function(result){
				if(result.errorCode == 1){
					var html = "";
					var list = result.rows;
					var profitCls = "";
					var name = "";
					$("#stock-id").html(stockCode);

					for(var i in list){
						profitCls = (list[i].tradeProfit < 0) ? 'fc-green' : 'fc-red';
						name = (i==0) ? result.stockName : "";
						html += '<tr>' +
							'<td>'+name+'</td>' +
							'<td>'+list[i].date+'</td>' +
							'<td>'+list[i].dealAmount+'</td>' +
							'<td>'+list[i].stockNum+'</td>' +
							'<td>'+list[i].useNum+'</td>' +
							'<td><div class="progress-wrap"><div class="progress-bar" progress="'+list[i].usage+'"></div><span>'+list[i].usage+'%</span></div></td>'+
							'<td class="fc-yellow">'+list[i].totalValue+'</td>' +
							'<td class="'+profitCls+'">'+list[i].tradeProfit+'</td>' +
							'<td>'+list[i].commission+'</td>' +
							'<td>'+list[i].transferFee+'</td>' +
							'<td>'+list[i].stampTax+'</td>' +
							'<td>'+list[i].profitRate+'%</td>' +
							'</tr>'
					}
					UTILS.switchLoading(false);
					$("#single-stock-table").append(html);
					UTILS.renderProgress();
				}
			}
		})

	},




};

$(function(){
	new SINGLE().init();
});