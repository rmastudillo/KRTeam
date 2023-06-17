<script lang="ts" setup>
    import { onMounted, onUnmounted, reactive } from "vue";
    const usuario = "UserName"
    const nombre = "RealName"
    const email = "UserEmail"

    onMounted(() => {
        // Hacer el fetch de la info a la API
    });
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
</style>