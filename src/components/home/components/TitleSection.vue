<script lang="ts" setup></script>
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
  @media screen(lg) {
    width: 935px;
    height: 63px;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
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
</style>
