<script lang="ts" setup>
import imglocal from "@/assets/img/image3.jpg";
import imggpslocal from "@/assets/img/local1.png";
import imggps from "@/assets/img/ubi1.png";
import L, { LatLngLiteral } from "leaflet";
import { onMounted, ref, computed } from "vue";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";


const router = useRouter();
const modalReserva = ref();
const infoModal = ref();

interface Errors {
  duracion?: string;
}


// Variables del local
const Localname = ref('Presiona un Local!');  
const Localdirection = ref('');
const Localunit_number = ref(0);
const Localcommune = ref('');
const Localregion = ref('');
const Localmenu_url = ref('');
const Localid= ref(0);
const Localowner_id= ref(0);
const Localtables= ref([]);


const selectedDate = ref();
const startHour = ref<string>('');
const startMinute = ref<string>('');
const endHour = ref<string>('');
const endMinute = ref<string>('');
const textInput = ref();
const fumadores = ref<boolean>();
const errors = ref<Errors>({});

const fechaMinima = computed(() => {
  const fechaActual = new Date();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();
  return `${fechaActual.getFullYear()}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
});

const hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00'];
const availableMinutes = ['00', '15', '30', '45'];


const verificarDuracion = (startHour: number, startMinute: number, endHour: number, endMinute: number) => {
  let totalMinutos = 0;
  // Le sumo los minutos dada la diferencia de horas
  if (endHour - startHour > 0) {
    totalMinutos += (endHour - startHour) * 60
  } else {
    totalMinutos += (endHour - (startHour - 24)) * 60
  }
  // Le sumo los minutos dada la diferencia de minutos
  totalMinutos += (endMinute - startMinute)

  if (totalMinutos > 3 * 60) {
    // No más de 3 horas
    return false

  } else if (totalMinutos < 30) {
    // No menos de 30 min
    return false
  }

  return true
}


const crearReserva = (event: any) => {
  event.preventDefault();
  errors.value = {};
  
  if (!verificarDuracion(parseInt(startHour.value), parseInt(startMinute.value), parseInt(endHour.value), parseInt(endMinute.value))){
    errors.value.duracion = 'La duración de la reserva debe ser entre 30 minutos y 3 horas';
  }

  if (Object.keys(errors.value).length === 0) {
    alert("Solicitud aún no implementada")
    window.location.reload();
  }
};




const map = ref();
const solicitudes = ref<
  Array<{
    name: string;
    owner_email: string;
    address: string;
    unit_number: number;
    commune: string;
    region: string;
    status: string;
    id: number;
  }>
>([]);




const locales = [{
    name: "Pollos STEAKS ",
    address: "Tobalaba 13949",
    unit_number: 0,
    commune: "Peñalolén",
    region: "Metropolitana",
    menu_url: "",
    id: 1,
    owner_id: 3,
    tables: [],
    coordinates : []
},
  
{
    name: "Sandwichería STEAKS BURGER",
    address: "Tobalaba 1300",
    unit_number: 0,
    commune: "Peñalolén",
    region: "Metropolitana",
    menu_url: "",
    id: 2,
    owner_id: 3,
    tables: [],
    coordinates : []
  },
{
    name: "Pizzeria STEAKS BURGER",
    address: "Tobalaba 1200",
    unit_number: 0,
    commune: "Peñalolén",
    region: "Metropolitana",
    menu_url: "",
    id: 2,
    owner_id: 3,
    tables: [],
    coordinates : []
  }
];

let fetches = locales.map(local => {
  const fullAddress = `${local.address}, ${local.commune}, ${local.region}`;

  return fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddress)}&format=json`)
      .then(response => response.json())
      .then(data => {
          if (data && data.length > 0) {
              local.coordinates[0] = parseFloat(data[0].lat);
              local.coordinates[1]= parseFloat(data[0].lon);
          }
      });
});




// Define los iconos personalizados
const gpsIcon = L.icon({
  iconUrl: imggps,
  iconSize: [38, 70], // Tamaño del icono, puedes ajustarlo a tus necesidades
});

