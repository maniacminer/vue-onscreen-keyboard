<template>
  <div id="app">
    <fieldset>
      <legend>Инпут проверки клавиатуры (компактная EN)</legend>
      <input
        id="input1"
        type="text"
        data-layout="compact"
        @focus="focusInput"
        data-keyset="default"
        @blur="blurInput"
      />
    </fieldset>
    <fieldset>
      <legend>Инпут проверки клавиатуры (компактная RU)</legend>
      <input id="input1" type="text" data-layout="compact" @focus="focusInput" @blur="blurInput" />
    </fieldset>
    <fieldset>
      <legend>Инпут проверки клавиатуры (цифровая)</legend>
      <input id="input1" type="text" data-layout="numeric" @focus="focusInput" @blur="blurInput" />
    </fieldset>
    <div class="onscreen-keyboard" :class="{ hide: input === null }" @mousedown.prevent>
      <onscreen-keyboard
        :options="{ useKbEvents: true }"
        :input="input"
        :layout="layout"
        defaultKeySet="default_ru"
      />
    </div>
  </div>
</template>

<script>
// import OnscreenKeyboard from "./components/keyboard.vue";
import OnscreenKeyboard from "../dist/vue-onscreen-keyboard.umd.js";

export default {
  name: "app",
  data() {
    return {
      input: null,
      layout: null,
      keyset: "default"
    };
  },
  methods: {
    focusInput(el) {
      this.$emit("onscreen-keyboard-focus", el.target);
    },
    blurInput(el) {
      this.$emit("onscreen-keyboard-blur", el.target);
    }
  },
  computed: {},
  components: { "onscreen-keyboard": OnscreenKeyboard },
  mounted() {
    this.$on("onscreen-keyboard-focus", el => {
      this.input = el;

      const LAYOUT_ATR = "data-layout";
      const KEYSET_ATR = "data-keyset";

      if (el.hasAttribute(KEYSET_ATR)) {
        this.keyset = el.getAttribute(KEYSET_ATR);
      } else {
        this.keyset = "default";
      }

      if (el.hasAttribute(LAYOUT_ATR)) {
        this.layout = el.getAttribute(LAYOUT_ATR);
      }
    });

    this.$on("onscreen-keyboard-blur", el => {
      this.$nextTick(() => {
        if (this.input === el) {
          this.input = null;
        }
      });
    });
  }
};
</script>

<style lang="scss">
html {
  font-family: "Arial", sans-serif;
}

.onscreen-keyboard {
  font-size: 1.3rem;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 1000;
  max-width: 1200px;
  margin: 0 auto;

  padding: 3px 5px 10px;

  background-color: #ddd;
  box-shadow: 0px -3px 10px rgba(black, 0.3);

  border-radius: 10px;
  transition: 300ms;

  &.hide {
    transform: translateY(100%);
  }
}
</style>
