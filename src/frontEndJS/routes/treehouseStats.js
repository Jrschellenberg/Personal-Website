import TreehouseStatsController from '../controllers/treehouseStats';

export default function(ctx, next) {
	new TreehouseStatsController();
	next();
}