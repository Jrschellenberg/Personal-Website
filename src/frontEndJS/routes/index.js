import Middleware from '../middleware';
import route from 'page';
//import Countdown from './countdown';
//import ParsleyFormValidation from './parsleyFormValidation';
// import MailChimpAjax from './mailchimpAjax'
// import InternationalTelInput from './intlTelInput';


export default class Router extends Middleware {
    constructor() {
        super(route);
        this._bindRoutes();
        route.start({ click: false });
    }

    _bindRoutes() {
        //route('/', InternationalTelInput, MailChimpAjax);
    }

    refresh() {
        route(window.location.pathname);
    }
}