const localIcon = L.icon({
  iconUrl: imggpslocal,
  iconSize: [30, 30], // Tamaño del icono, puedes ajustarlo a tus necesidades
});

onMounted(async() => {


  try { // Obtener Los Locales
    const response = await fetch(
      "http://35.232.169.75/api/v1/restobars_requests/"
    );
    if (response.ok) {
      solicitudes.value = await response.json();
    } 
    
    else {
      console.error("No se pudo obtener las reservas");
    }
  } catch (error) {
    console.error("Error tratando de obtener las reservas:", error);
  }


  Promise.all(fetches).then(() => { // Esperamos que se transformen todas las direcciones en latitud, longitud
    modalReserva.value = new Modal(infoModal.value);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
          map.value = L.map("mapid").setView([lat, lon], 16);

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
          }).addTo(map?.value);

          // Añade un marcador para cada local
          locales.forEach((local) => {
            L.marker(
              {
                lat: local.coordinates[0],
                lng: local.coordinates[1],
              } as LatLngLiteral,
              { icon: localIcon }
            )
              .addTo(map?.value)
              .bindPopup(local.name)
              .on('click', () => { Localname.value = local.name; Localdirection.value = local.address, Localcommune.value  = local.commune, Localunit_number.value  = local.unit_number, Localregion.value  = local.region, Localmenu_url.value  = local.menu_url, Localid.value  = local.id, Localowner_id.value  = local.owner_id, Localtables.value  = local.tables}) // Cambia el título cuando se haga clic en el marcador
              .openPopup();
          });
        // Añade un marcador para la ubicación actual del usuario
        L.marker([lat, lon], { icon: gpsIcon })
          .addTo(map.value)
          .bindPopup("Tu Ubicación")
          .openPopup();
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });
});
</script>
<template>
<div
  class="modal fade"
  ref="infoModal"
  tabindex="-1"
  aria-hidden="true"
>
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="infoModalLabel">Crea tu reserva</h5>
        <button
          type="button"
          class="btn-close"
          @click="modalReserva.hide()"
          aria-label="Close"
        ></button>
      </div>
      <form @submit="crearReserva">
        <div class="modal-body">
            <div class="modal-element" id="contenedorCalendario">
              <p>Selecciona la fecha:</p>
              <input type="date" v-model="selectedDate" :min="fechaMinima" required>
            </div>
            <div class="modal-element" id="contenedorPersonas">
              <p>Número de personas:</p>
              <input class="text" v-model="textInput" inputmode="numeric" pattern="[0-9]*" placeholder="" required/>
            </div>
            <div id="elementosInferiores">
              <div class="modal-element">
                <p>Horario Inicio:</p>
                <div class="container">
                  <select v-model="startHour" class="select" required>
                    <option value="" disabled>Selecciona Hora</option>
                    <option v-for="hour in hours" :value="hour">{{ hour }} horas</option>
                  </select>
              
                  <select v-model="startMinute" class="select" required>
                    <option value="" disabled>Selecciona Minutos</option>
                    <option v-for="minute in availableMinutes" :value="minute">{{ minute }} minutos</option>
                  </select>
                </div>
              </div>

              <div class="modal-element">
                <p>Horario Finalización:</p>
                <div class="container">
                  <select v-model="endHour" class="select" required>
                    <option value="" disabled>Selecciona Hora</option>
                    <option v-for="hour in hours" :value="hour">{{ hour }} horas</option>
                  </select>
              
                  <select v-model="endMinute" class="select" required>
                    <option value="" disabled>Selecciona Minutos</option>
                    <option v-for="minute in availableMinutes" :value="minute">{{ minute }} minutos</option>
                  </select>
                </div>
              </div>
            </div>
          <span v-if="errors.duracion" class="error-message">{{ errors.duracion }}</span>
          <div class="modal-element" id="contenedorFumadores">
            <p>Mesa para fumadores?</p>
            <input type="checkbox" v-model="fumadores"/>
          </div>
          
        </div>
        <div class="modal-footer">
          <button
            type="submit"
            class="boton-crear-reserva"
          >
            RESERVAR
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  <div class="map-container">
    <div id="mapid"></div>
  </div>

  <div
    id="container-local"
    class="flex flex-col lg:flex-row lg:max-h-min w-full"
  >
    <div id="container-img" class="inline-flex justify-center">
      <img :src="imglocal" alt="My SVG Image" />
    </div>

    <div id="container-text1" class="card-container flex-1">
      <div id="container-text2">
        <h2 id="tittlel" v-text="Localname"></h2>
        <div id="subtitlel">
              <p v-text="`Nombre: ${Localname}`"></p>
              <p v-text="`Dirección: ${Localdirection}`"></p>
              <p v-text="`Comuna: ${Localcommune}`"></p>
              <p v-text="`Región: ${Localregion}`"></p>
          </div>

        <div id="button-container">
          <button
            id="button-reservar"
            type="button"
            class="btn btn-lg text-center"
            @click="modalReserva.show()"
          >
            <span class="mx-2 text-3xl">Reserva</span>
            <i class="bi bi-geo-alt-fill text-3xl"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  height: auto;
  width: 100%;
}

