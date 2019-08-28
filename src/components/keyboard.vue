<template >
  <div class="keyboard" @mousedown.prevent @touchstart.prevent>
    <div v-for="(line, index) in keySet" :key="index" class="line">
      <span
        v-for="(key, index) in line"
        :key="index"
        :class="getClassesOfKey(key)"
        v-text="getCaptionOfKey(key)"
        @touchstart="e => touchstart(e, key)"
        @touchend="e => touchend(e, key)"
        @mousedown="e => touchstart(e, key)"
        @mouseup="e => touchend(e, key)"
        :style="getKeyStyle(key)"
      />
    </div>
  </div>
</template>

<script>
import Layouts from "./layouts";
import { setTimeout, setInterval, clearInterval } from "timers";

let repeatHandler;
let trashhold;
let pressTime = 0;

export default {
  name: "onscreen-keyboard",
  props: {
    input: [HTMLInputElement, HTMLTextAreaElement],
    layout: [String, Object],
    defaultKeySet: {
      type: String,
      default: "default"
    },

    accept: Function,
    cancel: Function,
    change: Function,
    next: Function,

    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      currentKeySet: this.defaultKeySet,
      inputScrollLeft: 0,
      pressedKey: null
    };
  },

  computed: {
    keySet() {
      let layout = this.getLayout();
      if (!layout) return;

      let keySet = layout[this.currentKeySet];
      if (!keySet) return;

      let res = [];

      let meta = layout["_meta"] || {};

      keySet.forEach(line => {
        let row = [];
        line.split(" ").forEach(item => {
          if (!!item && typeof item === "object") {
            row.push(item);
          } else if (typeof item === "string") {
            if (
              item.length > 2 &&
              item[0] == "{" &&
              item[item.length - 1] == "}"
            ) {
              let name = item.substring(1, item.length - 1);
              if (meta[name]) row.push(meta[name]);
              // eslint-disable-next-line
              else console.warn("Missing named key from meta: " + name);
            } else {
              if (item == "") {
                // Placeholder
                row.push({
                  placeholder: true
                });
              } else {
                // Normal key
                row.push({
                  key: item,
                  text: item
                });
              }
            }
          }
        });
        res.push(row);
      });

      return res;
    }
  },

  watch: {
    layout() {
      const layout = this.getLayout();

      let keyset = this.defaultKeySet;

      if (layout[keyset] != null) {
        this.currentKeySet = keyset;
      } else {
        this.currentKeySet = "default";
      }
    }
  },

  methods: {
    getLayout() {
      if (typeof this.layout === "string") return Layouts[this.layout];

      return this.layout;
    },

    changeKeySet(name) {
      let layout = this.getLayout();
      if (layout[name] != null) this.currentKeySet = name;
    },

    toggleKeySet(name) {
      this.currentKeySet = this.currentKeySet == name ? "default" : name;
    },

    getCaptionOfKey(key) {
      return key.text || key.key || "";
    },

    getClassesOfKey(key) {
      if (key.placeholder) return "placeholder";
      else {
        let classes = "key " + (key.func || "") + " " + (key.classes || "");
        if (key.keySet && this.currentKeySet == key.keySet)
          classes += " activated";

        if (key === this.pressedKey) {
          classes += " touch";
        }

        return classes;
      }
    },

    getKeyStyle(key) {
      if (key.width)
        return {
          flex: key.width
        };
    },

    supportsSelection() {
      return /text|password|search|tel|url/.test(this.input.type);
    },

    getCaret() {
      if (this.supportsSelection()) {
        let pos = {
          start: this.input.selectionStart || 0,
          end: this.input.selectionEnd || 0
        };

        if (pos.end < pos.start) pos.end = pos.start;

        return pos;
      } else {
        let val = this.input.value;
        return {
          start: val.length,
          end: val.length
        };
      }
    },

    backspace(caret, text) {
      if (caret.start < caret.end) {
        text = text.substring(0, caret.start) + text.substring(caret.end);
      } else {
        text = text.substring(0, caret.start - 1) + text.substring(caret.start);
        caret.start -= 1;
      }
      caret.end = caret.start;
      return text;
    },

    insertChar(caret, text, ch) {
      if (caret.start < caret.end) {
        text =
          text.substring(0, caret.start) +
          ch.toString() +
          text.substring(caret.end);
      } else {
        text =
          text.substr(0, caret.start) +
          ch.toString() +
          text.substr(caret.start);
      }
      caret.start += ch.length;
      caret.end = caret.start;
      return text;
    },

    mousedown(e) {
      if (!this.input) return;
      if (this.options.preventClickEvent) e.preventDefault();

      this.inputScrollLeft = this.input.scrollLeft;
    },

    touchstart(e, key) {
      this.pressedKey = key;

      if (key.repeats) {
        setTimeout(() => {
          if (this.pressedKey === key && !repeatHandler) {
            // держим по прежнему кнопку
            repeatHandler = setInterval(() => {
              if (this.pressedKey === key) {
                this.clickKey(e, key);
              } else {
                clearInterval(repeatHandler);
                repeatHandler = undefined;
              }
            }, 80);
          }
        }, 500);
      }

      if (key.alt) {
        setTimeout(() => {}, 500);
      }
    },

    touchend(e, key) {
      // трешхолдим случайные повторы при касаниях
      if (trashhold) return;
      trashhold = true;
      setTimeout(() => {
        trashhold = false;
      }, 100);

      if (this.pressedKey === key) {
        this.clickKey(e, key);
        this.pressedKey = null;
      }

      if (repeatHandler) {
        clearInterval(repeatHandler);
        repeatHandler = undefined;
      }
    },

    clickKey(e, key) {
      if (!this.input) return;
      if (this.options.preventClickEvent) e.preventDefault();

      let caret = this.getCaret();
      let text = this.input.value;

      let addChar = null;
      if (typeof key == "object") {
        if (key.keySet) {
          this.toggleKeySet(key.keySet);
        } else if (key.func) {
          switch (key.func) {
            case "backspace": {
              text = this.backspace(caret, text);
              break;
            }

            case "accept": {
              if (this.accept) this.accept(text);
              return;
            }

            case "cancel": {
              if (this.cancel) this.cancel();
              return;
            }

            case "next": {
              if (this.next) this.next();
              return;
            }

            default: {
              this.$emit(key.func);
            }
          }
        } else {
          addChar = key.key;
        }
      } else {
        addChar = key;
      }

      if (addChar) {
        if (this.input.maxLength <= 0 || text.length < this.input.maxLength) {
          if (this.options.useKbEvents) {
            let e = document.createEvent("Event");
            e.initEvent("keydown", true, true);
            e.which = e.keyCode = addChar.charCodeAt();
            if (this.input.dispatchEvent(e)) {
              text = this.insertChar(caret, text, addChar);
            }
          } else {
            text = this.insertChar(caret, text, addChar);
          }
        }

        // if (this.currentKeySet == "shifted")
        // 	this.changeKeySet("default");
      }

      this.input.value = text;
      this.setFocusToInput(caret);

      if (this.change) this.change(text, addChar);

      if (this.input.maxLength > 0 && text.length >= this.input.maxLength) {
        // The value reached the maxLength
        if (this.next) this.next();
      }

      // trigger 'input' Event
      this.input.dispatchEvent(new Event("input", { bubbles: true }));
    },

    setFocusToInput(caret) {
      this.input.focus();
      if (caret && this.supportsSelection()) {
        this.input.selectionStart = caret.start;
        this.input.selectionEnd = caret.end;
      }
    }
  },

  mounted() {
    if (this.input) {
      this.setFocusToInput();
    }
  }
};
</script>

