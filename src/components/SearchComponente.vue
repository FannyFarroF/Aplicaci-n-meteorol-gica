<template>
  <div class="box-search">
    <div class="container py-4">
      <div class="header-search text-end">
        <button @click="cerrarBuscador()">
          <span class="material-icons">
            close
          </span>
        </button>
      </div>
      <div class="form-search d-flex justify-content-between py-3">
        <div class="input d-flex align-items-center p-2 w-75 ">
          <span class="material-icons">
            search
          </span>
          <input
            class="w-100"
            type="text"
            placeholder="Buscar ubicación"
            v-model="city"
          />
        </div>
        <button class="btn" @click="buscarCiudad()">Buscar</button>
      </div>

      <div class="list-citys" v-show="hayData == true">
        <label for="" class="text-white py-3" v-show="eFormulario != ''">
          {{ eFormulario }}
        </label>
        <ul class="p-0 mt-4">
          <li
            v-for="(item, index) in datos"
            :key="index"
            class="mb-3 text-start"
            @click="buscarClimaCiudad(item.woeid)"
          >
            <div class="wrapper p-3">
              <p class="m-0">
                {{ item.title }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "SearchComponent",
    created() {},
    data() {
      return {
        cors_Url: "https://api.allorigins.win/raw?url=",
        api_url: "https://www.metaweather.com/api/location/",
        datos: [],
        city: "",
        eFormulario: "",
        hayData: false,
      };
    },
    props: {},
    watch: {
      city: function() {
        this.eFormulario = "";
        this.datos = [];
      },
    },
    methods: {
      cerrarBuscador() {
        this.$emit("cerrarBuscador", false);
        this.limpiarBuscador();
      },
      buscarCiudad() {
        if (this.city != "") {
          this.datos = [];
          this.eFormulario = "";
          axios
            .get(`${this.cors_Url}${this.api_url}search/?query=${this.city}`)
            .then((response) => {
              this.hayData = true;

              if (response.data.length == 0) {
                let msj = "No se encontraron resultados";
                this.eFormulario = msj;
              } else {
                this.datos = response.data;
              }

              // console.log(`RESPONSE ${JSON.stringify(this.datos)}`);
            })
            .catch((error) => console.log("Error", error));
        } else {
          console.log("Campo vacío... error");
        }
      },
      buscarClimaCiudad(ciudad) {
        // console.log(`Ciudad elegida -- HIJO: ${ciudad}`);

        // (1) Se envía la ciudad elegida al componente padre
        this.$emit("ciudadElegida", ciudad);

        // (2) Limpiar el formulario
        this.limpiarBuscador();
      },
      limpiarBuscador() {
        this.datos = [];
        this.city = "";
      },
    },
  };
</script>

<style lang="scss" scoped>
  button,
  button:focus {
    outline: none !important;
    box-shadow: none !important;
  }
  .header-search {
    button {
      color: #e7e7eb;
      border: 0;
      background: none;
    }
  }
  .form-search {
    .input {
      border: 1px solid #e7e7eb;
      margin-right: 10px;
      span {
        color: #616475;
        margin-right: 8px;
      }
      input {
        border: 0;
        background: none;
        outline: none;
        color: #fff;
      }
    }
    button {
      background: #3c47e9;
      border-radius: 0;
      color: #e7e7eb;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      width: 90px;
      outline: none;
    }
  }
  .list-citys {
    li {
      list-style: none;
      color: #fff;
      border: 1px solid transparent;
      transition: 0.5s all;
    }
    li:hover {
      border: 1px solid #616475;
    }
  }
</style>
