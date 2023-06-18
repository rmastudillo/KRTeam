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
  <section class="vh-100">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image">
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>

          <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0">SIGN IN</p>
          </div>

          <!-- Email input -->
          <div class="form-outline mb-4">
            <input type="email" id="form3Example3" class="form-control form-control-lg"
              placeholder="Ingresa Correo electrónico" />
            <label class="form-label" for="form3Example3"> Dirección de correo electrónico</label>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-3">
            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="Ingresa Contraseña" />
            <label class="form-label" for="form3Example4">Correo Electrónico</label>
          </div>



          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="button" class="btn btn-secondary btn-lg"
              style="padding-left: 2.5rem; padding-right: 2.5rem;">Iniciar Sesión</button>
            <p class="small fw-bold mt-2 pt-1 mb-0">¿No tienes cuenta? 
              <a href="#!" class="link-danger">Registrate</a>
            </p>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>
</template>

<style lang="css" scoped>
.divider:after,
.divider:before {
content: "";
flex: 1;
height: 1px;
background: #eee;
}
.h-custom {
height: calc(100% - 73px);
}
@media (max-width: 450px) {
.h-custom {
height: 100%;
}
}
</style>
