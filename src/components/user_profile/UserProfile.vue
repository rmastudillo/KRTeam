<script lang="ts" setup>
import { table } from "console";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const usuario = ref({ 
    email: 'UserEmail',
    full_name: 'UserName',
    is_active: false,
    is_superuser: false,
    is_restobar_owner: false,
    id: 0,
    restobars: [],
});

const reservas = ref<Array<{ 
    people: number,
    start_time: Date,
    end_time: Date,
    for_smokers: boolean,
    id: number,
    user_id: number,
    table_id: number,
    restobar_id: number,
    status: string,
}>>([]);

const router = useRouter();

onMounted(async () => {
    try {
        const response = await fetch('http://35.232.169.75/api/v1/users/me');
        if (response.ok) {
            usuario.value = await response.json();
        } else {
            console.error('No se pudo obtener la información del usuario');
        }
    } catch (error) {
        console.error('Error tratando de obtener la información del usuario:', error);
    }
});

onMounted(async () => {
    try {
        const response = await fetch('http://35.232.169.75/api/v1/reservations/user/me');
        if (response.ok) {
            reservas.value = await response.json();
        } else {
            console.error('No se pudo obtener la información de las reservas');
            // Esto en caso de que no se logre obtener los datos para probar la página (SE DEBE BORRAR)
            reservas.value.push({
                people: 2,
                start_time: new Date('2023-07-04'),
                end_time: new Date('2023-07-05'),
                for_smokers: true,
                id: 0,
                user_id: 0,
                table_id: 5,
                restobar_id: 0,
                status: 'Pendiente',
            })
        }
    } catch (error) {
        console.error('Error tratando de obtener la información de las reservas:', error);
    }
});

const fields = [
      'Local', 'Fecha y hora', 'Mesa', ' '
    ]

onUnmounted(() => {
    usuario.value = { 
    email: 'UserEmail',
    full_name: 'UserName',
    is_active: false,
    is_superuser: false,
    is_restobar_owner: false,
    id: 0,
    restobars: [],
}
});

const HandleButtonVerReserva = (id: number, local: string, mesa: number, people: number, start_time: string, end_time: string, for_smokers: boolean, status: string) => {
    // Mostrar modal con confirmación
    verReserva(id, local, mesa, people, start_time, end_time, for_smokers, status)
}

const verReserva = (id: number, local: string, mesa: number, people: number, start_time: string, end_time: string, for_smokers: boolean, status: string) => {
    // Hacer el fetch a la API
    const id_s = id.toString();
    const local_s = local.toString()
    const fumador = for_smokers.toString();
    router.push({
        path: '/reserva',
        query: {
            id: id_s,
            local: local,
            mesa: mesa,
            people: people,
            start_time: start_time,
            end_time: end_time,
            for_smokers: fumador,
            status: status
        }
    });
}

const editarPerfil = () => {
    // Hacer el fetch a la API
}

const HandleButtonBorrarCuenta = () => {
    // Mostrar modal con confirmación
    borrarCuenta()
}

const borrarCuenta = async () => {
    try {
        const response = await fetch('http://35.232.169.75/api/v1/users/me', {
        method: 'DELETE',
        });
        if (response.ok) {
            console.log('Se ha eliminado la cuenta correctamente');
            router.push('/')
        } else {
            console.error('No se pudo eliminar la cuenta');
        }
    } catch (error) {
        console.error('Error tratando de borrar la cuenta:', error);
    }
};

</script>

<template>
<div>
    <h1 class="titulo"> Perfíl </h1>
    <div id="infobox">
    <!-- <div class="datos">
        <h4>Usuario:</h4>
        <p> {{usuario}}   </p>
    </div> -->
    <div class="datos">
        <h4>Nombre Completo:</h4>
        <p> {{ usuario.full_name }}   </p>
    </div>
    <div class="datos">
        <h4>Email:</h4>
        <p> {{ usuario.email }}   </p>
    </div>
    <div class="datos">
        <div id="tablaLocales" class="containerTabla">
            <h2 class="nombreTabla">Reservas activas:</h2>
            <hr>
            <table class="tabla table" v-if="reservas.length !== 0">
            <thead>
                <tr>
                <!-- loop through each value of the fields to get the table header -->
                <th  v-for="field in fields" :key='field' > 
                    {{field}}
                </th>
                </tr>
            </thead>
            <tbody>
                <!-- Loop through the list get the each student data -->
                <tr v-for="item in reservas" :key='item.id'>
                <td>{{ item.restobar_id }}</td>
                <td>{{ item.start_time }}</td>
                <td>{{ item.table_id }}</td>
                <td><button @click="HandleButtonVerReserva(item.id, item.restobar_id.toString(), item.table_id, item.people, item.start_time.toString(), item.end_time.toString(), item.for_smokers, item.status)">Más información</button></td>
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
    @media screen(lg) {
        margin-top: 5%;
        width: 50%;
        ;
    }
}

#infobox p {
    margin: 2%;
    color: white;
    @media screen(lg) {
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

#botones button{
    margin-bottom: 2%;
    border-style: solid;
    border-width: 1px;
    background-color: lightgray;
    border-color: black;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    @media screen(lg) {
        width: 25%;
        ;
    }
}

</style>