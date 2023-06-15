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
      <span class="mx-2">Reserva</span>
      <i class="bi bi-geo-alt-fill text-2x" />
    </button>
  </div>
</template>
<style lang="scss" scoped>
.title {
  font-style: normal;
  font-weight: 600;
  font-size: 50px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.sub-title {
  font-style: normal;
  font-size: 20px;
  text-align: center;
}
.title-container {
  padding: 5%;
  background-color: #72caba;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
