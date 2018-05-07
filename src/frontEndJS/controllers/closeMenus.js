export default class CloseMenuController {
	constructor(){
		this.process();
	}
	
	process(){
		$('.closeMenu').click(() => {
				$('#navbarsExample03').removeClass('show');
				$('#footerNav').removeClass('show');
			});
	}
}