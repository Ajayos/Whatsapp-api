"use strict";

const {useMultiFileAuthState, useDBAuthState, default: makeWASocket,DisconnectReason,fetchLatestBaileysVersion,makeCacheableSignalKeyStore,MessageRetryMap,downloadContentFromMessage,makeInMemoryStore } = require('../../lib');
let Ammu;
function log(data) {
  console.log(data);
}
const sqlite3 = require('sqlite3').verbose();
const DB = new sqlite3.Database('./keerthana.sql', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {if (err) return console.error(err.message)});

async function Start(options) {
  try {
    const path_ = options.path || process.cwd();
    const { state, saveCreds} = await  useDBAuthState(DB);
    Ammu = makeWASocket({
      printQRInTerminal: true,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys),
      },
      patchMessageBeforeSending: (message) => {
        const requiresPatch = !!(
          message.buttonsMessage ||
          message.listMessage ||
          message.sendMessage ||
          message.templateMessage ||
          message.audioMessage ||
          message.videoMessage ||
          message.locationMessage ||
          message.contextInfo
        );
        if (requiresPatch) {
          message = {
            viewOnceMessage: {
              message: {
                messageContextInfo: {
                  deviceListMetadataVersion: 2,
                  deviceListMetadata: {},
                },
                ...message,
              },
            },
          };
        }
        return message;
      }
    });
    Ammu.ev.on('creds.update', async() => {
      await saveCreds()
    });
    Ammu.ev.on('qr.update', async() => {
      console.log('QR Updated')
    });
    Ammu.ev.on('new', async(is) => {
      if (is) {
        Start(options)
      }
    });
    Ammu.ev.process(
      async(events) => {
        if(events['creds.update']) {
          await saveCreds()
        }
        if(events['connection.update']) {
          const update = events['connection.update']
          const {
            connection,
            lastDisconnect,
          } = update
          if (lastDisconnect && lastDisconnect.reason === DisconnectReason.badSession) {
              log('Bad Session', "w");
          }
          if (connection === 'open') {
            log('Connected', "d");
          }
          if (connection === 'close') {
            log('Disconnected', "d");
            
          }
        }
      }
    )
  } catch (e) {
    log(e, "e");
  }
}
Start({path: process.cwd()})