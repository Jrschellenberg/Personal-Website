export default class CloseMenuController {
	constructor(){
		this.process();
	}
	
	process(){
		$('.closeMenu').click(() => {
				console.log("This got clicked!!");
				$('#navbarsExample03').removeClass('show');
				$('#footerNav').removeClass('show');
			});
	}
}