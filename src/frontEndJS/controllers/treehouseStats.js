
export default class TreehouseStatsController {
	constructor(){
		this.process();
	}
	
	process(){
		let controller = this;
		controller.getTreehouseAjaxContent().then((data) => {
			controller.createPieChart(data);
		});
	}
	
	createPieChart(data){
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(drawChart);
		
		function drawChart() {
			console.log(data);
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
			console.log(pieArray);
			
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