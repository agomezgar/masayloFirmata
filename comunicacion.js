const { ipcRenderer } = require('electron')
const ipc=ipcRenderer
var remote = require('electron').remote
var sp=require('serialport')
const {BrowserWindow}=remote
//elementos DOM página principal
const boton=document.getElementById("conecta")
const ic=document.getElementById("ic")
const i1=document.getElementById("i1")
const i2=document.getElementById("i2")
const dc=document.getElementById("dc")
const d1=document.getElementById("d1")
const d2=document.getElementById("d2")
const iri=document.getElementById("iri")
const ird=document.getElementById("ird")
const ust=document.getElementById("ust")
const use=document.getElementById("use")
const enci=document.getElementById("enci")
const encd=document.getElementById("encd")
const brazo=document.getElementById("brazo")
const cabeza=document.getElementById("cabeza")
const zumbador=document.getElementById("zumbador")
const adelante=document.getElementById("adelante")
const atras=document.getElementById("atras")
const izquierda=document.getElementById("izquierda")
const derecha=document.getElementById("derecha")
var vAdelante=document.getElementById("vAdelante")
var vAtras=document.getElementById("vAtras")
var vIzquierda=document.getElementById("vIzquierda")
var vDerecha=document.getElementById("vDerecha")
var imageniri=document.getElementById("imageniri")
var imagenird=document.getElementById("imagenird")
var valorBrazo=document.getElementById("valorBrazo")
var valorCabeza=document.getElementById("valorCabeza")
var posBrazo=document.getElementById("posBrazo")
var posCabeza=document.getElementById("posCabeza")

const puertoserie=document.getElementById("puertoserie")
var puertoSeleccionado,icontrol,dcontrol
window.addEventListener('DOMContentLoaded', () => {
   // boton=document.getElementById("conecta")
   // etiqueta=document.getElementById("informaConecta")
   console.log("valor: "+ic.value)
   sp.list().then(ports=>{
    var opt = document.createElement('option')
    opt.value = "com"
    opt.text = "Puerto"
    puertoserie.appendChild(opt)
    ports.forEach(function(port) {
        if (port.vendorId){
            var opt = document.createElement('option')
            opt.value = port.path
            opt.text = port.path
            puertoserie.appendChild(opt)
        }
    })
    localStorage.setItem("nb_com",ports.length)
    if (puertoserie.options.length > 1) {
        puertoserie.selectedIndex = 1
        localStorage.setItem("com",puertoserie.options[1].value)
    } else {
        localStorage.setItem("com","com")
    }
});
adelante.addEventListener('change',()=>{
  var  velocidad=adelante.value
  atras.value=0
  vAtras.innerHTML=0
  vIzquierda.innerHTML=0
  vDerecha.innerHTML=0
  izquierda.value=0
  derecha.value=0
    vAdelante.innerHTML=velocidad
    ipcRenderer.send("adelante",velocidad)
})
atras.addEventListener('change',()=>{
    var  velocidad=atras.value
    adelante.value=0
    izquierda.value=0
    derecha.value=0
    vAdelante.innerHTML=0
    vIzquierda.innerHTML=0
    vDerecha.innerHTML=0
      vAtras.innerHTML=velocidad
      ipcRenderer.send("atras",velocidad)
  })
  izquierda.addEventListener('change',()=>{
    var  velocidad=izquierda.value
    adelante.value=0
    atras.value=0
    derecha.value=0
    vAdelante.innerHTML=0
    vAtras.innerHTML=0
    vDerecha.innerHTML=0
      vIzquierda.innerHTML=velocidad
      ipcRenderer.send("izquierda",velocidad)
  })
  derecha.addEventListener('change',()=>{
    var  velocidad=derecha.value
    adelante.value=0
    atras.value=0
    izquierda.value=0
    vAdelante.innerHTML=0
    vAtras.innerHTML=0
    vIzquierda.innerHTML=0
      vDerecha.innerHTML=velocidad
      ipcRenderer.send("derecha",velocidad)
  })
  valorBrazo.addEventListener('change',()=>{

      posicion=valorBrazo.value
    posBrazo.innerHTML=posicion
      ipcRenderer.send("brazo",posicion)
  })
  valorCabeza.addEventListener('change',()=>{

    posicion=valorCabeza.value
  posCabeza.innerHTML=posicion
    ipcRenderer.send("cabeza",posicion)
})

    boton.addEventListener('click',()=>{
        console.log("click!")
        var datosRecogidos={
puerto:puertoserie.value,
icontrol:ic.value,
dcontrol:dc.value,
i1:i1.value,
i2:i2.value,
d1:d1.value,
d2:d2.value,
iri:iri.value,
ird:ird.value,
ust:ust.value,
use:use.value,
enci:enci.value,
encd:encd.value,
zumbador:zumbador.value,
cabeza:cabeza.value,
brazo:brazo.value

        }
    
      
        ipcRenderer.send("conectar",datosRecogidos)
    //    document.getElementById("etiqueta").textContent="ya"
    //     console.log("etiqueta"+etiqueta.text)
    //     ventanaSecundaria()
    })

}
    )
 
    ipcRenderer.on("cambia",()=>{
     
        boton.textContent="¡Conectado!"
        boton.disabled=true
        adelante.disabled=false
        atras.disabled=false
        izquierda.disabled=false
        derecha.disabled=false
        valorBrazo.disabled=false
        valorCabeza.disabled=false
    })
    ipcRenderer.on("iri",(event,data)=>{
        if (data==1) imageniri.src="./img/irinegro.png"
        if (data==0)imageniri.src="./img/iriblanco.png"
    })
    ipcRenderer.on("ird",(event,data)=>{
        if (data==1) imagenird.src="./img/irdnegro.png"
        if (data==0)imagenird.src="./img/irdblanco.png"
    })
    ipcRenderer.on("botonDerechoPresionado",()=>{
        botonDerecho.textContent="Manteniendo"

    })
    ipcRenderer.on("botonDerechoPulsado",()=>{
        botonDerecho.textContent="Pulsando"

    })
    ipcRenderer.on("botonDerechoLiberado",()=>{
        botonDerecho.textContent="Liberado"

    })
    ipcRenderer.on("botonIzquierdoPresionado",()=>{
        botonIzquierdo.textContent="Manteniendo"

    })
    ipcRenderer.on("botonIzquierdoPulsado",()=>{
        botonIzquierdo.textContent="Pulsando"

    })
    ipcRenderer.on("botonIzquierdoLiberado",()=>{
        botonIzquierdo.textContent="Liberado"

    })
    ipcRenderer.on("ejeX",(event,data)=>{
        ejeX.value=data
    })
    ipcRenderer.on("ejeY",(event,data)=>{
        ejeY.value=data
    })
    ipcRenderer.on("AcX",(event,data)=>{
        AcX.value=data
    })
    ipcRenderer.on("AcY",(event,data)=>{
        AcY.value=data
    })
    ipcRenderer.on("ldr",(event,data)=>{
        ldr.value=data
    })

