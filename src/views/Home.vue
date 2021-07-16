<template>
  <div class="home">
    <div class="spinner" v-show="hayData == false">
      <div class="spinner-grow text-info"></div>
    </div>
    <div class="row content-home" v-show="hayData == true">
      <div class="sidernav p-0 position-relative">
        <SearchComponent
          v-on:ciudadElegida="buscarClimaCiudad($event)"
          v-on:cerrarBuscador="cerrarBuscador($event)"
          v-show="search == true"
        />

        <div v-show="search == false">
          <figure class="position-absolute w-100 background-sider">
            <img
              class=""
              src="../../public/images/Cloud-background.png"
              alt=""
              srcset=""
            />
          </figure>
          <div class="container py-4">
            <div
              class="w-100 d-flex justify-content-between align-items-center"
            >
              <div class="search">
                <button
                  class="px-2 text-center btn-search"
                  @click="showSearch()"
                  title="Buscar ciudades"
                >
                  Buscar lugares
                </button>
              </div>

              <div
                @click="getUbication()"
                class="icon-gps d-flex justify-content-center align-items-center"
                title="Ubicación actual"
              >
                <span class="material-icons-outlined">
                  gps_fixed
                </span>
              </div>
            </div>

            <figure class="py-5 my-5">
              <img
                :src="'images/' + weatherH.weather_state_abbr + '.png'"
                alt=""
              />
            </figure>

            <div>
              <p class="m-0 humidity">
                {{ Math.round(weatherH.min_temp)
                }}<span class="min">
                  {{ celsius == true ? "°C" : "°F" }}
                </span>
              </p>
            </div>

            <div class="pt-4 pb-5 weather_state_name">
              <h4>{{ weatherH.weather_state_name }}</h4>
            </div>

            <div
              class="d-flex flex-column align-items-center justify-content-center"
            >
              <div class="">
                <p class="p-0">Hoy | {{ weatherH.applicable_date }}</p>
              </div>
              <div class="d-flex align-items-center">
                <span class="material-icons-outlined">
                  location_on
                </span>
                <p class="my-0 mx-2">
                  {{ datosCity.title }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-main">
        <div class="container p-0">
          <div class="box-temp d-flex justify-content-end pb-4">
            <div
              class="item-box-temp icon-temp d-flex justify-content-center align-items-center  mx-2"
              @click="convertirTemperaturaF()"
              v-bind:class="celsius == true ? 'primary' : 'secondary'"
            >
              <span>°C</span>
            </div>
            <div
              class="item-box-temp icon-temp d-flex justify-content-center align-items-center "
              @click="convertirTemperaturaC()"
              v-bind:class="fahrenheit == true ? 'primary' : 'secondary'"
            >
              <span>°F</span>
            </div>
          </div>
          <ul class="d-flex flex-wrap justify-content-between p-0 ">
            <li
              class="item-day px-1 mb-3"
              v-for="(item, index) in newFormatDate"
              :key="index"
            >
              <div class="p-2 content-item">
                <div class="wrapper">
                  <p class="p-0 m-0">
                    {{ index == 0 ? "Hoy" : item.applicable_date }}
                  </p>
                  <figure class="py-2 m-0">
                    <img
                      :src="'images/' + item.weather_state_abbr + '.png'"
                      alt=""
                      width="70"
                    />
                  </figure>
                </div>
                <div class="d-flex justify-content-between temp">
                  <p class="p-0">
                    {{ Math.round(item.min_temp) }}
                    {{ celsius == true ? "°C" : "°F" }}
                  </p>
                  <p class="p-0">
                    {{ Math.round(item.max_temp) }}
                    {{ celsius == true ? "°C" : "°F" }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <div class="information ">
            <h3 class="title text-start text-white">
              Lo más destacado de hoy
            </h3>
            <div class="d-flex flex-wrap justify-content-between pt-3">
              <div class="box">
                <div class="wrapper p-3">
                  <h4>Estado del viento</h4>
                  <p class="p-0">
                    {{ Math.round(weatherH.wind_speed)
                    }}<span class="min">mph</span>
                  </p>
                  <div class="d-flex align-items-center justify-content-center">
                    <div
                      class="icon d-flex align-items-center justify-content-center mx-2"
                    >
                      <span class="material-icons-outlined">
                        near_me
                      </span>
                    </div>
                    WSW
                  </div>
                </div>
              </div>
              <div class="box">
                <div class="wrapper p-3">
                  <h4>Humedad</h4>

                  <p class="p-0">
                    {{ weatherH.humidity }}<span class="min">%</span>
                  </p>
                  <div>
                    <div class="hitos d-flex justify-content-between py-1">
                      <p class="p-0 m-0">0</p>
                      <p class="p-0 m-0">50</p>
                      <p class="p-0 m-0">100</p>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        :style="'width:' + weatherH.humidity + '%'"
                        :aria-valuenow="weatherH.humidity"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div class="hitos d-flex justify-content-end py-1">
                      <p class="p-0 m-0">%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box">
                <div class="wrapper p-3">
                  <h4>Visibilidad</h4>

                  <p class="p-0">
                    {{ Math.round(weatherH.visibility) }}
                    <span class="min">miles</span>
                  </p>
                </div>
              </div>
              <div class="box">
                <div class="wrapper p-3">
                  <h4>Presión del aire</h4>

                  <p class="p-0">
                    {{ Math.round(weatherH.air_pressure) }}
                    <span class="min">mb</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CreditsComponent />
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import axios from "axios";
  import SearchComponent from "@/components/SearchComponente.vue";
  import CreditsComponent from "@/components/CreditsComponent.vue";

  export default {
    name: "Home",
    mounted() {
      this.getUbication();
    },
    data() {
      return {
        cors_Url: "https://api.allorigins.win/raw?url=",
        api_url: "https://www.metaweather.com/api/location/",
        datos: {
          latt: "",
          long: "",
        },
        datosCity: [],
        consolidatedWeather: [],
        weatherH: {
          weather_state_abbr: "",
        },
        hayData: false,
        months: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Oct",
          "Nov",
          "Dic",
        ],
        days: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
        search: false,
        celsius: true,
        fahrenheit: false,
      };
    },
    components: {
      SearchComponent,
      CreditsComponent,
    },
    methods: {
      convertirTemperaturaC() {
        if (this.celsius) {
          this.celsius = false;
          this.fahrenheit = true;

          let datos = this.consolidatedWeather;

          datos.forEach((item) => {
            item.min_temp = item.min_temp * 1.8 + 32;
            item.max_temp = item.max_temp * 1.8 + 32;
          });
          return datos;
        }
      },
      convertirTemperaturaF() {
        if (this.fahrenheit) {
          this.fahrenheit = false;
          this.celsius = true;

          let datos = this.consolidatedWeather;

          datos.forEach((item) => {
            item.min_temp = (item.min_temp - 32) / 1.8;
            item.max_temp = (item.max_temp - 32) / 1.8;
          });
          return datos;
        }
      },
      buscarClimaCiudad(ciudad) {
        // Método emitido desde el componente hijo:SearchComponente

        if (ciudad != " ") {
          //Se cierra el buscador
          this.search = false;
          console.log("Ciudad elegida -- PADRE:", ciudad);
          this.datos.city = ciudad;
          this.getClimaCity();
        }
      },
      showSearch() {
        this.search = true;
      },
      cerrarBuscador() {
        this.search = false;
      },
      getUbication() {
        // Hallar la ubicación actual
        axios
          .get(`https://geoip-db.com/json/`)
          .then((response) => {
            let data = response.data;
            this.datos.latt = data.latitude;
            this.datos.long = data.longitude;
            this.getClima();
          })
          .catch(function(error) {
            console.error(error);
          });
      },
      getClima() {
        axios
          .get(
            `${this.cors_Url}${this.api_url}search/?lattlong=${Math.round(
              this.datos.latt
            )},${Math.round(this.datos.long)}`
          )
          .then((response) => {
            let data = response.data;
            this.datos.city = data[0].woeid;
            this.getClimaCity();
          })
          .catch((error) => console.log("Error", error));
      },
      getClimaCity() {
        axios
          .get(`${this.cors_Url}${this.api_url}${this.datos.city}`)
          .then((response) => {
            this.hayData = true;
            let data = response.data;
            this.datosCity = data;
            // Datos de hoy día
            this.weatherH = this.datosCity.consolidated_weather[0];
            // Datos de los 5 días
            this.consolidatedWeather = this.datosCity.consolidated_weather.slice(
              0,
              5
            );
            console.log("DATOS consolidatedWeather:", this.consolidatedWeather);
          })
          .catch((error) => console.log("Error", error));
      },
    },
    computed: {
      newFormatDate() {
        let datos = this.consolidatedWeather;

        datos.forEach((item, index) => {
          let nuevaFecha = new Date(datos[index].applicable_date);

          let num = nuevaFecha.getDate();
          let dia = this.days[nuevaFecha.getDay()];
          let mes = this.months[nuevaFecha.getMonth()];

          item.applicable_date = `${dia}, ${num + 1} ${mes}`;
        });
        return datos;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .spinner {
    min-height: 100vh;
    background: #eee;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sidernav {
    background: rgb(30, 33, 58);
    min-height: 100vh;
    width: 459px;
    .btn-search {
      transition: 0.5s all;
    }
    .icon-gps {
      background: #6e707a;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      cursor: pointer;
      transition: 0.5s all;
    }
    .icon-gps:hover,
    .btn-search:hover {
      opacity: 0.89;
    }
    .background-sider {
      left: 0;
      top: 75px;

      img {
        background-position: top;
        background-repeat: no-repeat;
        height: 400px;
        object-fit: none;
        width: 100%;
        opacity: 0.1;
      }
    }
    .search {
      width: 160px;
      height: 40px;
      background: #6e707a;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      button {
        width: 100%;
        height: 100%;
        border: 0;
        background: none;
        color: #e7e7eb;
        outline: none;
        :hover {
          opacity: 0.5;
        }
      }
    }
    .weather_state_name h4 {
      color: #e7e7eb;
      font-size: 36px;
      line-height: 42px;
    }
  }

  ::placeholder {
    color: #e7e7eb;
    font-size: 1rem;
  }
  .content-main {
    background: rgb(16, 14, 29);
    flex: 1;
    width: calc(100vw - 459px);
    padding: 30px 70px;
    .icon-temp {
      border-radius: 50%;
      height: 40px;
      width: 40px;
      cursor: pointer;
      transition: 0.5s all;
      &.primary {
        background: #fff;
        span {
          color: #110e3c;
          font-weight: 700;
        }
      }
      &.secondary {
        background: #6e707a;
        span {
          color: #e7e7eb;
          font-weight: 700;
        }
      }
    }
    .item-day {
      // width: 18%;
      width: 142px;
      .content-item {
        width: 100%;
        background: rgb(30, 33, 58);
      }
      figure {
        height: 110px;
      }
      .temp p:nth-child(1) {
        color: #e7e7eb;
      }
      .temp p:last-child {
        color: #a09fb1;
      }
    }
    .information {
      margin-top: 65px;
      color: #e7e7eb;
      .box {
        background: rgb(30, 33, 58);
        min-width: 48%;
        min-height: 150px;
        margin: 20px 0;
        .min {
          font-size: 2.2rem;
        }
        h4 {
          font-size: 16px;
          font-weight: 500;
          line-height: 19px;
          font-style: normal;
        }
        p {
          font-size: 64px;
          line-height: 75px;
        }
        .icon {
          background: #6e707a;
          border-radius: 50%;
          height: 35px;
          transform: rotate(180deg);
          width: 35px;
        }
        .hitos p {
          font-size: 0.8rem;
          line-height: inherit;
        }
        .progress {
          border-radius: 80px;
          height: 8px;

          .progress-bar {
            background: #ffec65;
          }
        }
      }
    }
  }
  p,
  span {
    color: #ccc;
  }
  .humidity {
    font-size: 140px;
    color: #e7e7eb;
    span {
      font-size: 50px;
    }
  }
  @media only screen and (max-width: 768px) {
    .content-home {
      .sidernav {
        width: 350px;
      }
      .item-day {
        width: 100% !important;
      }
    }
  }
  @media only screen and (max-width: 640px) {
    .sidernav {
      width: 100% !important;
    }
    .content-main {
      padding: 30px 25px;
      .item-day {
        width: 50% !important;
      }
    }
    .information .box {
      width: 100%;
    }
  }
</style>
