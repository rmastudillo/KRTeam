<script setup>
  import imglocal from "@/assets/img/image3.jpg";
  import { onMounted, ref } from 'vue';
  import L from 'leaflet';

  const map = ref(null);

  onMounted(() => {
    map.value = L.map('mapid').setView([51.505, -0.09], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map.value);

    L.marker([51.5, -0.09]).addTo(map.value)
      .bindPopup('Kiara Nikkei')
      .openPopup();
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
