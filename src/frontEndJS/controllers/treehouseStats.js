
export default class TreehouseStatsController {
	constructor(){
		this.pieArray = [["Points", "% of Total Points"]];
		this.dataPoints = null;
		this.chart = null;
		this.chartOptions = null;
		this.chartData = null;
		
		this.process();
	}
	
	process(){
		let controller = this;
		controller.getTreehouseAjaxContent().then((data) => {
			controller.fillInformation(data);
			controller.storeInformation(data).then(() => {
				controller.createPieChart().then(() => {
					$(window).resize(function() {
						if(this.resizeTO) clearTimeout(this.resizeTO);
						this.resizeTO = setTimeout(function() {
							$(this).trigger('resizeEnd');
						}, 250);
					});
					$(window).on('resizeEnd', function() {
						controller.resize();
					});
				});
			});
		}).catch((err) => {
			console.log(err);
			document.getElementById('donutchart').innerHTML = "An error occured while trying to request API, Please load browser and try again";
		});
	}
	
	resize(){
		// console.log("This event is firing...");
		this.chart.draw(this.chartData, this.chartOptions);
	}
	
	storeInformation(data){
		return new Promise((resolve) => {
			this.dataPoints = data.points;
			let value = [];
			
			for (let prop in this.dataPoints) {
				//console.log(`Property: ${prop} \n Value: ${points[prop]}`);
				if (this.dataPoints[prop] !== 0 && prop !== "total") {
					value = [prop, this.dataPoints[prop]];
					this.pieArray.push(value);
				}
			}
			resolve();
		});
	}
	
	fillInformation(data){
		let badges = data.badges.length;
		let badge = data.badges[badges-1];
		document.getElementById('totalPoints').innerHTML = "Total Points: "+data.points.total;
		
		let html = '<img class="card-img card-img-top img-fluid" src="'+badge.icon_url+'" alt="Image of '+badge.name+' Badge" style="margin-left:25%; max-width:50%; max-height:auto;">' +
			'<div class="card-body"><h5 class="card-title">Date Earned: '+new Date(badge.earned_date).toDateString()+'</h5>' +
			'</div>'+
			'<ul class="list-group list-group-flush"><li class="list-group-item">Total Badges Earned to Date: '+badges+'</li></ul>'+
			'<div class="card-body"><div class="row">';
		
		for(let i=0; i<badge.courses.length; i++){
			html += '<div class="col-md-6"><a href="'+badge.courses[i].url+'">'+badge.courses[i].title+'</a></div>';
		}
		html += '</div>';
		
		document.getElementById('treehouseBadge').innerHTML = html;
	}
	
	createPieChart(){
		return new Promise((resolve) => {
			let controller = this;
			google.charts.load('current', {'packages':['corechart']});
			google.charts.setOnLoadCallback(drawChart);
			
			function drawChart() {
				controller.chartData = google.visualization.arrayToDataTable(controller.pieArray);
				controller.chartOptions = {
					title: 'My Treehouse Point Breakdown',
					pieHole: 0.4,
				};
				controller.chart = new google.visualization.PieChart(document.getElementById('donutchart'));
				controller.chart.draw(controller.chartData, controller.chartOptions);
				resolve();
			}
		});
	}
	
	
	getTreehouseAjaxContent(){
		return new Promise((resolve, reject) => {
			let url = 'https://teamtreehouse.com/justinschellenberg.json';
			const get = $.get(url);
			get.done((data) => {
				resolve(data);
			});
			get.fail((err) => {
				reject(err);
			});
		});
	}
}