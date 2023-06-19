<script lang="ts" setup>
import { ref } from "vue";

let email = ref("");
let password = ref("");

const url = "http://35.232.169.75/api/v1/login";

const login = async () => {
  const data = new URLSearchParams();
  data.append("grant_type", "");
  data.append("username", `${email.value}`);
  data.append("password", `${password.value}`);
  data.append("scope", "");
  data.append("client_id", "");
  data.append("client_secret", "");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });

  if (!response.ok) {
    alert(
      "Hubo un problema con el inicio de sesión porfavor verifica los datos ingresados"
    );
  } else {
    alert("Inicio de sesión exitoso!");
  }
};
</script>
<template>
  <section class="vh-min-100">
    <div class="container-fluid h-custom">
      <div
        class="row d-flex justify-content-center align-items-center h-min-100"
      >
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
          />
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form>
            <div class="divider d-flex align-items-center my-4">
              <p class="text-center fw-bold mx-3 mb-0">SIGN IN</p>
            </div>

            <!-- Email input -->
            <div class="form-outline mb-4">
              <input
                v-model="email"
                type="email"
                id="form3Example3"
                class="form-control form-control-lg"
                placeholder="Ingresa Correo electrónico"
              />
              <label class="form-label" for="form3Example3">
                Dirección de correo electrónico</label
              >
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <input
                v-model="password"
                type="password"
                id="form3Example4"
                class="form-control form-control-lg"
                placeholder="Ingresa Contraseña"
              />
              <label class="form-label" for="form3Example4">Contraseña</label>
            </div>

            <div class="d-flex justify-content-between align-items-center">
              <!-- Checkbox -->
              <div class="form-check mb-0"></div>
              <a href="#!" class="text-body">¿Olvidaste tu contraseña?</a>
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
              <button
                @click="login"
                type="button"
                class="btn btn-secondary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem"
              >
                Iniciar Sesión
              </button>
              <p class="small fw-bold mt-2 pt-1 mb-0">
                ¿No tienes cuenta?
                <a href="#!" class="link-danger">Registrate</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
.h-custom {
  height: calc(100% - 73px);
}
@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}
</style>
