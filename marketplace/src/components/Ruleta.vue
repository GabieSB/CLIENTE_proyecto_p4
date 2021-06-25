<template>
  <div>
    <section class="Encabezado">
      <div class="hero-body">
        <div class="container d-flex justify-content-center">
          <h1>Intenta y gana</h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container" id="app">
        <div class="columns">
          <div class="column">
            <div class="columns is-centered">
              <input
                type="button"
                class="button is-dark"
                value="GIRAR RULETA"
                id="spin"
                v-on:click="spin"
                v-if="girar"
              />
              <h2 class="my-3" v-else>Mañana podrás jugar de nuevo. 😃</h2>
            </div>
            <div class="columns is-centered">
              <canvas id="canvas" width="500" height="500"></canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-modal id="modal-premio" title="Has ganado! 🥳🎉">
      <p class="my-4"> Te has ganado {{premio}}, debes agregar a tu carrito un solo poducto para poder canjearlo</p>
    </b-modal>
    <b-modal
      id="tarjeta"
      ref="modal"
      title="Has ganado una bonificación de $50 🥳🎉"
      v-show="showModal"
      @ok="handleOk"
      no-close-on-backdrop
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Seleccione la tarjeta donde desea recibir la bonificación:  "
          label-for="name-input"
          invalid-feedback="El método de pago es requerido"
          :state="nameState"
        >
          <b-form-select
            id="fmPago"
            v-model="selected"
            :options="formaPago"
            class="mb-3"
          ></b-form-select>
          <p>El dinero podría ser rembolsado en colones</p>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Ruleta",
  props: ["girar"],
  data: () => ({
    options: [
      "Bonificación $50",
      "Intenta mañana",
      "Intenta mañana",
      "Descuento 10% ",
      "Intenta mañana",
       "Intenta mañana",
      "Intenta mañana",
      "Intenta mañana",
       "Envío Gratis",
      "Intenta mañana",
    ],
    startAngle: 0,
    startAngleStart: 0,
    spinTimeout: null,
    spinArcStart: 10,
    spinTime: 0,
    spinTimeTotal: 0,
    ctx: "",
    optionSelected: "",
    formaPago: [],
    selected: "",
    showModal: false,
    nameState: null,
    premio: "",
    cont: 1,
  }),
  computed: {
    arc: function () {
      return Math.PI / (this.options.length / 2);
    },
  },

  methods: {
    byte2Hex: function (n) {
      var nybHexString = "0123456789ABCDEF";
      return (
        String(nybHexString.substr((n >> 4) & 0x0f, 1)) +
        nybHexString.substr(n & 0x0f, 1)
      );
    },

    RGB2Color: function (r, g, b) {
      return "#" + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
    },

    getColor: function (item, maxitem) {
      var phase = 0;
      var center = 128;
      var width = 127;
      var frequency = (Math.PI * 2) / maxitem;

      var red = Math.sin(frequency * item + 2 + phase) * width + center;
      var green = Math.sin(frequency * item + 0 + phase) * width + center;
      var blue = Math.sin(frequency * item + 4 + phase) * width + center;

      return this.RGB2Color(red, green, blue);
    },

    drawRouletteWheel: function () {
      var canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        var outsideRadius = 200;
        var textRadius = 160;
        var insideRadius = 125;

        this.ctx = canvas.getContext("2d");
        this.ctx.clearRect(0, 0, 500, 500);

        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;

        this.ctx.font = "bold 12px Helvetica, Arial";

        for (var i = 0; i < this.options.length; i++) {
          var angle = this.startAngle + i * this.arc;
          //this.ctx.fillStyle = colors[i];
          this.ctx.fillStyle = this.getColor(i, this.options.length);

          this.ctx.beginPath();
          this.ctx.arc(250, 250, outsideRadius, angle, angle + this.arc, false);
          this.ctx.arc(250, 250, insideRadius, angle + this.arc, angle, true);
          this.ctx.stroke();
          this.ctx.fill();

          this.ctx.save();
          this.ctx.shadowOffsetX = -1;
          this.ctx.shadowOffsetY = -1;
          this.ctx.shadowBlur = 0;
          this.ctx.shadowColor = "rgb(220,220,220)";
          this.ctx.fillStyle = "black";
          this.ctx.translate(
            250 + Math.cos(angle + this.arc / 2) * textRadius,
            250 + Math.sin(angle + this.arc / 2) * textRadius
          );
          this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
          var text = this.options[i];
          this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
          this.ctx.restore();
        }

        //Arrow
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
        this.ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
        this.ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
        this.ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
        this.ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
        this.ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
        this.ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
        this.ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
        this.ctx.fill();
      }
    },

    spin: function () {
      this.spinAngleStart = Math.random() * 10 + 10;
      this.spinTime = 0;
      this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
      this.rotateWheel();
      this.girar = false;
    },

    rotateWheel: function () {
      this.spinTime += 30;
      if (this.spinTime >= this.spinTimeTotal) {
        this.stopRotateWheel();
        return;
      }
      var spinAngle =
        this.spinAngleStart -
        this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
      this.startAngle += (spinAngle * Math.PI) / 180;
      this.drawRouletteWheel();

      let _this = this;
      this.spinTimeout = setTimeout(function () {
        _this.rotateWheel();
      }, 30);
    },

    stopRotateWheel: function () {
      clearTimeout(this.spinTimeout);
      var degrees = (this.startAngle * 180) / Math.PI + 90;
      var arcd = (this.arc * 180) / Math.PI;
      var index = Math.floor((360 - (degrees % 360)) / arcd);
      this.ctx.save();
      this.ctx.font = "bold 30px Helvetica, Arial";
      var text = this.options[index];
      this.optionSelected = this.options[index];
      console.log(index, text, this.options);
      this.$store.state.resultadoRuleta = this.options[index];

      this.ctx.fillText(
        text,
        250 - this.ctx.measureText(text).width / 2,
        250 + 10
      );
      this.createGiroRuleta();
      this.analyserResult();
      this.ctx.restore();
    },

    easeOut: function (t, b, c, d) {
      var ts = (t /= d) * t;
      var tc = ts * t;
      return b + c * (tc + -3 * ts + 3 * t);
    },
    analyserResult() {
      console.log(this.optionSelected);
      if (this.optionSelected.includes("Bonificación")) {
        this.getFormasPago();
        
      }else  if (this.optionSelected.includes("Descuento")) {
        this.premio = "un descuento de 10%"
        this.$bvModal.show("modal-premio");
      }else  if (this.optionSelected.includes("Envío")) {
        this.premio = "un envío gratis."
          this.$bvModal.show("modal-premio");
      }
     
    },
    createGiroRuleta() {
      var giroRuleta = {
        comprador_id: localStorage.getItem("comprador_id"),
        resultado: this.optionSelected,
      };

      console.log(giroRuleta);
      axios
        .post(
          process.env.VUE_APP_API_URL + "create_giro_ruleta",
          JSON.stringify(giroRuleta)
        )
        .then((response) => {
          this.$alertify.success(
            "Bien hecho. Regresa mañana para intentar de nuevo."
          );
        })
        .catch((error) => {
          this.$alertify.error(error.response);
        });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }

      this.agregarSaldoTarjeta();
      //enviar mensaje
      this.$nextTick(() => {
        this.$bvModal.hide("tarjeta");
      });
    },
    agregarSaldoTarjeta() {
      var giroRuleta = {
        pago_id: this.selected,
      };

      axios
        .put(
          process.env.VUE_APP_API_URL + "agregar_bonificacion_by_id",
          JSON.stringify(giroRuleta)
        )
        .then((response) => {
          this.$alertify.success("Bonificación remunerada");
        })
        .catch((error) => {
          this.$alertify.error(error.response);
        });
    },
    getFormasPago() {
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "get_formaPago/" +
            localStorage.getItem("comprador_id")
        )
        .then((response) => {
          var aux = [];
          aux[0] = {
            value: null,
            text: "Selecionar metodo de pago",
          };
          var cont = 1;
          for (var x of response.data) {
            this.selected,
              (aux[cont] = {
                value: x.formaPago_id,
                text: x.numeroTarjeta,
              });

            cont++;
          }

          this.formaPago = aux;

          this.$bvModal.show("tarjeta");
        });
    },
  },

  mounted() {
    this.drawRouletteWheel();
  },
};
</script>
<style scoped>
@import "/assets/ruleta.css";
/*# sourceMappingURL=bulma.css.map */
</style>