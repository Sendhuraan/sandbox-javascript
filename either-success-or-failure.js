import * as S from 'sanctuary'
import * as $ from 'sanctuary-def'

const response = {
  data: {
		keys: [
			{
				application_id: 1,
				client_key: "34vgy789usxd6yh09iuj",
				client_secret: "mju9876tcvfghjko9085400kj987=="
			},
			{
				application_id: 2,
				client_key: "hello",
				client_secret: "hellosecret"
			}
		]
	}
}

const clientKey = S.pipe([
	S.gets (S.is ($.Array($.Object))) (['data', 'keys']),
  S.chain (S.head),
	S.chain (S.get (S.is ($.NonEmpty($.String))) ('client_key')),
	S.maybeToEither ('Error in key') 
]) (response);

const clientSecret = S.pipe([
	S.gets (S.is ($.Array($.Object))) (['data', 'keys']),
  S.chain (S.head),
	S.chain (S.get (S.is ($.NonEmpty($.String))) ('client_secret')),
	S.maybeToEither ('Error in secret') 
]) (response);

const validatedKeyAndSecret = S.sequence (S.Either) ({clientKey, clientSecret})

const onSuccess = (value) => {
	console.log({
		isApplicationKey: true,
		clientKey: S.prop ('clientKey') (value),
		clientSecret: S.prop ('clientSecret') (value),
		error: ''
	})
}

const onFailure = (value) => {
	console.log({
		isApplicationKey: true,
		clientKey: '',
		clientSecret: '',
		error: value
	})
}

S.either (onFailure) (onSuccess) (validatedKeyAndSecret)
