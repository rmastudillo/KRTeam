<script lang="ts" setup>
import {
  deleteRestobarById,
  patchRestobarRequest,
  postRestobar,
} from "@/api/modules/common";
import { useUserStore } from "@/stores/userStore";
import { onMounted, ref } from "vue";

const userStore = useUserStore();

const isLoading = ref(true);

const getData = () => {
  userStore.adminGetRestobar();
  userStore.adminGetRestobarRequest();
};

onMounted(async () => {
  getData();
});

const fields1 = [
  "Id",
  "Nombre",
  "Región",
  "Comuna",
  "Dirección",
  "Número de local",
  "Número de mesas",
  "Acciones",
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

const handleDelete = async (id: number) => {
  try {
    await deleteRestobarById(id);
    alert(`Se eliminó el restobar correctamente`);
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.detail) {
      alert(`Ha ocurrido un error: ${error.response.data.detail}`);
    } else {
      alert(`Ha ocurrido un error: ${error.message}`);
    }
  }
  getData();
};

const handleReject = async (id: number) => {
  try {
    await patchRestobarRequest({ status: "Rejected" }, id);
    alert(`Se rechazó la solicitud`);
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.detail) {
      alert(`Ha ocurrido un error: ${error.response.data.detail}`);
    } else {
      alert(`Ha ocurrido un error: ${error.message}`);
    }
    console.log(error);
  }
  getData();
};

const handleAcept = async (item: any) => {
  try {
    const data = {
      name: item.name,
      address: item.address,
      unit_number: 1,
      commune: item.commune,
      region: item.region,
      menu_url: item.menu_url,
      owner_email: item.owner_email,
    };
    await postRestobar(data);
    await patchRestobarRequest({ status: "Accepted" }, item.id);
    alert(`Se aceptó la solicitud correctamente`);
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.detail) {
      alert(`Ha ocurrido un error: ${error.response.data.detail}`);
    } else {
      alert(`Ha ocurrido un error: ${error.message}`);
    }
  }
  getData();
};

onMounted(async () => {
  // Espera que terminen las dos peticiones para ocultar el spinner
  try {
    await Promise.all([
      userStore.adminGetRestobar(),
      userStore.adminGetRestobarRequest(),
    ]);
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
      <div class="accion"><button @click="getData">Refresh</button></div>
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
            <td>{{ item.tables.length }}</td>
            <!-- <td><button class="btn btn-secondary">EDITAR</button></td> -->
            <td>
              <button class="btn btn-danger" @click="handleDelete(item.id)">
                ELIMINAR
              </button>
            </td>
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
      <div class="accion"><button @click="getData">Refresh</button></div>
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
            <td v-if="item.status === 'Pending'">{{ item.id }}</td>
            <td v-if="item.status === 'Pending'">{{ item.name }}</td>
            <td v-if="item.status === 'Pending'">{{ item.region }}</td>
            <td v-if="item.status === 'Pending'">{{ item.commune }}</td>
            <td v-if="item.status === 'Pending'">{{ item.address }}</td>
            <td v-if="item.status === 'Pending'">{{ item.unit_number }}</td>
            <td v-if="item.status === 'Pending'">{{ item.owner_email }}</td>
            <td v-if="item.status === 'Pending'">{{ item.status }}</td>
            <td v-if="item.status === 'Pending'">
              <button class="btn btn-success" @click="handleAcept(item)">
                ACEPTAR</button
              ><button class="btn btn-danger" @click="handleReject(item.id)">
                RECHAZAR
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

.tabla button {
  margin-left: 1%;
  margin-right: 1%;
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
