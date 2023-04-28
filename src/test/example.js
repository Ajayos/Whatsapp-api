"use strict";

const {useMultiFileAuthState,default: makeWASocket,DisconnectReason,fetchLatestBaileysVersion,makeCacheableSignalKeyStore,MessageRetryMap,downloadContentFromMessage,makeInMemoryStore } = require('../../lib');
let Ammu;

async function Start(options) {
  try {
    const path_ = options.path || process.cwd();
    const { state, saveCreds} = await useMultiFileAuthState(`${path_}/Authentication/Auth`);
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
        Start(this.options)
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