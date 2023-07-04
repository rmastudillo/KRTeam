<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const reserva = ref({
    local: '---',
    mesa: -1,
    people: -1,
    start_time: '---',
    end_time: '---',
    for_smokers: false,
    status: 'Pending',
});

const router = useRouter();

const route = useRoute();
const params = route.query;
const id = params.id;


// onMounted(async () => {
//     try {
//         const response = await fetch(`http://35.232.169.75/api/v1/reservations/${id}`);
//         if (response.ok) {
//             reserva.value = await response.json();
//         } else {
//             console.error('No se pudo obtener la información de la reserva');
//         }
//     } catch (error) {
//         console.error('Error tratando de obtener la información de la reserva:', error);
//     }
// });

onMounted(async () => {
    try {
        reserva.value.local = params.local ? params.local.toString() : reserva.value.local;
        reserva.value.mesa = params.mesa ? parseInt(params.mesa.toString(), 10) : reserva.value.mesa;
        reserva.value.people = params.people ? parseInt(params.people.toString(), 10) : reserva.value.people;
        reserva.value.start_time = params.start_time ? params.start_time.toString() : reserva.value.start_time;
        reserva.value.end_time = params.end_time ? params.end_time.toString() : reserva.value.end_time;
        reserva.value.for_smokers = params.for_smokers ? JSON.parse(params.for_smokers.toString()) : reserva.value.for_smokers;
        reserva.value.status = params.status ? params.status.toString() : reserva.value.status;

        const startDate = new Date(reserva.value.start_time);
        const endDate = new Date(reserva.value.end_time);

        const mes_inicio = String(startDate.getMonth()).padStart(2, '0');
        const dia_inicio = String(startDate.getDate()).padStart(2, '0');
        const hora_inicio = String(startDate.getHours()).padStart(2, '0');
        const minuto_inicio = String(startDate.getMinutes()).padStart(2, '0');
    
        const mes_fin = String(endDate.getMonth()).padStart(2, '0');
        const dia_fin = String(endDate.getDate()).padStart(2, '0');
        const hora_fin = String(endDate.getHours()).padStart(2, '0');
        const minuto_fin = String(endDate.getMinutes()).padStart(2, '0');

        reserva.value.start_time = `Fecha: ${dia_inicio}/${mes_inicio}  Hora: ${hora_inicio}:${minuto_inicio}`;
        reserva.value.end_time = `Fecha: ${dia_fin}/${mes_fin}  Hora: ${hora_fin}:${minuto_fin}`;

    } catch (error) {
        console.error(error);
    }
});

onUnmounted(() => {
    reserva.value = { 
    local: '',
    mesa: -1,
    people: -1,
    start_time: '---',
    end_time: '---',
    for_smokers: false,
    status: 'Pending',
}
});


const HandleButtonCancelarReserva = () => {
    // Mostrar modal con confirmación
    cancelarReserva()
}

const cancelarReserva = async () => {
    reserva.value.status = "Rejected";
    try {
        const response = await fetch(`http://35.232.169.75/api/v1/reservations/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(reserva.value)
        });
        if (response.ok) {
            console.log('Se ha cancelado la reserva correctamente');
            alert('Se ha cancelado la reserva correctamente');
            router.push('/')
        } else {
            console.error('No se pudo cancelar la reserva');
            alert('No se pudo cancelar la reserva');
        }
    } catch (error) {
        console.error('Error tratando de cancelar la reserva:', error);
    }
};

</script>

<template>
<div>
    <h1 class="titulo"> Información de la Reserva </h1>
    <div id="infobox">
        <div class="datos">
            <h4>Local:</h4>
            <p> {{ reserva.local }}   </p>
        </div>
        <div class="datos">
            <h4>Mesa:</h4>
            <p> {{ reserva.mesa }}   </p>
        </div>
        <div class="datos">
            <h4>Número de personas:</h4>
            <p> {{ reserva.people }}   </p>
        </div>
        <div class="datos">
            <h4>Fecha de inicio:</h4>
            <p> {{ reserva.start_time }}   </p>
        </div>
        <div class="datos">
            <h4>Fecha de finalización:</h4>
            <p> {{ reserva.end_time }}   </p>
        </div>
        <div class="datos">
            <h4>Para fumadores:</h4>
            <p> {{ reserva.for_smokers ? 'Si' : 'No' }}   </p>
        </div>
        <div class="datos">
            <h4>Estado de la solicitud:</h4>
            <p> {{ reserva.status }}   </p>
        </div>
        <div id="botones">
            <!-- Se dejó un botón de editar perfíl por si se usa en el futuro -->
            <button @click="HandleButtonCancelarReserva">Cancelar Reserva</button>
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
    margin: 3%;
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
    }
}

</style>