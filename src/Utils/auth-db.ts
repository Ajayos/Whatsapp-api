import { proto } from '../Proto'
import {
	AuthenticationCreds,
	AuthenticationState,
	SignalDataTypeMap
} from '../Types'
import { initAuthCreds } from './auth-utils'
import { BufferJSON } from './generics'
import { DATABASE } from '../Base'


export const useDBAuthState = async(): Promise<{ state: AuthenticationState, saveCreds: () => Promise<void> }> => {
	const createTable = async(): Promise<void> => {
        const sql = `
          CREATE TABLE IF NOT EXISTS Authentication (
            FileName STRING PRIMARY KEY not null,
            DATA JSON not null
          )`;
        return new Promise((resolve, reject) => {
          DATABASE.run(sql, [], (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
    };

    const getAuth = async(name: any): Promise<any> => {
        try {
          await createTable();
          const sql = `SELECT * FROM Authentication WHERE FileName = ?`;
          return new Promise((resolve, reject) => {
            DATABASE.get(sql, [name], (err, row) => {
              if (err) {
                reject(err);
              } else {
                resolve(row);
              }
            });
          });
        } catch (err) {
          throw err;
        }
    };

    const setAuth = async (name: any, data: string): Promise<void> => {
        try {
                await createTable();
                const sql = `INSERT OR REPLACE INTO Authentication(FileName, DATA) VALUES (?, ?)`;
                return new Promise<any>((resolve, reject) => {
                  DATABASE.run(sql, [name, data], function (this: import("sqlite3").RunResult, err) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(this.lastID);
                    }
                  });
                });
              } catch (err) {
                throw err;
              }
    };
    async function deleteAllAuth() {
        try {
          await createTable();
          const sql = `DELETE FROM Authentication`;
          return new Promise((resolve, reject) => {
            return new Promise<number>((resolve, reject) => {
                DATABASE.run(sql, [], function (this: import("sqlite3").RunResult, err) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(this.lastID);
                  }
                });
              });
          });
        } catch (err) {
          throw err;
        }
    }
    async function deleteAuth(name: string) {
        try {
          await createTable();
          const sql = `DELETE FROM Authentication WHERE FileName = ?`;
          return new Promise((resolve, reject) => {
            return new Promise<number>((resolve, reject) => {
                DATABASE.run(sql, [name], function (this: import("sqlite3").RunResult, err) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(this.lastID);
                  }
                });
              });
          });
        } catch (err) {
          throw err;
        }
    }

    const writeData = (data: any, file: string) => {
        const flname = fixFileName(file);
        return setAuth(flname, JSON.stringify(data, BufferJSON.replacer));
    };

	const readData = async(file: string) => {
		try {
			const flname = fixFileName(file);
            const data_ = await getAuth(flname);
            const data = JSON.parse(data_.DATA, BufferJSON.reviver);
            return data
		} catch(error) {
			return null
		}
	}

	const removeData = async(file: string) => {
		try {
            return await deleteAuth(file);
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