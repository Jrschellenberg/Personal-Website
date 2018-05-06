import Middleware from '../middleware';
import route from 'page';
import CloseMenu from './closeMenu';
import TreehouseStats from './treehouseStats';

export default class Router extends Middleware {
    constructor() {
        super(route);
        this._bindRoutes();
        route.start({ click: false });
    }

    _bindRoutes() {
	    route('/', CloseMenu, TreehouseStats);
    }

    refresh() {
        route(window.location.pathname);
    }
}
