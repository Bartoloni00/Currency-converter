window.addEventListener('DOMContentLoaded',()=>{//esto es para que el codigo JS se ejecute solo cuando el  HTML fue cargado
    const monedaUno   = document.getElementById('moneda-uno');
    const monedaDos   = document.getElementById('moneda-dos');
    const cantidadUno = document.getElementById('cantidad-uno');
    const cantidadDos = document.getElementById('cantidad-dos');
    const cambio      = document.getElementById('cambio');
    const paisMoneda1 = document.getElementById('paisMoneda1');
    const paisMoneda2 = document.getElementById('paisMoneda2');
    const btn         = document.getElementById('taza');

    const textoPaisMoneda = (data,select,parrafo)=>{
        data.forEach((divisa, index) => {
            if (divisa.code === select) {
                parrafo.innerText = `{data[index].code} es la moneda de {data[index].country}`;
            }
        });
    };
    //funcion que actualiza el texto indicando de que pais es cada moneda
    const paisMoneda = ()=>{
        const moneda_uno = monedaUno.value;
        const moneda_dos = monedaDos.value;
        fetch('items.json')
        .then(res=>res.json())
        .then((data)=>{
            textoPaisMoneda(data,moneda_uno,paisMoneda1);
            textoPaisMoneda(data,moneda_dos,paisMoneda2);
        })
        .catch(error=>console.error(error))
    }
    paisMoneda()
    
    //con esta funcion optimizamos el llamado a la API
    function debounce(fn, delay) {
        let timer;
        return function() {
          const args = arguments;
          const context = this;
          clearTimeout(timer);
          timer = setTimeout(function() {
            fn.apply(context, args);
          }, delay);
        };
      }
      
      // Función calculate con debounce en la cual llamamos a la api que sustenta nuestra app
      const calculate = debounce(() => {
        const moneda_uno = monedaUno.value;
        const moneda_dos = monedaDos.value;
        fetch(`https://v6.exchangerate-api.com/v6/0ec70334e53c4b790ba0607e/latest/${moneda_uno}`)
          .then(res => res.json())
          .then(data => {
            const taza = data.conversion_rates[moneda_dos];
            cambio.innerText = `1 ${moneda_uno} = {taza} ${moneda_dos}`;
            cantidadDos.value = (cantidadUno.value * taza).toFixed(2);

            // registrar la llamada a la API
            // registrarLlamadaAPI(`https://v6.exchangerate-api.com/v6/0ec70334e53c4b790ba0607e/latest/${moneda_uno}`, 'GET', data);
          })
          .catch(error => console.error(error))
      }, 500); // Delay de 500ms

    //   function registrarLlamadaAPI(url, metodo, datos) {
    //     // código para registrar la llamada a la API en una base de datos o en un archivo de registro
    //     console.log(`Llamada a la API: ${metodo} ${url}`, datos);
    //   }

    //deteccion de eventos
    monedaUno.addEventListener('change',calculate);
    monedaUno.addEventListener('change',paisMoneda);

    monedaDos.addEventListener('change',calculate);
    monedaDos.addEventListener('change',paisMoneda);

    cantidadUno.addEventListener('input',calculate);
    //Con esta funcion nos evitamos que el usuario pueda imprimir los valor negativos, signos + y puntos que pueden llevar a errores
    cantidadUno.addEventListener('keydown',(e)=>{
        if (e.key === '-' || e.key === '+' || e.key === '.') {
            e.preventDefault();
        }
    });
    cantidadDos.addEventListener('input',calculate);
    cambio.addEventListener('click',calculate)
    btn.addEventListener('click',()=>{
        const temp = monedaUno.value;
        monedaUno.value = monedaDos.value;
        monedaDos.value = temp; //en estas 3 lineas de codigo intercambiamos los valores de los select
        calculate();
        paisMoneda();
    })
    
    calculate();
    
});