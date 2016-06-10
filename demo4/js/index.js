/*global $*/
'use strict';

/**
 * Example data
 * @type {Object.<string, Object.<string, (string|number)>[]>}
 */
let data = {
    "southwest": [
        {"name": "Baseline", "spots": 276},
        {"name": "Fallowfield", "spots": 1665},
        {"name": "Nepean Woods", "spots": 343},
        {"name": "Strandherd", "spots": 336}
    ],
    "west": [
        {"name": "Terry Fox", "spots": 515},
        {"name": "Canadian Tire Centre", "spots": 100},
        {"name": "Eagleson", "spots": 1216}
    ],
    "east": [
        {"name": "Trim", "spots": 1094},
        {"name": "Place d'Orléans", "spots": 571},
        {"name": "Telesat (Blair)", "spots": 20},
        {"name": "Jeanne d'Arc", "spots": 60},
        {"name": "Millennium", "spots": 151},
        {"name": "Ray Friel", "spots": 30}
    ],
    "southeast": [
        {"name": "Greenboro", "spots": 678},
        {"name": "Leitrim", "spots": 292},
        {"name": "Riverview", "spots": 400}
    ]
};

data = Object.values(data).reduce((arr, stations) => arr.concat(stations), []);

let categories = data.map(station => station.name);
let graphData = data.map(station => station.spots);

$('a[data-toggle="tab"]').on('shown.bs.tab', e => {
    if (e.target.hash !== '#graph') {
        return;
    }
    
    $('#graph-output').highcharts({
        chart: {type: 'bar'},
        title: {text: 'Park-and-Ride spots in urban transit areas'},
        legend: {enabled: false},
        tooltip: {enabled: false},
        subtitle: {text: 'Source: OC Transpo (octranspo.com)'},
        xAxis: {
            categories: categories
        },
        yAxis: {
            gridLineWidth: 0,
            lineWidth: 1,
            min: 0,
            title: {text: 'Number of spots'}
        },
        series: [{
            allowPointSelect: true,
            colorByPoint: true,
            data: graphData,
            dataLabels: {enabled: true}
        }]
    });
});