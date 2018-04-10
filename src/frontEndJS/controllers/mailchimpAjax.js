import getFormData from 'get-form-data';
import Utils from '../utils';

export default class MailChimpAjaxController {
	constructor(){
		this.process();
	}
	
	process(){
		let controller = this;
		$(document).ready(() => {
			
			window.ParsleyValidator.addValidator('phonevalidator',
				function (value, requirement) {
					return $('#phone').intlTelInput('isValidNumber');
				}, 32)
				.addMessage('en', 'phonevalidator', 'Please Enter a Valid phone Number');
			$('#mailchimpForm').parsley();
			
			$('#mailchimpForm').submit((event) => {
				event.preventDefault();
				let $form = $('#mailchimpForm');
					$form.parsley().validate();
				
				if($form.parsley().isValid()){ //If form is valid do ajax post!
					let phoneNum = $("#phone").intlTelInput("getNumber");
					$("#phone").val(phoneNum);
					let	url = $form.attr("action"),
						form = document.querySelector('#mailchimpForm'),
						data = getFormData(form);
					controller.postEvent(url, data);
				}
			}).bind(this);
		});
	}
	
	postEvent(url, data){
		let controller = this;
		const posting = $.post(url, data);
		posting.done((data) => {

			if(data.status && data.status === 201){ //Went through correctly
				$('#mailChimpMessage').text(data.message);
				controller.handleAnimations(true);
			}
			else{
				$('#mailChimpMessage').text("Sorry but an error has occured, Please try again Later");
				controller.handleAnimations(false);
			}

		});
		posting.fail((data) => {
			let responseData = data.responseJSON;

			if(responseData.status && responseData.errorMessage &&
				responseData.message && responseData.status === 409){
				$('#mailChimpMessage').text(responseData.message);
				controller.handleAnimations(true);
			}
			else if(responseData.status && responseData.errorMessage){
				let htmlString = '<ul><li>Status: '+responseData.status+'</li>'+
					'<li>'+responseData.errorMessage+'</li>'
				$('#mailChimpMessage').html(htmlString);
				controller.handleAnimations(false);
			}
			else{
				$('#mailChimpMessage').text("Sorry but an error has occured, Please try again Later");
				controller.handleAnimations(false);
			}
		});
	}
	
	handleAnimations(fadeOut){
		let $message = $('#mailChimpMessage');
		$message.hide();
		$('#mailchimpForm').addClass('fadeOutRight');
		$message.bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
			$(this).removeClass("fadeInLeft");
			if(fadeOut) {
				Utils.sleep(3000).then(() => {
					$(this).addClass("fadeOut");
				});
			}
		}).addClass('fadeInLeft');
		$message.show();
	}
}