<style lang="scss">
$width: 40;
$height: 2.2em;
$margin: 8px;
$button-spacing: 6px;
$radius: 0.3em;
$button-width: 100px;

.keyboard {
  width: 100%;
  margin: 0;

  .line {
    display: flex;
    justify-content: space-between;
    &:not(:last-child) {
      margin-bottom: $margin;
    }
  }

  .key {
    &:not(:last-child) {
      // margin-right: $margin;
      margin-right: $button-spacing;
    }

    // width: 240px;
    flex-basis: $button-width;
    // flex: $width;
    height: $height;
    line-height: $height;
    overflow: hidden;

    vertical-align: middle;
    border: 1px solid #ccc;
    color: #333;
    background-color: #fff;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.6);
    border-radius: $radius;

    font-size: 1.25em;
    text-align: center;
    white-space: nowrap;
    user-select: none;
    cursor: pointer;

    &.backspace {
      background-image: url("./icons/backspace.svg");
      background-image: url("data:image/svg+xml;utf8,<svg height='48' viewBox='0 0 48 48' width='48' xmlns='http://www.w3.org/2000/svg'><path d='M0 0h48v48h-48z' fill='none'/><path d='M44 6h-30c-1.38 0-2.47.7-3.19 1.76l-10.81 16.23 10.81 16.23c.72 1.06 1.81 1.78 3.19 1.78h30c2.21 0 4-1.79 4-4v-28c0-2.21-1.79-4-4-4zm-6 25.17l-2.83 2.83-7.17-7.17-7.17 7.17-2.83-2.83 7.17-7.17-7.17-7.17 2.83-2.83 7.17 7.17 7.17-7.17 2.83 2.83-7.17 7.17 7.17 7.17z' fill='white'/></svg>");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 35% cover;
    }

    &.half {
      // flex: $width / 2 - 0.8;
      flex-basis: $button-width / 2 - $button-spacing / 2;
    }

    &.double {
      // flex: $width * 2 + 3;
      flex-basis: $button-width * 2 + $button-spacing;
    }

    &.triple {
      flex-basis: $button-width * 3 + $button-spacing * 2;
    }

    &.spacer {
      flex-grow: 1;
    }

    &.control {
      color: #fff;
      background-color: #7d7d7d;
      border-color: #656565;
    }

    &.featured {
      color: #fff;
      background-color: #337ab7;
      border-color: #2e6da4;
    }

    &:hover {
      color: #333;
      background-color: #d6d6d6;
      border-color: #adadad;
    }

    &:active {
      transform: scale(0.98); // translateY(1px);
      color: #333;
      background-color: #d4d4d4;
      border-color: #8c8c8c;
    }

    &.touch {
      transform: scale(0.98); // translateY(1px);
      color: #333;
      background-color: #d4d4d4;
      border-color: #8c8c8c;
    }

    &.activated {
      color: #fff;
      background-color: #5bc0de;
      border-color: #46b8da;
    }
  } // .key
  .placeholder {
    flex-basis: 30px;

    &:not(:last-child) {
      margin-right: $margin;
    }
  }

  &:before,
  &:after {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
  }
} // .keyboard
</style>
