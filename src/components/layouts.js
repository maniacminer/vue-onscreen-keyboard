module.exports = {

	"normal": {

		_meta: {
			"tab": { key: "\t", text: "Tab", width: 60, classes: "control" },
			"shiftl": { keySet: "shifted", text: "Shift", width: 100, classes: "control" },
			"shiftr": { keySet: "shifted", text: "Shift", width: 100, classes: "control" },
			"caps": { keySet: "capsed", text: "Caps lock", width: 80, classes: "control" },
			"space": { key: " ", text: "Space", width: 180 },
			"enter": { key: "\r\n", text: "Enter", width: 80, classes: "control" },
			"backspace": { func: "backspace", classes: "control backspace", width: 65 },
			"accept": { func: "accept", text: "Close", classes: "control featured" },
			"next": { func: "next", text: "Next", classes: "control featured" }
		},

		default: [
			"` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
			"{tab} q w e r t y u i o p [ ] \\",
			"{caps} a s d f g h j k l ; ' {enter}",
			"{shiftl} z x c v b n m , . / {shiftr}",
			"{next} {space} {accept}"
		],
		shifted: [
			"~ ! @ # $ % ^ & * ( ) _ + {backspace}",
			"{tab} Q W E R T Y U I O P { } |",
			"{caps} A S D F G H J K L : \" {enter}",
			"{shiftl} Z X C V B N M < > ? {shiftr}",
			"{next} {space} {accept}"
		],

		capsed: [
			"` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
			"{tab} Q W E R T Y U I O P [ ] \\",
			"{caps} A S D F G H J K L ; ' {enter}",
			"{shiftl} Z X C V B N M , . / {shiftr}",
			"{next} {space} {accept}"
		]
	},

	"compact": {

		_meta: {
			"default": { keySet: "default", text: "abc", classes: "control" },
			"default_ru": { keySet: "default_ru", text: "АБВ", classes: "control activated" },
			"ru": { keySet: "default_ru", text: "RU", classes: "control" },
			"en": { keySet: "default", text: "EN", classes: "control" },
			"alpha": { keySet: "default", text: "Abc", classes: "control" },
			"shift": { keySet: "shifted", text: "ABC", classes: "control" },
			"shift_ru": { keySet: "shifted_ru", text: "АБВ", classes: "control" },
			"numbers": { keySet: "numbers", text: "123", classes: "control" },
			"space": { key: " ", text: "", width: 200 },
			"backspace": { func: "backspace", classes: "control" },
			"accept": { func: "accept", text: "Close", classes: "control featured" },
			// "next": { func: "next", text: "Next", classes: "featured" },
			"zero": { key: "0", width: 85 }
		},

		default: [
			"q w e r t y u i o p",
			" a s d f g h j k l ",
			"z x c v b n m . ,",
			"{numbers} {shift} {ru} {space} {backspace} {next}"
		],

		default_ru: [
			"й ц у к е н г ш щ з х ъ",
			" ф ы в а п р о л д ж э ",
			"я ч с м и т ь б ю . ,",
			"{numbers} {shift_ru} {en} {space} {backspace} {next}"
		],

		shifted: [
			"Q W E R T Y U I O P",
			" A S D F G H J K L ",
			"Z X C V B N M . ,",
			"{numbers} {shift} {ru} {space} {backspace} {next}"
		],

		shifted_ru: [
			"Й Ц У К Е Н Г Ш Щ З Х Ъ",
			" Ф Ы В А П Р О Л Д Ж Э ",
			"Я Ч С М И Т Ь Б Ю . ,",
			"{numbers} {default_ru} {en} {space} {backspace} {next}"
		],

		numbers: [
			"1 2 3",
			"4 5 6",
			"7 8 9",
			"{alpha} . {zero} {backspace} {next}"
		]
	},

	"numeric": {

		_meta: {
			// "backspace": { func: "backspace", classes: "control", width: 130 },

			"backspace": { func: "backspace", classes: "control" },
			"accept": { func: "accept", text: "Close", classes: "control featured" },
			"next": { func: "next", text: "Next", classes: "control featured" },
			"zero": { key: "0", width: 130 }

		},

		default: [
			"1 2 3",
			"4 5 6",
			"7 8 9",
			"_ - . {zero} {backspace} {next} {accept}"
		]
	}

};