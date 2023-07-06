<script lang="ts" setup>
import { client } from "@/api/client";
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
let name = ref("");
let email = ref("");
let password = ref("");
let passwordConfirmation = ref("");

const register = async () => {
  if (password.value !== passwordConfirmation.value) {
    alert("Las contraseñas no coinciden");
    return;
  }

  try {
    const response = await client.post(
      `/signup?email=${email.value}&full_name=${name.value}&password=${password.value}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    userStore.setToken(response.data.access_token);
    userStore.setIsAppAdmin(response.data.is_superuser);
    userStore.setIsRestobarAdmin(response.data.is_restobar_owner);
    userStore.setIsLogged(true);
    alert("Registro exitoso!");
    if (response.data.is_superuser) router.push({ name: "Admin" });
    else {
      router.push({ name: "Local" });
    }
  } catch {
    alert("Registro exitoso!");
  }
};
</script>
<template>
  <section class="vh-min-100 w-full" style="background-color: #eee">
    <div id="container-register" class="container h-min-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Sign up
                  </p>

                  <form class="mx-1 mx-md-4">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          v-model="name"
                          type="text"
                          id="form3Example1c"
                          class="form-control"
                        />
                        <label class="form-label" for="form3Example1c"
                          >Tú Nombre</label
                        >
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          v-model="email"
                          type="email"
                          id="form3Example4c"
                          class="form-control"
                        />
                        <label class="form-label" for="form3Example3c"
                          >Email</label
                        >
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          v-model="password"
                          type="password"
                          id="form3Example4c"
                          class="form-control"
                        />
                        <label class="form-label" for="form3Example4c"
                          >Contraseña</label
                        >
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          v-model="passwordConfirmation"
                          type="password"
                          id="form3Example4c"
                          class="form-control"
                        />
                        <label class="form-label" for="form3Example4cd"
                          >Repite tu Contraseña</label
                        >
                      </div>
                    </div>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4 gap-2"
                    >
                      <p class="small fw-bold mt-2 pt-1 mb-0">
                        ¿Tienes cuenta?
                        <router-link :to="{ name: 'Login' }">
                          <a href="#!" class="link-danger">Iniciar Sesión</a>
                        </router-link>
                      </p>
                      <button
                        @click="register"
                        type="button"
                        class="btn btn-secondary btn-lg"
                      >
                        Registrarse
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    class="img-fluid"
                    alt="Sample image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
#container-register {
  padding-top: 3%;
  padding-bottom: 3%;
}
</style>
