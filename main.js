const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

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


    mainWindow.on('closed', function(){
        app.quit();
    });
});

ipcMain.on('item:add', function(e, item){
    console.log(item);
    mainWindow.webContents.send('item:add',item);
   // addWindow.close();
});

//handle create Add Window

function createAddWindow()
{
    addWindow = new BrowserWindow({
        width: 500,
        height: 300,
        title: "Add Shopping item",
        backgroundColor: '#2e2c29',
       // resizable: false
    });
    //load html into window

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //garbage collection
    addWindow.on('closed',function(){
        addWindow = null;
    });
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
                accelerator: 'Ctrl+Q',
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

//if mac add empty object to menu

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

//add developer tool item if not in production

if(process.env.NODE_ENV !== 'production')
{
    mainMenuTemplate.push({
        label:'developer tools',
        submenu:[
            {
                label:'Toggle DevTools',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role:'reload'
            }
        ]
    });
}