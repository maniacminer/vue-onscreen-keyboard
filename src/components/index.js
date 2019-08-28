const component = require("./keyboard.vue");

module.exports = {
	component,

	install(Vue) {
		Vue.component("OnscreenKeyboard", component);
	}
};