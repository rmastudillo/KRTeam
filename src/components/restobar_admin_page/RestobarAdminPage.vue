<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const reservas = ref<Array<{ 
    restobar: string,
    table: number,
    people: number,
    date: string,
    time: string,
    id: number,
    user_id: number,
}>>([]);

const fields = [
      'Id', 'Mesa', 'Número de personas', 'Fecha', 'Hora', ' '
    ]

</script>

<template>
    <h1 id="titulo">ADMINISTRADOR RESTOBAR</h1>
    
    <div id="tablaReservas" class="containerTabla">
        <h2 class="nombreTabla">Reservas</h2>
        <hr>
        <div class="accionesTabla">
            <div class="accion"><button>Refresh</button></div>
            <div class="accion"><button>Export reservas</button></div>
        </div>
        <table class="tabla table">
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
    </template>

<style lang="scss" scoped>
#titulo {
    background: #72caba;
    padding: 1%;
    text-align: center;
    color: white;
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
    margin-left: 0.5%;
    margin-right: 0.5%;
    text-align: center;
}

.containerTabla {
    margin-bottom: 10%;
}

</style>