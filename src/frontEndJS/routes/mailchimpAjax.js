import MailChimpAjaxController from '../controllers/mailchimpAjax';

export default function(ctx, next) {
	new MailChimpAjaxController();
	next();
}