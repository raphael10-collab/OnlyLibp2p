import { app, BrowserWindow, ipcMain} from 'electron';
import fs from 'fs';
import path from 'path';
import url from 'url';

const fileUrl = require('file-url');

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow;
let WindowTypeA;
let WindowTypeB;


const createWindowTypeA = (): void => {
  WindowTypeA = new BrowserWindow({
    width: 900,
    height: 800,
    backgroundColor: '#242424',
    show: false,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  WindowTypeA.webContents.openDevTools();

  // https://ourcodeworld.com/articles/read/536/how-to-send-information-from-one-window-to-another-in-electron-framework

  WindowTypeA.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  WindowTypeA.on('close', function () {
    WindowTypeA.destroy()
  });
};


const createWindowTypeB = (): void => {

  WindowTypeB = new BrowserWindow({
    width: 900,
    height: 800,
    backgroundColor: '#242424',
    show: false,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  WindowTypeB.webContents.openDevTools();

  WindowTypeB.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  WindowTypeB.on('close', function () {
    WindowTypeB.destroy()
  });

};

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#242424',
    show: false,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.webContents.openDevTools();
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // Show window when its ready to
  mainWindow.on('ready-to-show', () => mainWindow.show());

};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }

  mainWindow = null;  
  WindowTypeA = null;
  WindowTypeB = null;
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// https://stackoverflow.com/questions/41629822/how-can-i-set-the-id-of-a-browser-window

ipcMain.handle("open-type-A-window", (IpcMainEvent, message) => {

  createWindowTypeA();
  
  WindowTypeA.loadURL('http://localhost:3000/main_window2');
  WindowTypeA.show();

  //mainWindow.webContents.send("window-A-id", WindowTypeA.id);

  // https://stackoverflow.com/questions/53753181/webcontents-send-and-ipcrenderer-on-not-working

  WindowTypeA.webContents.on('did-finish-load', function () {
    mainWindow.webContents.send('window-A-opened', 'ok');
  });

});


ipcMain.handle("open-type-B-window", (IpcMainEvent, message) => {

  createWindowTypeB();

  WindowTypeB.loadURL('http://localhost:3000/main_window3');
  WindowTypeB.show();

  // https://stackoverflow.com/questions/53753181/webcontents-send-and-ipcrenderer-on-not-working

  WindowTypeB.webContents.on('did-finish-load', function () {
    mainWindow.webContents.send('window-B-opened', 'ok');
  });


});


// https://ourcodeworld.com/articles/read/536/how-to-send-information-from-one-window-to-another-in-electron-framework

// https://stackoverflow.com/questions/43486438/electron-ipc-sending-data-between-windows?rq=1

let filepathUrl_A = '';

ipcMain.on("window-A-channel", (event, args) => {
  console.log("ipcMain.on-window-A-channel-args(mainProcess): ", args);
  filepathUrl_A = fileUrl(args[0]);
  console.log("ipcMain.on-filepathUrl_A = fileUrl(args[0]) : ", filepathUrl_A);
  WindowTypeA.webContents.send("window-A-channel", filepathUrl_A);
});

ipcMain.on("from-window-A", (event, args) => {
  console.log("ipcMain.on-from-window-A-args(mainProcess): ", args);
  mainWindow.webContents.send("from-window-A", args);
});


// https://github.com/electron/electron/issues/7193

//ipcMain.on('inter-window-message', (event, args) => {
  //let browserWindow = BrowserWindow.fromId(windowId);
  //browserWindow.webContents.send('inter-window-message', args);
//});
