import React from 'react';
import { hot } from 'react-hot-loader';

declare interface Window {
  api: {
    send: (channel: string, ...arg: any) => void;
    receive: (channel: string, func: (event: any, ...arg: any) => void) => void;
    // https://github.com/frederiksen/angular-electron-boilerplate/blob/master/src/preload/preload.ts
    // https://www.electronjs.org/docs/all#ipcrenderersendtowebcontentsid-channel-args
    electronIpcSendTo: (window_id: string, channel: string, ...arg: any) => void;
    electronIpcSend: (channel: string, ...arg: any) => void;
    electronIpcOn: (channel: string, listener: (event: any, ...arg: any) => void) => void;
    electronIpcSendSync: (channel: string, ...arg: any) => void;
    electronIpcOnce: (channel: string, listener: (event: any, ...arg: any) => void) => void;
    electronIpcRemoveListener:  (channel: string, listener: (event: any, ...arg: any) => void) => void;
    electronIpcRemoveAllListeners: (channel: string) => void;
  }
}

// https://github.com/electron/electron/issues/21437#issuecomment-573522360


let filePath = '';

function App() {

  window.api.electronIpcOn("window-A-channel", (event, args) => {
    console.log("App_A-window.api.electronIpcOn-args: ", args);
    filePath = args;
  });

  window.api.electronIpcSend("from-window-A", "This is the Type-A-Window Talking!");

  console.log("filePath: ", filePath);

    return (
      <div className='container'>
        <h1 className='heading'>
            A-TYPE WINDOW
        </h1>
        
      </div>
    );
}

export default hot(module)(App);
