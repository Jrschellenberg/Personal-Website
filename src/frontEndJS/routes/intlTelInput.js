import InternationalTelInputController from '../controllers/intlTelInput';

export default function(ctx, next) {
	new InternationalTelInputController();
	next();
}