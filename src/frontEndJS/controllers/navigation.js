export default class NavigationController {
	constructor(){
		this.oldTotalHeight = null
		this.newTotalHeight = null;
		this.scrollSpy()
	}
	
	scrollSpy(){
		let controller = this;
		controller.setHTML('#Top', '#About');
		let top = document.getElementById('Top');
		let about = document.getElementById('About');
		let timeline = document.getElementById('Timeline');
		let projects = document.getElementById('Projects');
		let treehouse = document.getElementById('Treehouse');
		let contact = document.getElementById('Contact');
		$(window).on('scroll', (e) => {
			controller.newTotalHeight = top.offsetHeight; //Initialize our instance variables
			controller.oldTotalHeight = 0;
			
			controller.testNewHeight('#Top', '#About', top.offsetHeight, about.offsetHeight );
			controller.testNewHeight('#Top', '#Timeline', about.offsetHeight, timeline.offsetHeight );
			controller.testNewHeight('#About', '#Projects', timeline.offsetHeight, projects.offsetHeight );
			controller.testNewHeight('#Timeline', '#Treehouse', projects.offsetHeight, treehouse.offsetHeight );
			console.log(`OldTotalHeight: ${controller.oldTotalHeight} \n newTotalHeight: ${controller.newTotalHeight}\n windowScroll: ${window.scrollY}`);
			controller.testNewHeight('#Projects', '#Contact', treehouse.offsetHeight, contact.offsetHeight );
			
			if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) { //Special case when at bottom of document...
				controller.setHTML('#Treehouse', '#Contact');
			}
			
		});
	}
	testNewHeight(prevValue, nextValue, oldTotalHeightAdder, newTotalHeightAddition){
		let controller = this;
		if(window.scrollY + 10 >= controller.oldTotalHeight && window.scrollY + 10 < controller.newTotalHeight ){
			controller.setHTML(prevValue, nextValue);
		}
		controller.oldTotalHeight += oldTotalHeightAdder;
		controller.newTotalHeight += newTotalHeightAddition;
	}
	
	setHTML(prevScroll, nextScroll){
		let html = '<a data-scroll href="'+prevScroll+'"><span class="prev"></span></a>'+
			'<a data-scroll href="'+nextScroll+'"><span class="next"></span></a>';
		document.getElementById('scrollButtons').innerHTML = html;
	}
}