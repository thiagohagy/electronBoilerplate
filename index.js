const electron = require('electron');

const { app, BrowserWindow } = electron;

var fs =  require('fs');
var path =  require('path');

let mainWindow;

app.on('ready', function () {

    mainWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        resizeable: true,
        frame: true,
        'node-integration': true,
    });

    // mainWindow.openDevTools();

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.setMenu(null);

    mainWindow.on('close', function () {
        mainWindow = null;
    });

});
