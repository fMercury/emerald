'use strict';
let request = require('request')

let NodeCache = require("node-cache");
let myCache = new NodeCache();

const emeraldURL = 'https://api.emerald-stay.fr/api/properties?';

exports.search = (req, res) => {
    let myURL = addSearchParams(req.query, new URL(emeraldURL))
    let value = myCache.get(myURL.href);

    if (value != undefined) {
        const results = simplifySearch(value, req)
        res.send({
            results
        });
    }

    if (value == undefined) {
        console.log('------ request to original API')
        request({ url: myURL.href, json: true }, (error, response, body) => {
            if (error && response.statusCode === 500) {
                console.error(err.stack);
                return res.status(500).send('Hey, Something broke! :( ');
            }
            if (!error && response.statusCode === 200) {
                myCache.set(myURL.href, body.data.properties, 100000000)
                const results = simplifySearch(body.data.properties, req)
                res.send({
                    results
                });
            }
        })
    }
};

exports.feature = (req, res) => {
    let myURL = addSearchParams(req.query, new URL(emeraldURL))
    let value = myCache.get(myURL.href);

    if (value != undefined) {
        const results = showFeature(value, req)
        res.send({
            results
        });
    }

    if (value == undefined) {
        console.log('------ request to original API')
        request({ url: myURL.href, json: true }, (error, response, body) => {
            if (error && response.statusCode === 500) {
                console.error(err.stack);
                return res.status(500).send('Hey, Something broke! :( ');
            }
            if (!error && response.statusCode === 200) {
                myCache.set(myURL.href, body.data.properties, 100000000)
                const results = showFeature(body.data.properties, req)
                res.send({
                    results
                });
            }
        })
    }
};

function addSearchParams(query, url) {
    Object.keys(query).forEach((key) =>
        url.searchParams.append(key, query[key])
    );
    return url
}

function simplifySearch(properties, req) {
    const results = []
    properties.forEach((properties) => {
        results.push({
            id: properties.id,
            title: properties.title,
            main_image_text: properties.main_image_text,
            description: properties.description
        })
    })
    return results
}

function showFeature(properties, req) {
    let results = properties
        .filter(properties => properties.id == req.params.property_id)
        .map(feature => feature[req.params.some_feature])
    return results[0]
}