#mapid {
  height: 400px;
  width: 100%;
  max-width: 1250px; /* Ajusta esto al ancho máximo que prefieras */
}

#container-local {
  background-color: black;
  margin-top: 5%;
  margin-bottom: 5%;
}

#container-img {
  padding: 3%;
}

#container-img img {
  padding: 4%;
  background-color: white;
  color: black;
}

#container-text1 {
  padding: 3%;
}

#container-text2 {
  background-color: white;
  padding-left: 4%;
  padding-top: 4%;
  padding-bottom: 4%;

}

#tittlel {
  width: auto;
  height: auto;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 600;
  font-size: 50px;
  line-height: 74px;
  color: #000000;
}

#subtitlel {
  width: auto;
  height: auto;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #303030;
  word-wrap: break-word;
}

#button-container {
  display: flex;
  justify-content: flex-end;
  padding-right: 5%;
}

#button-reservar {
  background-color: #c2c2c2;
  margin-top: 3%;
}

.modal-dialog {
  overflow-y: auto;
}

#infoModalLabel {
  margin-left: auto;
}




.modal-body {
  text-align: center;
  @media screen(lg) {
    text-align: left;
  }
}

.modal-dialog p {
  margin-bottom: 0;
}

.modal-dialog .text {
  border: 1px solid black;
}

#contenedorCalendario {
  @media screen(lg) {
    display: flex;
    justify-content: center;
  }
}

#contenedorCalendario p {
  @media screen(lg) {
    margin-right: 2%;
  }
}

#contenedorPersonas {
  margin-top: 2%;
  @media screen(lg) {
    display: flex;
    justify-content: center;
  }
}

#contenedorPersonas p {
  @media screen(lg) {
    margin-right: 2%;
  }
}

#elementosInferiores {
  margin-top: 2%;
  text-align: center;
  @media screen(lg) {
    display: flex;
    justify-content: center; /* Centrar horizontalmente */
  }
}

#elementosInferiores .modal-element {
  @media screen(lg) {
    margin-left: 5%;
    margin-right: 5%;
  }
}

#contenedorFumadores {
  margin-top: 2%;
  @media screen(lg) {
    display: flex;
    justify-content: center;
  }
}

#contenedorFumadores p {
  @media screen(lg) {
    margin-right: 1%;
  }
}



.boton-crear-reserva {
  border: 2px solid black;
  width: 90%;
}
.modal-footer {
  justify-content: center;
}

.container {
  position: relative;
  height: 50%; /* Altura máxima deseada para el contenedor */
  overflow-y: auto;
  @media screen(lg) {
    display: flex;
  }
}

.select {
  overflow-y: auto;
  width: 150px;
  border: 1px solid black;
}
</style>
