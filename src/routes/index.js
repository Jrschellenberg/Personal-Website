const express = require('express');
const router = express.Router();

import Utils from './utils';


router.get('/',  (req, res) => {
	return Utils.renderView('page/index', { title: 'Home', navId: '#homeLink' }, req, res)
});

module.exports = router;
