import * as S from 'sanctuary';
import * as $ from 'sanctuary-def';
import * as R from 'ramda';

const { fromMaybe } = S;

// Get specified key from object or else set default value. Similar to R.propOr
const props = {
		data: {
		latitude: 73.56986,
		longitude: -43.986
	}
}

const getData = S.get (S.is($.Object)) ('data');
const getLatitude = S.pipe ([
	getData,
	S.chain (S.get (S.is($.Number)) ('latitude'))
]);
const getLongitude = S.pipe ([
	getData,
	S.chain (S.get (S.is($.Number)) ('longitude'))
])

const coordinates = {
	lat: fromMaybe (75) (getLatitude(props)),
	lng: fromMaybe (40)  (getLongitude(props))
}

console.log(coordinates);