const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let mainWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({icon:'public/favicon.ico', width: 800, height: 600,
        'node-integration': 'iframe', 'web-preferences': {'web-security': false},
        'allowDisplayingInsecureContent': true})

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'public/electron.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', function () {
        mainWindow = null
    })
    
    mainWindow.webContents.openDevTools({mode:'undocked'})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})

app.on('browser-window-created', function(e, window) {
    window.setMenu(null);
})