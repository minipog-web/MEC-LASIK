'use strict'

// When run by Electron, 'electron' resolves to the built-in module
// When run by Node, it resolves to the path string - guard against that
const electronModule = require('electron')

if (typeof electronModule === 'string') {
  // Being run by plain Node - re-launch with the actual Electron binary
  const { execFileSync } = require('child_process')
  execFileSync(electronModule, [__filename], { stdio: 'inherit' })
  process.exit(0)
}

const { app, BrowserWindow } = electronModule
const path = require('path')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    title: 'LASIK Journey - Marano Eye Care',
    backgroundColor: '#0a0f16',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    show: false
  })

  mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'))
  mainWindow.once('ready-to-show', () => mainWindow.show())
  mainWindow.setMenuBarVisibility(false)
  mainWindow.on('closed', () => { mainWindow = null })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => { if (!mainWindow) createWindow() })
