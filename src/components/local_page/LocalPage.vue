<script lang="ts" setup>
import imglocal from "@/assets/img/image3.jpg";
import imggpslocal from "@/assets/img/local1.png";
import imggps from "@/assets/img/ubi1.png";
import L, { LatLngLiteral } from "leaflet";
import { onMounted, ref, computed } from "vue";
import { Modal } from "bootstrap";
import selectorHorario from "./components/selectorHorario.vue";

const modalReserva = ref();
const infoModal = ref();

const selectedDate = ref();
const selectedTime = ref();
const textInput = ref();

const fechaMinima = computed(() => {
  const fechaActual = new Date();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();
  return `${fechaActual.getFullYear()}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
});


const crearReserva = () => {
};

const map = ref();

// Locales coordenadas
const locales = [
  { id: 1, name: "Local 1", coordinates: [-33.53107140077256, -70.66385483116008] },
  { id: 2, name: "Local 2", coordinates: [-33.520897439872115, -70.65229264363981] },
  // ... más locales
];

// Define los iconos personalizados
const gpsIcon = L.icon({
  iconUrl: imggps,
  iconSize: [38, 70], // Tamaño del icono, puedes ajustarlo a tus necesidades
});

const localIcon = L.icon({
  iconUrl: imggpslocal,
  iconSize: [30, 30], // Tamaño del icono, puedes ajustarlo a tus necesidades
});

onMounted(() => {
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
            <div id="elementosInferiores">
              <div class="modal-element">
                <p>Número de personas:</p>
                <input class="text" v-model="textInput" inputmode="numeric" pattern="[0-9]*" placeholder="" required/>
              </div>
              <div class="modal-element">
                <p>Horario:</p>
                <selectorHorario v-model="selectedTime" required/>
              </div>
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

  <div id="container-local" class="flex flex-col lg:flex-row lg:max-h-min">
    <div id="container-img" class="inline-flex justify-center">
      <img :src="imglocal" alt="My SVG Image" />
    </div>

    <div id="container-text1" class="card-container flex-1">
      <div id="container-text2">
        <h2 id="tittlel">Kiara Nikei</h2>
        <div id="subtitlel">
          Tipo de comida: Japonesa <br />
          Comidas: Almuerzo, Cena <br />
          Acerca de: Experimenta los variados sabores de la gastronomía Nikkei y
          cocktelería de autor, en un ambiente muy lindo y acogedor.
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
  width: 100%;
  height: 63.2px;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 600;
  font-size: 50px;
  line-height: 74px;
  color: #000000;
}

#subtitlel {
  width: 100%;
  height: 100%;
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

.boton-crear-reserva {
  border: 2px solid black;
  width: 90%;
}
.modal-footer {
  justify-content: center;
}
</style>
