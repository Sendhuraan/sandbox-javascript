import { of, from, mergeMap } from 'rxjs';
import * as yup from 'yup'

const yupConfig = {
	strict: true,
	abortEarly: false
}

const options = {
  token: 'eyuil97yhjkl956yujk',
	offeringId: 24473,
	tmk: 'MZ653'
}

const validateRequest = (options) => {
	const schema = yup.object().shape({
		token: yup.string(),
		offeringId: yup.number().required(),
		tmk: yup.string().required()
	});

	return from(schema.validate(options, yupConfig))
}

const invokeAPI = (options) => {
	return of({
		offerings: [
			{
				id: 24473,
				name: 'Chivas Regal',
				volume: '750mL'
			},
			{
				id: 28659,
				name: 'Jack Daniels',
				volume: '1L'
			}
		],
		session_uuid: 'u45rtgb90iuhhggoijhv=='
	})
}

const validateResponse = (response) => {
	const schema = yup.object().shape({
		offerings: yup.array().of(
			yup.object({
				id: yup.number().required(),
				name: yup.string(),
				volume: yup.string()
			})
		),
		session_uuid: yup.string().required()
	});

	return from(schema.validate(response, yupConfig))
}

of(options)
	.pipe(
		mergeMap(validateRequest),
		mergeMap(invokeAPI),
		mergeMap(validateResponse)
	)
	.subscribe({
		next: v => {
			console.log(v)
		},
		error: e => {
			console.log(e)
		}
	})

