const {app, BrowserWindow,ipcMain, webContents} = require('electron')
const path = require('path')
const masaylo=require("johnny-five")
const {mario, starWars,tetris,nevergonna,doorbell, jinglebells}=require('./songs.js')
var tarjeta,ic,i1,i2,motorIzq,motorDer,iri,ird,ust,use,cabeza,brazo
var conectado=false
var rojoOn=false
var verdeOn=false
var naranjaOn=false
var piezo
var mainWindow

function createWindow () {
    // Create the browser window.
     mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
       enableRemoteModule: true,nodeIntegration: true,contextIsolation: false
      }
    })
      // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()
    app.allowRendererProcessReuse = false
    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
  
  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })
  //Conexión de la tarjeta
  function conectar(datos){
    console.log("puerto en destino "+datos.puerto)
    console.log("ic "+datos.icontrol)
    console.log("dc "+datos.dcontrol)

    if (!conectado)try
     {tarjeta = new masaylo.Board({port: datos.puerto});}catch (error){
       console.log(error)
       mainWindow.webContents.send("errorConectando",error)
     }
    tarjeta.on("ready", () => {
        console.log('The board is ready!');

        tarjeta.repl=false
        
  //  ic=new masaylo.Led(datos.icontrol)
  //  i1=new masaylo.Led(datos.i1)
  //  i2=new masaylo.Led(datos.i2)
  //  i1.on()
  //  i2.off()
  motorIzq=new masaylo.Motor({
    pins: {
      pwm:datos.icontrol,
      dir:datos.i1,
      cdir: datos.i2 
    }
  });
  motorDer=new masaylo.Motor({
    pins: {
      pwm:datos.dcontrol,
      dir:datos.d1,
      cdir: datos.d2 
    }
  });
  cabeza=new masaylo.Servo(datos.cabeza)
  cabeza.to(90)
  brazo=new masaylo.Servo(datos.brazo)
  brazo.to(90)
  iri=new masaylo.Button(datos.iri)
  ird=new masaylo.Button(datos.ird)
  zumbador=new masaylo.Piezo(datos.zumbador)
  
  zumbador.play(jinglebells)
  iri.on("up",()=>{
    mainWindow.webContents.send("iri",0)
  })
  iri.on("down",()=>{
    mainWindow.webContents.send("iri",1)
  })
  ird.on("up",()=>{
    mainWindow.webContents.send("ird",0)
  })
  ird.on("down",()=>{
    mainWindow.webContents.send("ird",1)
  })





        mainWindow.webContents.send("cambia")
        conectado=true

       
  })
}
//Funciones de tarjeta
function adelante(velocidad){
  motorIzq.forward(velocidad)
  motorDer.forward(velocidad)
}
function derecha(velocidad){
  motorIzq.forward(velocidad)
  motorDer.reverse(velocidad)
}
function izquierda(velocidad){
  motorIzq.reverse(velocidad)
  motorDer.forward(velocidad)
}
function atras(velocidad){
  motorIzq.reverse(velocidad)
  motorDer.reverse(velocidad)
}
function daleRojo(){
    if (rojoOn==true){
        rojo.off()
        rojoOn=false
    }else{
        rojo.on()
        rojoOn=true
    }
}
function daleVerde(){
    if (verdeOn==true){
        verde.off()
        verdeOn=false
    }else{
        verde.on()
        verdeOn=true
    }
}
function daleNaranja(){
    if (naranjaOn==true){
        naranja.off()
        naranjaOn=false
    }else{
        naranja.on()
        naranjaOn=true
    }
}
function rgb(valor){
    rgbrojo.brightness(valor[0])
    rgbverde.brightness(valor[1])
    rgbazul.brightness(valor[2])
}
function tocaDo(){
  piezo.play({
    tempo: 150, // Beats per minute, default 150
    song: [ // An array of notes that comprise the tune
      [ "C4", 1 ], // Each element is an array in which 
      [ null, 4 ] 
    ]
  });
     
}
function tocaRe(){
  piezo.play({
    tempo: 150, // Beats per minute, default 150
    song: [ // An array of notes that comprise the tune
      [ "D4", 1 ], // Each element is an array in which 
      [ null, 4 ] 
    ]
  });      
}
function tocaMi(){
  piezo.play({
    tempo: 150, // Beats per minute, default 150
    song: [ // An array of notes that comprise the tune
      [ "E4", 1 ], // Each element is an array in which 
      [ null, 4 ] 
    ]
  });  
}
function tocaFa(){
  piezo.play({
    tempo: 150, // Beats per minute, default 150
    song: [ // An array of notes that comprise the tune
      [ "F#4", 1 ], // Each element is an array in which 
      [ null, 4 ] 
    ]
  });  
}
function tocaSol(){
    piezo.play({
        tempo: 150, // Beats per minute, default 150
        song: [ // An array of notes that comprise the tune
          [ "G4", 1 ], // Each element is an array in which 
          [ null, 4 ] ]
      });
}
function tocaLa(){
    piezo.play({
        tempo: 150, // Beats per minute, default 150
        song: [ // An array of notes that comprise the tune
          [ "A4", 1 ], // Each element is an array in which 
          [ null, 4 ] ]
      });
}
function tocaSi(){
    piezo.play({
        tempo: 150, // Beats per minute, default 150
        song: [ // An array of notes that comprise the tune
          [ "B4", 1 ], // Each element is an array in which 
          [ null, 4 ] ]
      });
}
function tocaDo2(){
    piezo.play({
        tempo: 150, // Beats per minute, default 150
        song: [ // An array of notes that comprise the tune
          [ "C5", 1 ], // Each element is an array in which 
          [ null, 4 ]  ]
      });
}
//Mensajes ipc
ipcMain.on("conectar",(event,data)=>{conectar(data)
})
ipcMain.on('adelante',(event,data)=>adelante(data))
ipcMain.on('atras',(event,data)=>atras(data))
ipcMain.on('izquierda',(event,data)=>izquierda(data))
ipcMain.on('derecha',(event,data)=>derecha(data))
ipcMain.on('cabeza',(event,posicion)=>{
  cabeza.to(posicion)
})
ipcMain.on('brazo',(event,posicion)=>{
  brazo.to(posicion)
})
  ipcMain.on('adelante',(event,data)=>adelante(data))
  ipcMain.on('atras',(event,data)=>atras(data))
  ipcMain.on('izquierda',(event,data)=>izquierda(data))
  ipcMain.on('derecha',(event,data)=>derecha(data))
ipcMain.on("rojo",()=>{
  if(conectado)daleRojo()
})
ipcMain.on("verde",()=>{
  if(conectado)  daleVerde()
 })
 ipcMain.on("naranja",()=>{
  if(conectado)  daleNaranja()
 })
 ipcMain.on("rgb",(event,arg)=>{

  if(conectado)rgb(arg)
     
 })
 ipcMain.on("tocaDo",()=>{

   if(conectado)  tocaDo();
 })
 ipcMain.on("tocaRe",()=>{

  if(conectado)  tocaRe();
})
ipcMain.on("tocaMi",()=>{

  if(conectado)  tocaMi();
}) 
ipcMain.on("tocaFa",()=>{

  if(conectado)  tocaFa();
})
 ipcMain.on("tocaSol",()=>{

  if(conectado)  tocaSol();
})
 ipcMain.on("tocaLa",()=>{

  if(conectado)  tocaLa();
})
 ipcMain.on("tocaSi",()=>{

  if(conectado)  tocaSi();
}) 
ipcMain.on("tocaDo2",()=>{

  if(conectado)  tocaDo2();
})