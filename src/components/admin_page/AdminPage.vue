<script lang="ts" setup>
import { ref, onMounted } from "vue";

const locales = ref<
  Array<{
    name: string;
    address: string;
    unit_number: number;
    commune: string;
    region: string;
    menu_url: string;
    id: number;
    owner_id: number;
  }>
>([]);

onMounted(async () => {
  try {
    const response = await fetch("http://35.232.169.75/api/v1/restobars/");
    if (response.ok) {
      locales.value = await response.json();
    } else {
      console.error("No se pudo obtener los locales");
    }
  } catch (error) {
    console.error("Error tratando de obtener los locales:", error);
  }
});

const solicitudes = ref<
  Array<{
    name: string;
    owner_email: string;
    address: string;
    unit_number: number;
    commune: string;
    region: string;
    status: string;
    id: number;
  }>
>([]);

onMounted(async () => {
  try {
    const response = await fetch(
      "http://35.232.169.75/api/v1/restobars_requests/"
    );
    if (response.ok) {
      solicitudes.value = await response.json();
    } else {
      console.error("No se pudo obtener las reservas");
    }
  } catch (error) {
    console.error("Error tratando de obtener las reservas:", error);
  }
});

const fields1 = [
  "Id",
  "Nombre",
  "Región",
  "Comuna",
  "Dirección",
  "Número de local",
  " ",
];
const fields2 = [
  "Id",
  "Nombre",
  "Región",
  "Comuna",
  "Dirección",
  "Número de local",
  "Correo",
  "Estado de solicitud",
  " ",
];
</script>

<template>
  <h1 id="titulo">ADMINISTRADOR</h1>

  <div id="tablaLocales" class="w-full">
    <h2 class="nombreTabla">Locales Activos</h2>
    <hr />
    <div class="accionesTabla">
      <div class="accion"><button>Add user</button></div>
      <div class="accion"><button>Add multiple user</button></div>
      <div class="accion"><button>Refresh</button></div>
      <div class="accion"><button>Export users</button></div>
    </div>
    <div class="containerTabla">
      <table class="tabla table">
        <thead>
          <tr>
            <!-- loop through each value of the fields to get the table header -->
            <th v-for="field in fields1" :key="field">
              {{ field }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through the list get the each student data -->
          <tr v-for="item in locales" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.region }}</td>
            <td>{{ item.commune }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.unit_number }}</td>
            <td><button>ICONO EDITAR</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div id="tablaReservas" class="w-full">
    <h2 class="nombreTabla">Solicitudes de local</h2>
    <hr />
    <div class="accionesTabla">
      <!-- <div class="accion">Add</div> -->
      <div class="accion"><button>Refresh</button></div>
      <div class="accion"><button>Export solicitudes</button></div>
    </div>
    <div class="containerTabla">
      <table class="tabla table">
        <thead>
          <tr>
            <!-- loop through each value of the fields to get the table header -->
            <th v-for="field in fields2" :key="field">
              {{ field }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through the list get the each student data -->
          <tr v-for="item in solicitudes" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.region }}</td>
            <td>{{ item.commune }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.unit_number }}</td>
            <td>{{ item.owner_email }}</td>
            <td>{{ item.status }}</td>
            <td><button>ACEPTAR</button><button>RECHAZAR</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="css" scoped>
#titulo {
  background: #72caba;
  padding: 1%;
  text-align: center;
  color: white;
  width: 100%;
}
.nombreTabla {
  margin-top: 2%;
  margin-left: 2%;
  margin-right: 2%;
}

.accionesTabla {
  display: flex;
  margin-top: 1%;
  margin-left: 2%;
  margin-right: 2%;
  @media screen(lg) {
    font-size: 20px;
  }
}
.accion {
  margin-right: 2%;
}

.tabla {
  margin-top: 1%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 95%;
  border-collapse: collapse;
  font-size: 15px;
  @media screen(lg) {
    font-size: 18px;
  }
}

.containerTabla {
  margin-bottom: 10%;
  width: 100%;
  overflow-x: auto;
}
</style>
