import { Lokka } from 'lokka'
import { Transport } from 'lokka-transport-http'

const GRAPHQL_HTTP_ENDPOINT = 'http://localhost/graphql'
// const GRAPHQL_HTTP_ENDPOINT = 'https://yandex-rooms-graphql.herokuapp.com/graphql'

const client = new Lokka({
  transport: new Transport(GRAPHQL_HTTP_ENDPOINT)
})

export default client
