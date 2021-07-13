import * as S from 'sanctuary'
import * as $ from 'sanctuary-def'

const response = {
  data: {
		keys: [
			{
				application_id: 1,
				client_key: "34rfdghj98u7ygtf23erf",
				client_secret: "uXAHpTpJoTyJnS1wY1nMki"
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
]) (response);

const clientSecret = S.pipe([
	S.gets (S.is ($.Array($.Object))) (['data', 'keys']),
  S.chain (S.head),
	S.chain (S.get (S.is ($.NonEmpty($.String))) ('client_secret')),
]) (response);

const validatedKeyAndSecret = S.sequence (S.Maybe) ({clientKey, clientSecret})

console.log({
	isApplicationKey: S.isJust (validatedKeyAndSecret),
	clientKey: S.maybe ('') (S.prop('clientKey')) (validatedKeyAndSecret),
	clientSecret: S.maybe ('') (S.prop('clientSecret')) (validatedKeyAndSecret)
})
