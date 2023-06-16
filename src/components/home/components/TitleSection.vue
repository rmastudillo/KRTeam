<script lang="ts" setup>
import restobarLanding from "@/assets/img/restobarLanding.svg";
</script>
<template>
  <div class="title-container">
    <h1 class="title">
      Busca tus restobares cercanos a ti y reserva en menos de 5 minutos!
    </h1>
    <h2 class="sub-title">
      ¿Estás buscando un restobar cercano a ti? RerservApp esta a tu servicio,
      reserva con nosotros en sencillo pasos, tan solo regístrate, busca tu
      restaurant, reserva y listo!
    </h2>
    <button type="button" class="btn bg-white btn-lg text-center">
      <span class="mx-2 text-3xl">Reserva</span>
      <i class="bi bi-geo-alt-fill text-3xl" />
    </button>
  </div>
  <div class="title-container-white">
    <h2 class="title-black">
      Trabajamos con los mejores RestoBares de todo Chile
    </h2>
    <h3 class="sub-title">
      ¿De todo Chile? Si, de todo Chile. Dejanos sorprenderte con cada rincón de
      nuestro sitio web, descubre restauranes cercanos a ti, saltate los malo
      ratos en tiempos de espera y reserva con nosotros.
    </h3>
  </div>
  <div class="flex flex-col lg:flex-row lg:max-h-min">
    <div class="inline-flex justify-center">
      <img :src="restobarLanding" alt="My SVG Image" />
    </div>
    <div class="card-container flex-1">
      <h2 class="text-white text-5xl">¿5 minutos?</h2>
      <h3 class="sub-title">
        ReservApp te facilita las reservas para tu restauranes. Nuestro objetivo
        es que puedas ir a reservar de la manera más rápida y fácil para ti.
      </h3>
      <h3 class="sub-title">
        Solo permitenos saber tu ubicación actual, te mostraremos tus
        restauranes cercanos, selecciona el que más te gusta y reserva con
        nosotros!
      </h3>
    </div>
  </div>
</template>
<style lang="css" scoped>
.title {
  font-style: normal;
  font-weight: 600;
  font-size: 50px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media screen(lg) {
    width: 768px;
    height: 304px;
    left: 337px;
    top: 186px;
    font-style: normal;
    font-weight: 600;
    font-size: 66px;
    line-height: 98px;
  }
}
.sub-title {
  font-style: normal;
  font-size: 20px;
  text-align: center;
  width: 100%;
  @media screen(lg) {
    height: 63px;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
  }
  @media screen(2xl) {
    width: 935px;
  }
}
.title-container {
  padding-inline: 5%;
  padding-block: 10%;
  background-color: #72caba;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  @media screen(lg) {
    padding: 5%;
  }
}

.title-black {
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 50px;
  text-align: center;
  color: #000000;
  @media screen(lg) {
    width: auto;
    height: 90px;
    font-style: normal;
    font-weight: 600;
    font-size: 42px;
    line-height: 62px;
  }
}

.title-container-white {
  padding-inline: 5%;
  padding-block: 10%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  @media screen(lg) {
    padding: 5%;
  }
}
.card-container {
  padding-inline: 5%;
  padding-block: 10%;
  background-color: #72caba;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  @media screen(lg) {
    padding: 3%;
    justify-content: center;
  }
}
</style>
