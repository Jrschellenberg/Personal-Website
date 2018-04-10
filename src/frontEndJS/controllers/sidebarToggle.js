export default class SideBarToggleController {
	constructor() {
		this.process();
	}
	
	process() {
		let $sidebar = $('#sidebar');
		let $sidebarCollapse = $('#sidebarCollapse');
		$(document).ready(function () {
			$('.sidebarToggler').on('click', (e) => {
				e.preventDefault();
				$sidebar.toggleClass('active');
				if ($sidebar.hasClass('active')) {
					$sidebarCollapse.show();
					$sidebarCollapse.animate({
						opacity: 1, // animate slideUp
						marginLeft: '0px' //Needs ot be 0 b/c this is end result!!
					}, 'fast', 'linear', function() {
					});
				}
				else { //left direction
					$sidebarCollapse.animate({
						opacity: 0, // animate slideUp
						marginLeft: '-200px'
					}, 'fast', 'linear', function() {
						$(this).hide();
					});
				}
			});
		});
	}
	
}