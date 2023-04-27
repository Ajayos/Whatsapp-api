import { Contact } from './Contact'

export type WAConnectionState = 'open' | 'connecting' | 'close'

export type ConnectionState = {
	connection: WAConnectionState
	lastDisconnect?: {
		error: Error | undefined
		date: Date
	}
	isNewLogin?: boolean
	qr?: string
	receivedPendingNotifications?: boolean
	legacy?: {
		phoneConnected: boolean
		user?: Contact
	}
	isOnline?: boolean
}