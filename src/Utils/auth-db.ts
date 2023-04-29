import { proto } from '../Proto'
import {
	AuthenticationCreds,
	AuthenticationState,
	SignalDataTypeMap
} from '../Types'
import { initAuthCreds } from './auth-utils'
import { BufferJSON } from './generics'
import { setDATA, getDATA, deleteDATA } from '@ajayos/nodedb'

export const useDBAuthState = async(): Promise<{ state: AuthenticationState, saveCreds: () => Promise<void> }> => {

  const writeData = (data: any, file: string) => {
    return setDATA('Authentication', file, JSON.stringify(data, BufferJSON.replacer));
  };

	const readData = async(file: string) => {
		try {
      const data_ = await getDATA('Authentication', file);
      const data = JSON.parse(data_, BufferJSON.reviver);
      return data;
		} catch(error) {
			return null;
		}
	}

	const removeData = async(file: string) => {
		try {
      return await deleteDATA('Authentication', file);
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
