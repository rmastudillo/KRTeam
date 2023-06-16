<script lang="ts" setup>
// import { BTable } from 'bootstrap-vue';

const fields1 = [
      'Username','Dirección','Ciudad','Capacidad','Nombre', 'Correo', ' '
    ]
const locales = [
  { Username: 'Kiara Nikkei', Dirección: 'Calle Sur #1242', Ciudad: 'Santiago', Capacidad: 25, Nombre: 'Pedro Hernández', Correo: 'phernan@hotmail.com', ' ': 'ICONO EDITAR' },
  { Username: 'Kiara Nikkei', Dirección: 'Calle Sur #1242', Ciudad: 'Santiago', Capacidad: 25, Nombre: 'Pedro Hernández', Correo: 'phernan@hotmail.com', ' ': 'ICONO EDITAR' },
];
const fields2 = [
      'Username','RestoBar','Mesa','Número de Personas','Fecha', 'Hora', 'Correo', 'Número', ' '
    ]
const reservas = [
  { Username: 'Kiara Nikkei', RestoBar: 'Kiara Nikkei', Mesa: 10, 'Número de Personas': 2, Fecha: '22-05-2023', Hora: '17:00', Correo: 'peni1234@hotmail.com', Número: '+56912345678', ' ': 'ICONO BASURERO' },
];

</script>

<template>
<h1 id="titulo">ADMINISTRADOR</h1>

<div id="tablaLocales" class="containerTabla">
    <h2 class="nombreTabla">Locales Activos</h2>
    <hr>
    <div class="accionesTabla">
        <div class="accion">Add user</div>
        <div class="accion">Add multiple user</div>
        <div class="accion">Refresh</div>
        <div class="accion">Export users</div>
    </div>
    <table class="tabla table">
    <thead>
        <tr>
        <!-- loop through each value of the fields to get the table header -->
        <th  v-for="field in fields1" :key='field' > 
            {{field}}
        </th>
        </tr>
    </thead>
    <tbody>
        <!-- Loop through the list get the each student data -->
        <tr v-for="item in locales" :key='item'>
        <td v-for="field in fields1" :key='field'>{{item[field]}}</td>
        </tr>
    </tbody>
    </table>
</div>
<div id="tablaReservas" class="containerTabla">
    <h2 class="nombreTabla">Reservas Activas</h2>
    <hr>
    <div class="accionesTabla">
        <div class="accion">Add</div>
        <div class="accion">Refresh</div>
        <div class="accion">Export reservas</div>
    </div>
    <table class="tabla table">
    <thead>
        <tr>
        <!-- loop through each value of the fields to get the table header -->
        <th  v-for="field in fields2" :key='field' > 
            {{field}}
        </th>
        </tr>
    </thead>
    <tbody>
        <!-- Loop through the list get the each student data -->
        <tr v-for="item in reservas" :key='item'>
        <td v-for="field in fields2" :key='field'>{{item[field]}}</td>
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