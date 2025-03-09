import { DEFAULT_CONNECTION_CONFIG } from '../Base';
import { UserFacingSocketConfig } from '../Types';
import { makeBusinessSocket } from './business';

// export the last socket layer
const makeWASocket = (config: UserFacingSocketConfig) =>
	makeBusinessSocket({
		...DEFAULT_CONNECTION_CONFIG,
		...config,
	});

export default makeWASocket;
