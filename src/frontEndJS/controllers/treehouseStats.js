
export default class TreehouseStatsController {
	constructor(){
		this.process();
	}
	
	process(){
		let controller = this;
		controller.getTreehouseAjaxContent().then((data) => {
			//console.log(data);
			controller.fillInformation(data);
			controller.createPieChart(data);
		}).catch((err) => {
			console.log(err);
			document.getElementById('donutchart').innerHTML = "An error occured while trying to request API, Please load browser and try again";
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
	
	createPieChart(data){
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);
		
		function drawChart() {
			let points = data.points;
			let pieArray = [["Points", "% of Total Points"]];
			let value = [];
			
			for (let prop in points) {
				//console.log(`Property: ${prop} \n Value: ${points[prop]}`);
				if (points[prop] !== 0 && prop !== "total") {
					value = [prop, points[prop]];
					pieArray.push(value);
				}
			}
			//console.log(pieArray);
			
			let chartData = google.visualization.arrayToDataTable(pieArray);
			let options = {
				title: 'My Treehouse Point Breakdown',
				pieHole: 0.4,
			};
			let chart = new google.visualization.PieChart(document.getElementById('donutchart'));
			chart.draw(chartData, options);
			
		}
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