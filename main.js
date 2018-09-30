const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

// listen for the app to be ready 

app.on('ready', function(){

    mainWindow = new BrowserWindow({
        backgroundColor: '#2e2c29'
    });
    //load html into window

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }))

    //build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    //insert menu
    Menu.setApplicationMenu(mainMenu);
    mainWindow.show();
});

//handle create Add Window

function createAddWindow()
{
    addWindow = new BrowserWindow({
        width: 500,
        height: 500,
        title: "Add Shopping item",
        backgroundColor: '#2e2c29',
        resizable: false
    });
    //load html into window

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
}

//create menu item
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Add Item',
                click()
                {
                    createAddWindow();
                }
            },
            {
                label:'Quit',
                accelerator: 'a',
                click(){
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Edit'
    },
    {
        label: 'Print',
        accelerator: 'CmdOrCtrl+P',
        click: () => { console.log('time to print stuff') }
      }
];