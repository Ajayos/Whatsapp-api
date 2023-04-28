import { proto } from '../Proto'
import {
	AuthenticationCreds,
	AuthenticationState,
	SignalDataTypeMap
} from '../Types'
import { initAuthCreds } from './auth-utils'
import { BufferJSON } from './generics'


/**
 * stores the full authentication state in a single folder.
 * Far more efficient than singlefileauthstate
 *
 * Again, I wouldn't endorse this for any production level use other than perhaps a bot.
 * Would recommend writing an auth state for use with a proper SQL or No-SQL DB
 * */
export const useChromeAuthState = async(): Promise<{ state: AuthenticationState, saveCreds: () => Promise<void> }> => {

    const writeData = (data: any, file: string) => {
        const flname = fixFileName(file);
        localStorage.setItem(file, JSON.stringify(data, BufferJSON.replacer));
        return data;
    };

	const readData = async(file: string) => {
		try {
			const data_ = localStorage.getItem(file);
            if(!data_) return null;
            const data = JSON.parse(data_, BufferJSON.reviver);
            return data
		} catch(error) {
			return null
		}
	}

	const removeData = async(file: string) => {
		try {
            return localStorage.removeItem(file);
		} catch{
            return  false;
		}
	}

	const fixFileName = (file?: string) => file?.replace(/\//g, '__')?.replace(/:/g, '-')

	const creds: AuthenticationCreds = await readData('keerthana') || initAuthCreds()

	return {
		state: {
			creds,
			keys: {
				get: async(type, ids) => {
					const data: { [_: string]: SignalDataTypeMap[typeof type] } = { }
					await Promise.all(
						ids.map(
							async id => {
								let value = await readData(`${type}-${id}`)
								if(type === 'app-state-sync-key' && value) {
									value = proto.Message.AppStateSyncKeyData.fromObject(value)
								}

								data[id] = value
							}
						)
					)

					return data
				},
				set: async(data) => {
					const tasks: Promise<any>[] = []
					for(const category in data) {
						for(const id in data[category]) {
							const value = data[category][id]
							const file = `${category}-${id}`
                            if(value) {
                                tasks.push(writeData(value, file))
                            } else {
                                tasks.push(removeData(file))
                            }
							//tasks.push(value ? writeData(value, file) : removeData(file))
						}
					}

					await Promise.all(tasks)
				}
			}
		},
		saveCreds: () => {
			return writeData(creds,'keerthana')
		}
	}
}