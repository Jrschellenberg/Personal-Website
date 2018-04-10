import SideBarToggleConroller from '../controllers/sidebarToggle';

export default function(ctx, next) {
	new SideBarToggleConroller();
	next();
}