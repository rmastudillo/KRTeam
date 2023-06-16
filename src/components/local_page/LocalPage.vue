<script setup>
import imglocal from "@/assets/img/image3.jpg";
import imggps from "@/assets/img/ubi1.png";
import imggpslocal from "@/assets/img/local1.png";
import { onMounted, ref } from 'vue';
import L from 'leaflet';

const map = ref(null);

// Locales coordenadas
const locales = [
  { name: 'Local 1', coordinates: [ -33.53107140077256, -70.66385483116008] },
  { name: 'Local 2', coordinates: [-33.520897439872115, -70.65229264363981] },
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
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      map.value = L.map('mapid').setView([lat, lon], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map.value);

      // Añade un marcador para cada local
      locales.forEach((local) => {
        L.marker(local.coordinates, { icon: localIcon }).addTo(map.value)
          .bindPopup(local.name)
          .openPopup();
      });

      // Añade un marcador para la ubicación actual del usuario
      L.marker([lat, lon], { icon: gpsIcon }).addTo(map.value)
        .bindPopup('Tu Ubicación')
        .openPopup();
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

defineExpose({ map, imglocal });
</script>

<template>
  <div class="map-container">
    <div id="mapid"></div>
  </div>
  <div class="card" style=" width: 18rem;">
    <img :src="imglocal" class="card-img-top" alt="My Image">
    <div class="card-body">
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
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
  height: 200px;
  width: 100%;
  max-width: 800px; /* Ajusta esto al ancho máximo que prefieras */
}
</style>
