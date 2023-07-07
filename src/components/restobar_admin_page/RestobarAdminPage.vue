<script lang="ts" setup>
import { ref, onMounted } from "vue";

const reservas = ref<
  Array<{
    restobar: string;
    table: number;
    people: number;
    date: string;
    time: string;
    id: number;
    user_id: number;
  }>
>([]);

// onMounted(async () => {
//   try {
//     const response = await fetch('http://35.232.169.75/api/v1/reservations/');
//     if (response.ok) {
//       reservas.value = await response.json();
//     } else {
//       console.error('No se pudo obtener las reservas');
//     }
//   } catch (error) {
//     console.error('Error tratando de obtener las reservas:', error);
//   }
// });

const fields = ["Id", "Mesa", "Número de personas", "Fecha", "Hora", " "];
</script>

<template>
  <h1 id="titulo">ADMINISTRADOR RESTOBAR</h1>

  <div id="tablaReservas" class="w-full">
    <h2 class="nombreTabla">Reservas</h2>
    <hr />
    <div class="accionesTabla">
      <div class="accion"><button>Refresh</button></div>
      <div class="accion"><button>Export reservas</button></div>
    </div>
    <div class="containerTabla">
      <table class="tabla table">
        <thead>
          <tr>
            <!-- loop through each value of the fields to get the table header -->
            <th v-for="field in fields" :key="field">
              {{ field }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through the list get the each student data -->
          <tr v-for="item in reservas" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.table }}</td>
            <td>{{ item.people }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.time }}</td>
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
}

@media screen and (min-width: 1024px) {
  .accionesTabla {
    font-size: 20px;
  }
  .tabla {
    font-size: 18px;
  }
}

.containerTabla {
  margin-bottom: 10%;
}
</style>

