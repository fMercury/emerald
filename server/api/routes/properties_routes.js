'use strict';

module.exports = function (app) {
    let properties = require('../controllers/properties_controllers');

    app.route('/api/v2/properties/:some_feature/:property_id/')
        .get(properties.feature)

    app.route('/api/v2/properties/')
        .get(properties.search)


};