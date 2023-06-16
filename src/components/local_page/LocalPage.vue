<template>
  <div id="mapid" style="height: 500px; width: 100%;"></div>
</template>

<script>
import { onMounted, ref } from 'vue';
import L from 'leaflet';

export default {
  setup() {
    const map = ref(null);

    onMounted(() => {
      map.value = L.map('mapid').setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map.value);

      L.marker([51.5, -0.09]).addTo(map.value)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
    });

    return { map };
  },
};
</script>

<style scoped>
#mapid { height: 180px; }
</style>
