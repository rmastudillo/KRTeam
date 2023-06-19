<script lang="ts" setup>
import restobarLanding from "@/assets/img/restobarLanding.svg";
import { ref } from "vue";

const campos = ref([
  { id: "name", label: "Nombre Restaurante", type: "text", valor: "" },
  { id: "address", label: "Dirección", type: "text", valor: "" },
  { id: "city", label: "Ciudad", type: "text", valor: "" },
  { id: "capacity", label: "Capacidad (personas)", type: "number", valor: "" },
  { id: "contactName", label: "Nombre de contacto", type: "text", valor: "" },
  { id: "email", label: "Correo", type: "email", valor: "" },
  { id: "phoneNumber", label: "Número de contacto", type: "tel", valor: "" },
]);
const handleSubmit = (e: any) => {
  e.preventDefault();
  console.log(e);
};
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
  <div class="bg-white w-full h-[10vh]"></div>
  <div class="form-main-container">
    <h2 class="form-title">
      ¿Te interesa usar ReservApppara para potenciar las visitas a tu
      restaurante?
    </h2>
    <h3 class="form-subtitle">
      Sin costo de inscripción o mensualidad. ¡Llena el formulario debajo y
      conversemos!
    </h3>
    <form @submit="handleSubmit" class="w-full">
      <div class="grid-container">
        <div v-for="(campo, index) in campos" class="form-floating">
          <input
            :type="campo.type"
            :id="campo.id"
            :key="index"
            v-model="campo.valor"
            class="form-control"
            required
          />
          <label :for="campo.id">{{ campo.label }}</label>
        </div>
      </div>
      <div class="inline-flex w-full justify-center px-[5%] lg:px-[10%]">
        <button
          type="submit"
          class="btn bg-white btn-lg text-center w-full lg:w-1/2"
        >
          <span class="mx-2 text-3xl">Enviar</span>
        </button>
      </div>
    </form>
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
}

@media screen and (min-width: 1024px) {
  .title {
    width: 768px;
    height: 304px;
    left: 337px;
    top: 186px;
    font-size: 66px;
    line-height: 98px;
  }
}

.sub-title {
  font-style: normal;
  font-size: 20px;
  text-align: center;
  width: 100%;
}

@media screen and (min-width: 1024px) {
  .sub-title {
    height: 63px;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
  }
}

@media screen and (min-width: 1536px) {
  .sub-title {
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
}

@media screen and (min-width: 1024px) {
  .title-container {
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
}

@media screen and (min-width: 1024px) {
  .title-black {
    width: auto;
    height: 90px;
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
}

@media screen and (min-width: 1024px) {
  .title-container-white {
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
}

@media screen and (min-width: 1024px) {
  .card-container {
    padding: 3%;
    justify-content: center;
  }
}

.grid-container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  width: 100%;
  padding-inline: 5%;
  margin-bottom: 5%;
}

@media screen and (min-width: 1024px) {
  .grid-container {
    margin-bottom: 2%;
    padding-inline: 10%;
    grid-row-gap: 20px;
    column-gap: 10%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, auto);
  }
}

.form-main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-inline: 5%;
  padding-block: 10%;
  background-color: #72caba;
}

@media screen and (min-width: 1024px) {
  .form-main-container {
    padding: 3%;
    justify-content: center;
  }
}

.form-title {
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 35px;
  text-align: center;
  color: #ffffff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

@media screen and (min-width: 1024px) {
  .form-title {
    font-size: 40px;
    line-height: 50px;
    width: 768px;
    height: 148px;
  }
}

.form-subtitle {
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  color: #ffffff;
}

@media screen and (min-width: 1024px) {
  .form-subtitle {
    font-size: 30px;
    line-height: 35px;
    width: 768px;
    height: 109px;
  }
}
</style>
