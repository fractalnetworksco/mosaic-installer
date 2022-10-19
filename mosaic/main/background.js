import { app, Tray, Menu, BrowserWindow, nativeImage } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd = process.env.NODE_ENV === 'production';
let tray = null;
let isQuiting;
var base64icon = "data:image/png;base64,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"

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('close', function (event) {
    if (!isQuiting) {
      event.preventDefault();
      mainWindow.hide();
      event.returnValue = false;
    }
  });
})().then(function () {
  tray = new Tray(nativeImage.createFromDataURL(base64icon));
  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        BrowserWindow.getAllWindows()[0].show();
      }
    },
    {
      label: 'Quit', click: function () {
        app.quit();
      }
    }
  ]));
});

app.on('window-all-closed', () => {
  app.quit();
});
app.on('before-quit', function () {
  isQuiting = true;
});
