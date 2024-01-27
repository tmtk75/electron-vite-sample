import { Menu, MenuItem, MenuItemConstructorOptions, shell, BrowserWindow, app } from 'electron'

const isMac = process.platform === 'darwin'

export function setupMenu(mainWindow: BrowserWindow) {
  const template: (MenuItemConstructorOptions | MenuItem)[] = [
    ...(isMac
      ? <MenuItemConstructorOptions[]>[
          {
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideOthers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' }
            ]
          }
        ]
      : []),
    {
      label: 'File',
      submenu: [
        isMac
          ? { role: 'close', accelerator: 'CmdOrCtrl+W' }
          : { role: 'quit', accelerator: 'CmdOrCtrl+W' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(<MenuItemConstructorOptions[]>(isMac
          ? [
              { role: 'pasteAndMatchStyle' },
              { role: 'delete' },
              { role: 'selectAll' },
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }]
              }
            ]
          : [
              { role: 'delete' },
              { type: 'separator' },
              { role: 'selectAll', accelerator: 'CmdOrCtrl+A' }
            ]))
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'togglefullscreen' },
        { role: 'zoom' },
        ...(<MenuItemConstructorOptions[]>(
          (isMac
            ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }]
            : [{ role: 'close' }])
        ))
        // {
        //   label: "Reload",
        //   accelerator: "CmdOrCtrl+Shift+R",
        //   click: () => mainWindow?.reload(),
        // },
      ]
    },
    {
      label: 'Go',
      submenu: [
        {
          label: 'Back',
          accelerator: 'CmdOrCtrl+[',
          click: function () {
            mainWindow?.webContents.goBack()
          }
        },
        {
          label: 'Forward',
          accelerator: 'CmdOrCtrl+]',
          click: function () {
            mainWindow?.webContents.goForward()
          }
        }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            await shell.openExternal('https://memodify.com')
          }
        }
      ]
    }
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}
