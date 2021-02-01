declare module '*.css';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';


declare interface Window {
  "electron": {
      openNewWindow(): void;    
  },


  "api", {
      send: (channel, data) => {
          ipcRenderer.invoke(channel, data).catch(e => console.log(e))
      },
      receive: (channel, func) => {
        console.log("preload-receive called. args: ");
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      },
      // https://www.electronjs.org/docs/all#ipcrenderersendtowebcontentsid-channel-args
      electronIpcSendTo: (window_id: string, channel: string, ...arg: any) => {
        ipcRenderer.sendTo(window_id, channel, arg);  
      },
      // https://github.com/frederiksen/angular-electron-boilerplate/blob/master/src/preload/preload.ts
      electronIpcSend: (channel: string, ...arg: any) => {
        ipcRenderer.send(channel, arg);
      },
      electronIpcSendSync: (channel: string, ...arg: any) => {
        return ipcRenderer.sendSync(channel, arg);
      },
      electronIpcOn: (channel: string, listener: (event: any, ...arg: any) => void) => {
        ipcRenderer.on(channel, listener);
      },
      electronIpcOnce: (channel: string, listener: (event: any, ...arg: any) => void) => {
        ipcRenderer.once(channel, listener);
      },
      electronIpcRemoveListener:  (channel: string, listener: (event: any, ...arg: any) => void) => {
        ipcRenderer.removeListener(channel, listener);
      },
      electronIpcRemoveAllListeners: (channel: string) => {
        ipcRenderer.removeAllListeners(channel);
      }
  }
}
