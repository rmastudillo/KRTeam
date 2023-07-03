<script setup>
import { ref } from 'vue';

const selectedHour = ref('');
const selectedMinute = ref('');
const hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00'];
const availableMinutes = ['00', '15', '30', '45'];
</script>

<template>
    <div class="container">
      <select v-model="selectedHour" class="select">
        <option value="" disabled>Selecciona Hora</option>
        <option v-for="hour in hours" :value="hour">{{ hour }}</option>
      </select>
  
      <select v-model="selectedMinute" class="select">
        <option value="" disabled>Selecciona Minutos</option>
        <option v-for="minute in availableMinutes" :value="minute">{{ minute }}</option>
      </select>
    </div>
  </template>

<style lang="css" scoped>
.container {
  position: relative;
  height: 50%; /* Altura máxima deseada para el contenedor */
  overflow-y: auto;
  @media screen(lg) {
    display: flex;
  }
}

.select {
  overflow-y: auto;
  width: 150px;
  border: 1px solid black;
}
</style>