/**
 * Created by Jasko
 */
var MONTHLY = function(){
	this.tabBox = ['#operatin-table','#pending-table'];
	this.positionFlag = false;
	return this;
};

MONTHLY.prototype = {
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
			url: UTILS.API.monthlyStat,
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
							'<td>'+list[i].totalValue+'</td>' +
							'<td><div class="progress-wrap"><div class="progress-bar" progress="'+list[i].averageUsage+'"></div><span>'+list[i].averageUsage+'%</span></div></td>'+
							'<td class="fc-yellow">'+list[i].totalDealNum+'</td>' +
							'<td class="'+profitCls+'">'+list[i].tradeCost+'</td>' +
							'<td>'+list[i].securitiesInterest+'</td>' +
							'<td>'+list[i].transferFee+'</td>' +
							'<td>'+list[i].netProfit+'</td>' +
							'<td>'+list[i].profitRate+'%</td>' +
							'</tr>'
					}

					var totalCls = (result.total.netProfit < 0) ? 'fc-green' : 'fc-red'
					html += '<tr>' +
						'<td>合计</td>' +
						'<td></td>' +
						'<td></td>' +
						'<td></td>' +
						'<td></td>' +
						'<td class="fc-yellow">'+result.total.totalValue+'</td>' +
						'<td></td>' +
						'<td class="fc-yellow">'+result.total.totalDealNum+'</td>' +
						'<td></td>' +
						'<td>'+result.total.securitiesInterest+'</td>' +
						'<td>'+result.total.transferFee+'</td>' +
						'<td class="'+totalCls+'">'+result.total.netProfit+'</td>' +
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
	new MONTHLY().init();
});