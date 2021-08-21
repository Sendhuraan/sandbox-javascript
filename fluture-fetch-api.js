import * as sanctuary from 'sanctuary'
import { encaseP, fork } from 'fluture';
import fetch from 'node-fetch'
import {env as flutureEnv} from 'fluture-sanctuary-types'
import * as yup from 'yup'

const yupConfig = {
	strict: true,
	abortEarly: false
}

const S = sanctuary.create ({checkTypes: true, env: sanctuary.env.concat (flutureEnv)})

const validateRequest = (data) => {
	const schema = yup.object().shape({
		title: yup.string().required()
	});

	return schema.validate(data, yupConfig)
}

const invokeAPI = (data) => {
	const url = 'https://jsonplaceholder.typicode.com/posts'
	const options = {
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify(data)
	}
	return fetch(url, options)
}

const validateResponse = (data) => {
	const schema = yup.object().shape({
		id: yup.number().required()
	});

	return schema.validate(data, yupConfig)
}

const getOfferingId = S.pipe([
	encaseP (validateRequest),
  S.chain (encaseP (invokeAPI)),
  S.unchecked.chain (encaseP (res => res.json())),
	S.chain (encaseP (validateResponse)),
	S.map (res => res.id)
]);

const data = {
	title: 'foo',
	body: 'bar',
	userId: 1
}

fork
(e => console.error(e))
(response => console.log(response))
(getOfferingId(data));
