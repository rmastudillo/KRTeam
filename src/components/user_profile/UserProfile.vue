<script lang="ts" setup>
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