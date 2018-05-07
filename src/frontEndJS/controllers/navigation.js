export default class NavigationController {
	constructor(){
		this.process();
	}
	
	process(){
		/*
		This functionality is to make dropdown show on hover rather than onClick.
		 */
		$('body').on('mouseenter mouseleave','.dropdown',function(e){
			var _d=$(e.target).closest('.dropdown');_d.addClass('show');
			setTimeout(function(){
				_d[_d.is(':hover')?'addClass':'removeClass']('show');
			},300);
		});
	}
}