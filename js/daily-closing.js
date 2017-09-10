/**
 * Created by Jasko
 */
var DC = function(){
	this.tabBox = ['#operatin-table','#pending-table'];
	this.positionFlag = false;
	return this;
};

DC.prototype = {
	init: function(){
		var _this = this;
		_this.getData();
		_this.bindEvent();
	},
	getData: function(){
		var _this = this;
		UTILS.switchLoading(true);
		_this.getDailyClosing();
	},
	bindEvent: function () {
		var _this = this;

	},
	getDailyClosing: function(){
		var _this = this;
		UTILS.LOAD({
			url: UTILS.API.dailyClosing,
			callback:function(result){
				if(result.errorCode == 1){
					var html = "";
					var list = result.rows;
					var profitCls = "";
					for(var i in list){
						profitCls = (list[i].tradeProfit < 0) ? 'fc-green' : 'fc-red';
						name = (i==0) ? result.stockName : "";
						html += '<tr>' +
							'<td>'+" "+'</td>' +
							'<td>'+list[i].id+'</td>' +
							'<td><a href="single-stock.html?code='+list[i].stockCode+'">'+list[i].stockCode+'</a></td>'+
							'<td><a href="single-stock.html?code='+list[i].stockCode+'">'+list[i].stockName+'</a></td>'+
							'<td>'+list[i].stockNum+'</td>' +
							'<td>'+list[i].useNum+'</td>' +
							'<td><div class="progress-wrap"><div class="progress-bar" progress="'+list[i].usage+'"></div><span>'+list[i].usage+'%</span></div></td>'+
							'<td class="fc-yellow">'+list[i].totalValue+'</td>' +
							'<td>'+list[i].totalDealNum+'</td>' +
							'<td class="'+profitCls+'">'+list[i].tradeProfit+'</td>' +
							'<td>'+list[i].commission+'</td>' +
							'<td>'+list[i].transferFee+'</td>' +
							'<td>'+list[i].stampTax+'</td>' +
							'<td>'+list[i].profitRate+'%</td>' +
							'</tr>'
					}

					var totalCls = (result.total.tradeProfit < 0) ? 'fc-green' : 'fc-red'
					html += '<tr>' +
								'<td>合计</td>' +
								'<td></td>' +
								'<td></td>' +
								'<td></td>' +
								'<td></td>' +
								'<td></td>' +
								'<td></td>'+
								'<td class="fc-yellow">'+result.total.totalValue+'</td>' +
								'<td>'+result.total.totalDealNum+'</td>' +
								'<td class="'+totalCls+'">'+result.total.tradeProfit+'</td>' +
								'<td>'+result.total.commission+'</td>' +
								'<td>'+result.total.transferFee+'</td>' +
								'<td>'+result.total.stampTax+'</td>' +
								'<td>'+result.total.profitRate+'%</td>' +
							'</tr>';
					UTILS.switchLoading(false);
					$("#daily-closing-table").append(html);
					UTILS.renderProgress();
				}
			}
		})

	},




};

$(function(){
	new DC().init();
});