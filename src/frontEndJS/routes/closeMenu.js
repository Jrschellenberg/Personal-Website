import CloseMenusController from '../controllers/closeMenus';

export default function(ctx, next) {
	new CloseMenusController();
	next();
}