<script lang="ts" setup>
import { patchReservations, postRanking } from "@/api/modules/common";
import { useUserStore } from "@/stores/userStore";
import { computed, onBeforeMount, ref } from "vue";

const userStore = useUserStore();
// const columnTitles = ['Id', ' Mesa', 'Número de persona', 'Fecha','Estado', 'Acción 1', 'Valoración', 'Acción 2']; 
const maxStars = 5;
const rating = ref(0);
const starClass = (star: any) => {
  return star <= rating.value ? 'bi-star-fill' : 'bi-star';
};

const data = computed(() => ({
  "score" : rating.value
}));
const setRating = (star:any) => {
  rating.value = star;
  

};



const getData = async () => {
  await userStore.getMyRestobarsBooking();
  if (userStore.userInfo.restobars.length > 0 && userStore.myRestobars) {
    await userStore.managerGetMyTables(userStore.myRestobars.id);
  }
};
onBeforeMount(async () => {
  await userStore.getInfo();
  // Obtener mesas
  await getData();
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

const fieldsMesas = [
  "Id",
  "Nombre",
  "Capacidad",
  "¿Se puede fumar?",
  "Estado",
  " ",
];
const fieldsReservas = [
  "Id",
  "Mesa",
  "Número de personas",
  "Fecha",
  "Estado",
  " ",
];

const inputNombre = ref();
const inputCapacidad = ref();
const inputFumadores = ref(false);

const crearMesa = async (event: any) => {
  event.preventDefault();

  const data = {
    name: inputNombre.value,
    capacity: inputCapacidad.value,
    is_smoking_allowed: !!inputFumadores.value,
  };
  try {
    await userStore.managerAddTable(userStore.myRestobars.id, data);
    alert("Se ha creado la mesa correctamente");
  } catch (error) {
    alert("Ha ocurrido un error al crear la mesa");
  }
  getData();

  // Llamar al post de mesas (falta el id del local)
};

const eliminarMesa = async (table_id: number) => {
  try {
    await userStore.managerDeleteTable(userStore.myRestobars.id, table_id);
    alert("Se ha eliminado la mesa correctamente");
  } catch (error) {
    alert("Ha ocurrido un error al eliminar la mesa");
  }
  getData();
};

const cancelBooking = async (item: any) => {
  try {
    const status = "Canceled";
    item.status = status;
    const { id, ...rest } = item;
    const data = {
      status: "Canceled",
      ...rest,
    };

    await patchReservations(data, Number(id));
    // Cancelar reserva
    console.log("Se ha cancelado la reserva correctamente");
    alert("Se ha cancelado la reserva correctamente");
  } catch (error) {
    alert("No se pudo cancelar la reserva");
    console.error("Error tratando de cancelar la reserva:", error);
  }
  getData();
};
</script>

<template>
  <h1 id="titulo">
    {{
      userStore.myRestobars
        ? ` ADMINISTRADOR RESTOBAR: ${userStore.myRestobars.name}`
        : "No hay restobares"
    }}
  </h1>
  <!-- Tabla de las mesas -->
  <div id="contenedorMesas" class="w-full">
    <form id="formMesa" class="w-full" @submit="crearMesa">
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
          type="number"
          min="0"
          required
        />
      </div>

      <div class="form-element">
        <p>Mesa para fumadores?</p>
        <input type="checkbox" v-model="inputFumadores" />
      </div>

      <button
        type="submit"
        class="boton-crear-mesa btn"
        @click="crearMesa($event)"
      >
        Crear Mesa
      </button>
    </form>
    <div id="tablaMesas" class="w-full">
      <h2 class="nombreTabla">Mesas del Restobar</h2>
      <hr />
      <div class="accionesTabla">
        <div class="accion"><button @click="getData">Refresh</button></div>
      </div>
      <div class="containerTabla">
        <table class="tabla table">
          <thead>
            <tr>
              <!-- loop through each value of the fields to get the table header -->
              <th v-for="field in fieldsMesas">
                {{ field }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Loop through the list get the each student data -->
            <tr v-for="item in userStore.managerMyTables" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.capacity }}</td>
              <td>{{ item.is_smoking_allowed ? "Si" : "No" }}</td>
              <td>{{ item.status }}</td>
              <td>
                <button class="btn btn-danger" @click="eliminarMesa(item.id)">
                  Eliminar mesa
                </button>
              </td>
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
      <div class="accion"><button @click="getData">Refresh</button></div>
      <div class="accion"><button>Export reservas</button></div>
    </div>
    <div class="containerTabla">
      <table class="tabla table">
        <thead>
          <tr>
            <!-- loop through each value of the fields to get the table header -->
            <th v-for="field in fieldsReservas" :key="field">
              {{ field }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through the list get the each student data -->
          <tr v-for="item in userStore.managerRestobarBooking" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.table_id }}</td>
            <td>{{ item.people }}</td>
            <td>{{ item.start_time }}</td>
            <td>{{ item.status }}</td>
            <td>
              <!-- <button class="btn btn-success">ACEPTAR</button> -->
              <button
                v-if="item.status !== 'Canceled'"
                class="btn btn-danger"
                @click="cancelBooking(item)"
              >
                Cancelar reserva
              </button>
            </td>
            <td>
              <div>
                  <h5>Calificación: {{ rating }}</h5>
                  <div>
                    <i
                      v-for="star in maxStars"
                      :key="star"
                      :class="starClass(star)"
                      @click="setRating(star)"
                    ></i>
                  </div>
                </div>
            </td>
            <td>
              <button
                class="btn btn-success"
                @click="postRanking(data,item.id)"
                >
                Valorar
              </button> 
            </td>
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
  padding: 1px 5px;
}

.boton-crear-mesa {
  background-color: lightgray;
  border-color: black;
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

.bi-star-fill,
.bi-star {
  color: #ffc107;
  font-size: 2rem;
  cursor: pointer;
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
