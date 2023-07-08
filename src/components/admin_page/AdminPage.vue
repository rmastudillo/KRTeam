<script lang="ts" setup>
import { patchRestobarRequest, postRestobar } from "@/api/modules/common";
import { useUserStore } from "@/stores/userStore";
import { onMounted } from "vue";

const userStore = useUserStore();

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
  } catch (error) {
    console.log(error);
  }
};
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
</style>
