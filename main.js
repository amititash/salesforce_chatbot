const {app, BrowserWindow } = require('electron')
const electronOauth2 = require('electron-oauth2');
const Store = require('./store.js');

var config = {
    clientId: '3MVG9zlTNB8o8BA2DpqdcSqAZTFsacICrYjiufsF1uihjjori6KCXudpBoPzKHf0wHtolQeecRv.A06yD1ReA',
    clientSecret: '3732986225295619425',
    authorizationUrl: 'https://login.salesforce.com/services/oauth2/authorize',
    tokenUrl: 'https://login.salesforce.com/services/oauth2/token',
    useBasicAuthorizationHeader: false,
    redirectUri: 'https://www.getpostman.com/oauth2/callback'
};

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    token: null
  }
});
  
  let win
  
  function createWindow () {
    win = new BrowserWindow({width: 800, height: 600})
    win.loadFile('chat/index.html')
    // win.webContents.openDevTools()
    win.on('closed', () => {
      win = null
    })
  }
  
  app.on('ready', () => {
    const windowParams = {
      alwaysOnTop: true,
      autoHideMenuBar: true,
      webPreferences: {
          nodeIntegration: false
      }
    }
    // if(store.get('token') == null){
    //   openSalesForceLogin(windowParams);
    // } else {
      createWindow();
    //  }
  })

  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })

  function openSalesForceLogin(windowParams) {
    const options = {
      scope: '',
      accessType: 'application/json'
    };
  
    const myApiOauth = electronOauth2(config, windowParams);
  
    myApiOauth.getAccessToken(options)
      .then(token => {
        console.log("Token:-", token);
        store.set('token', token);
      }).then((token)=>{
        var request = require("request");
        var token = store.get('token');

        var options = { method: 'GET',
          url: 'https://na59.salesforce.com/services/data/v33.0/query',
          qs: { q: 'SELECT+name+from+Account' },
          headers: 
          { 'Postman-Token': '3fa88761-d87e-481a-a1e7-0a62291e978d',
            'Cache-Control': 'no-cache',
            Authorization: 'Bearer ' + token } };

        request(options, function (error, response, body) {
          if (error){ throw new Error(error)}
          if(response) { 
            createWindow() 
          }
        });      
      })
  }
