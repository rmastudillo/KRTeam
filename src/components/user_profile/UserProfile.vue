<script lang="ts" setup>
import { useUserStore } from "@/stores/userStore";
import { table } from "console";
import { onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const reservas = userStore.userBooking;

onBeforeMount(async () => {
  await userStore.getInfo();
  await userStore.getBooking();
});

const fields = ["Local", "Fecha y hora", "Mesa", " "];

const HandleButtonVerReserva = (
  id: number,
  local: string,
  mesa: number,
  people: number,
  start_time: string,
  end_time: string,
  for_smokers: boolean,
  status: string
) => {
  // Mostrar modal con confirmación
  verReserva(
    id,
    local,
    mesa,
    people,
    start_time,
    end_time,
    for_smokers,
    status
  );
};

const verReserva = (
  id: number,
  local: string,
  mesa: number,
  people: number,
  start_time: string,
  end_time: string,
  for_smokers: boolean,
  status: string
) => {
  // Hacer el fetch a la API
  const id_s = id.toString();
  const local_s = local.toString();
  const fumador = for_smokers.toString();
  router.push({
    path: "/reserva",
    query: {
      id: id_s,
      local: local,
      mesa: mesa,
      people: people,
      start_time: start_time,
      end_time: end_time,
      for_smokers: fumador,
      status: status,
    },
  });
};

const editarPerfil = () => {
  // Hacer el fetch a la API
};

const HandleButtonBorrarCuenta = () => {
  // Mostrar modal con confirmación
  borrarCuenta();
};

const borrarCuenta = async () => {
  try {
    const response = await fetch("http://35.232.169.75/api/v1/users/me", {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("Se ha eliminado la cuenta correctamente");
      router.push("/");
    } else {
      console.error("No se pudo eliminar la cuenta");
    }
  } catch (error) {
    console.error("Error tratando de borrar la cuenta:", error);
  }
};
</script>

<template>
  <div class="w-full">
    <h1 class="titulo">Perfíl</h1>
    <div id="infobox">
      <!-- <div class="datos">
        <h4>Usuario:</h4>
        <p> {{usuario}}   </p>
    </div> -->
      <div class="datos">
        <h4>Nombre Completo:</h4>
        <p>{{ userStore.user.full_name }}</p>
      </div>
      <div class="datos">
        <h4>Email:</h4>
        <p>{{ userStore.user.email }}</p>
      </div>
      <div class="datos">
        <div id="tablaLocales" class="containerTabla">
          <h2 class="nombreTabla">Reservas activas:</h2>
          <hr />
          <table class="tabla table" v-if="reservas.length !== 0">
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
                <td>{{ item.restobar_id }}</td>
                <td>{{ item.start_time }}</td>
                <td>{{ item.table_id }}</td>
                <td>
                  <button
                    @click="
                      HandleButtonVerReserva(
                        item.id,
                        item.restobar_id.toString(),
                        item.table_id,
                        item.people,
                        item.start_time.toString(),
                        item.end_time.toString(),
                        item.for_smokers,
                        item.status
                      )
                    "
                  >
                    Más información
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="botones">
        <!-- Se dejó un botón de editar perfíl por si se usa en el futuro -->
        <button class="hidden" @click="editarPerfil">Editar perfíl</button>
        <button @click="HandleButtonBorrarCuenta">Borrar cuenta</button>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.titulo {
  background: #72caba;
  padding: 1%;
  text-align: center;
  color: white;
}

#infobox {
  background: #72caba;
  border-radius: 10%;
  text-align: center;
  padding: 1%;
  width: 80%;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
}

@media screen and (min-width: 1024px) {
  #infobox {
    margin-top: 5%;
    width: 50%;
  }
}

#infobox p {
  margin: 2%;
  color: white;
}

@media screen and (min-width: 1024px) {
  #infobox p {
    font-size: 22px;
  }
}

.datos {
  margin: 5%;
}

#botones {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#botones button {
  margin-bottom: 2%;
  border-style: solid;
  border-width: 1px;
  background-color: lightgray;
  border-color: black;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

@media screen and (min-width: 1024px) {
  #botones button {
    width: 25%;
  }
}
</style>
