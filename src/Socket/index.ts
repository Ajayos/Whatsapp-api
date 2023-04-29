import { DEFAULT_CONNECTION_CONFIG } from '../Base'
import { UserFacingSocketConfig } from '../Types'
import { makeBusinessSocket as _makeSocket } from './business'


const makeWASocket = (config: UserFacingSocketConfig) => (
	_makeSocket({
		...DEFAULT_CONNECTION_CONFIG,
		...config
	})
)

export default makeWASocket