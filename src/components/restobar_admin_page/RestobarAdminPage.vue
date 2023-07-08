<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore";
import { onMounted, ref } from "vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.getMyRestobarsBooking();
  // Obtener mesas
});

const mesas = ref<
  Array<{
    name: string;
    capacity: number;
    is_smoking_allowed: boolean;
    id: number;
    restobar_id: number;
    status: string;
  }>
>([]);

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

const fieldsMesas = ["Id", "Nombre", "Capacidad", "¿Se puede fumar?", "Estado", " "];
const fieldsReservas = ["Id", "Mesa", "Número de personas", "Fecha", "Hora", " "];


const inputNombre = ref();
const inputCapacidad = ref();
const inputFumadores = ref();

const crearMesa = async (event: any) => {
  // Llamar al post de mesas (falta el id del local)
}

const eliminarMesa = async (table_id: number) => {
  // Llamar al delete de mesas (falta el id del local)
}


</script>

<template>
  <h1 id="titulo">
    {{
      userStore.myRestobars
        ? ` ADMINISTRADOR RESTOBAR: ${userStore.myRestobars[0].name}`
        : "No hay restobares"
    }}
  </h1>
  <!-- Tabla de las mesas -->
  <div id="contenedorMesas" class="w-full">
    <form id="formMesa" class="w-full"  @submit="crearMesa">
      <h2 class="nombreTabla">Agregar una Mesa</h2>
      <div class="form-element">
        <p>Nombre de la mesa:</p>
        <input
          class="text"
          v-model="inputNombre"
          placeholder="Nombre de la mesa"
          required
        />
      </div>

      <div class="form-element">
        <p>Capacidad máxima de la mesa:</p>
        <input
          class="text"
          v-model="inputCapacidad"
          inputmode="numeric"
          pattern="[0-9]*"
          placeholder=""
          required
        />
      </div>

      <div class="form-element">
        <p>Mesa para fumadores?</p>
        <input type="checkbox" v-model="inputFumadores" />
      </div>

      <button
        type="submit"
        class="boton-crear-mesa"
        onclick="event => crearMesa(event)"
      >
        Crear Mesa
      </button>
    </form>
    <div id="tablaMesas" class="w-full">
      <h2 class="nombreTabla">Mesas del Restobar</h2>
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
              <th
                v-for="field in fieldsMesas"
              >
                {{ field }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Loop through the list get the each student data -->
            <tr v-for="item in mesas" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.capacity }}</td>
              <td>{{ item.is_smoking_allowed ? "Si" : "No"  }}</td>
              <td>{{ item.status }}</td>
              <td><button @click="eliminarMesa(item.id)">Eliminar mesa</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
  <!-- Tabla de las reservas -->
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
            <th
              v-for="field in userStore.managerRestobarBooking"
              :key="field.id"
            >
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

#contenedorMesas {
  @media screen and (min-width: 1024px) {
    display: flex;
    justify-content: center;
  }
}

#formMesa {
  text-align: center;
  @media screen and (min-width: 1024px) {
    width: 25%;
  }
}

#tablaMesas {
  @media screen and (min-width: 1024px) {
  width: 75%;
  }
}

.form-element {
  margin-top: 0%;
  margin-bottom: 1%;
}

.form-element p {
  margin-bottom: 5px;
}

.form-element .text {
  border: 2px solid black;
  padding: 1px 3px;
}

.boton-crear-mesa {
  border: 2px solid black;
  padding: 1px 3px;
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
