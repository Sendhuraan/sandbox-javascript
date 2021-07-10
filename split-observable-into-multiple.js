import * as S from 'sanctuary';
import * as $ from 'sanctuary-def';
import * as R from 'ramda';
import { from } from 'rxjs';

const { fromMaybe } = S;

// Split data based on condition and subscribe to them individually
const shapes = [
	{
		type: 'circle',
		geometry: {
			center: [1, 1],
			radius: 1
		}
	},
	{
		type: 'polygon',
		geometry: {
			points: [
				[1, 1],
				[2, 2],
				[3, 3]
			]
		}
	},
	{
		type: 'circle',
		geometry: {
			center: [2, 2],
			radius: 1
		}
	}
];

const getGeometryByShape = R.compose
	(	R.map(R.map(R.prop('geometry')))
	,	R.groupBy(shape => R.concat(shape.type, 'Shapes'))
	);

const circles = S.pipe(
	[	getGeometryByShape
	,	S.get (S.is($.Array($.Object))) ('circleShapes')
	]
) (shapes);

const polygons = S.pipe(
	[	getGeometryByShape
	,	S.get (S.is($.Array($.Object))) ('polygonShapes')
	]
) (shapes);

const validCircles = fromMaybe ([]) (circles);
const validPolygons = fromMaybe ([]) (polygons);

from(validCircles)
	.subscribe(
		(value) => {
			console.log(value);
		}
	);

from(validPolygons)
	.subscribe(
		(value) => {
			console.log(value);
		}
	);
