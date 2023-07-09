<script lang="ts" setup>
import { patchRestobarRequest, postRestobar } from "@/api/modules/common";
import { useUserStore } from "@/stores/userStore";
import { onMounted , ref} from "vue";

const userStore = useUserStore();

const isLoading = ref(true);

onMounted(async () => {
  userStore.adminGetRestobar();
  userStore.adminGetRestobarRequest();
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

const handleReject = (id: number) => {
  try {
    patchRestobarRequest({ status: "Rejected" }, id);
  } catch (error) {
    console.log(error);
  }
};

const handleAcept = (item: any) => {
  try {
    console.log(item);
    const data = {
      name : item.name,
      address: item.address,
      unit_number: 1,
      commune: item.commune,
      region: item.region,
      menu_url: null,
      owner_email: "richard@skipo.io",
    }
    console.log(data, "stoy mandando esto")
    postRestobar(data);
  } 
  catch (error) {
    console.log(error);
  }
};

onMounted(async () => { // Espera que terminen las dos peticiones para ocultar el spinner
  try {
    await Promise.all([userStore.adminGetRestobar(), userStore.adminGetRestobarRequest()]);
  } catch (error) {
    console.error("Hubo un error al recuperar los datos: ", error);
  } finally {
    isLoading.value = false;
  }
});

</script>

<template>
  <div v-if="isLoading" class="overlay">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <h1 v-if="!isLoading" id="titulo">ADMINISTRADOR</h1>

  <div v-if="!isLoading" id="tablaLocales" class="w-full">
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
          <tr v-for="item in userStore.adminRestobar" :key="item.id">
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
  <div v-if="!isLoading" id="tablaReservas" class="w-full">
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
          <tr v-for="item in userStore.adminRestobarRequest" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.region }}</td>
            <td>{{ item.commune }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.unit_number }}</td>
            <td>{{ item.owner_email }}</td>
            <td>{{ item.status }}</td>
            <td>
              <button @click="handleAcept(item)">ACEPTAR</button
              ><button @click="handleReject(item.id)">RECHAZAR</button>
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
  width: 100%;
  overflow-x: auto;
}

.overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
