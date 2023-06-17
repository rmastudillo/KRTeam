<script lang="ts" setup>
    import { onMounted, onUnmounted, reactive } from "vue";
    const usuario = "UserName"
    const nombre = "RealName"
    const email = "UserEmail"

    onMounted(() => {
        // Hacer el fetch de la info a la API
    });

    const editarPerfil = () => {
        // Hacer el fetch a la API
    }

    const borrarCuenta = () => {
        // Hacer el fetch a la API
    }

</script>

<template>
    <div>
      <h1 class="titulo"> Perfíl </h1>
      <div id="infobox">
        <div class="datos">
            <h4>Usuario:</h4>
            <p> {{usuario}}   </p>
        </div>
        <div class="datos">
            <h4>Nombre Completo:</h4>
            <p> {{nombre}}   </p>
        </div>
        <div class="datos">
            <h4>Email:</h4>
            <p> {{email}}   </p>
        </div>
        <div id="botones">
            <!-- Se dejó un botón de editar perfíl por si se usa en el futuro -->
            <button class="hidden" @click="editarPerfil">Editar perfíl</button> 
            <button @click="borrarCuenta">Borrar cuenta</button>
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