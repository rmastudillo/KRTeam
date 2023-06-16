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

    <div id="container-local" class="flex flex-col lg:flex-row lg:max-h-min">

      <div id="container-img" class="inline-flex justify-center">
        <img :src="imglocal" alt="My SVG Image" />
      </div>

      <div id="container-text1" class="card-container flex-1">
        <div id="container-text2" >
            <h2 id="tittlel">Kiara Nikei</h2>
            <div id="subtitlel">
              Tipo de comida: Japonesa <br>
              Comidas: Almuerzo, Cena <br>
              Acerca de: Experimenta los variados sabores de la gastronomía Nikkei y cocktelería de autor, en un ambiente muy lindo y acogedor.
            </div>
            <div id="button-container">
              <button id="button-reservar" type="button" class="btn btn-lg text-center">
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

#container-local{
  background-color:  black;
  margin-top: 5%;
  margin-bottom: 5%;
}


#container-img{
  padding: 3%;
}

#container-img img{
  padding: 4%;
  background-color: aliceblue;
  color: black;
}

#container-text1{
  padding: 3%;

}

#container-text2{
  background-color: aliceblue;
  padding-left: 4%;
  padding-top: 4%;
  padding-bottom: 4%;
}

#tittlel{
  width: 100%;
  height: 63.2px;
  font-family: 'Oswald';
  font-style: normal;
  font-weight: 600;
  font-size: 50px;
  line-height: 74px;
  color: #000000;
}

#subtitlel{
  width: 100%;
  height: 100%;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #303030;
  word-wrap: break-word;
}

#button-container{
  display: flex;
  justify-content: flex-end;
  padding-right: 5%;

}

#button-reservar{
  background-color: #C2C2C2;
  margin-top: 3%;
}

</style>
