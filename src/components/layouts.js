const backspace = { func: "backspace", classes: "control backspace", repeats: true, noPopup: true }

const pads = {
	numeric_simple: {
		_meta: {
			backspace
		},

		default: [
			"1 2 3",
			"4 5 6",
			"7 8 9",
			"0 . {backspace}"
		]
	},

	letters_ru_en: {
		_meta: {
			"default": { keySet: "default", text: "abc", classes: "control", noPopup: true },
			"default_ru": { keySet: "default_ru", text: "АБВ", classes: "control activated", noPopup: true },
			"ru": { keySet: "default_ru", text: "RU", classes: "control", noPopup: true },
			"en": { keySet: "default", text: "EN", classes: "control", noPopup: true },
			"alpha": { keySet: "default", text: "Abc", classes: "control", noPopup: true },
			"alpha_ru": { keySet: "default_ru", text: "Абв", classes: "control", noPopup: true },
			"shift": { keySet: "shifted", text: "ABC", classes: "control", noPopup: true },
			"shift_ru": { keySet: "shifted_ru", text: "АБВ", classes: "control", noPopup: true },
			"numbers": { keySet: "numbers", text: "123", classes: "control", noPopup: true },
			"numbers_ru": { keySet: "numbers_ru", text: "123", classes: "control", noPopup: true },
			"space": { key: " ", text: "", classes: "spacer key--triple", noPopup: true },
			backspace,
			"zero": { key: "0" },
			"ь": { key: "ь", alt: 'ъ' },
			"Ь": { key: "Ь", alt: 'Ъ' },
			"е": { key: "е", alt: 'ё' },
			"Е": { key: "Е", alt: 'Ё' }
		},

		default: [
			"q w e r t y u i o p",
			" a s d f g h j k l ",
			"z x c v b n m . ,",
			"{numbers} {shift} {ru} {space} {backspace}"
		],

		default_ru: [
			"й ц у к {е} н г ш щ з х",
			" ф ы в а п р о л д ж э ",
			"я ч с м и т {ь} б ю . ,",
			"{numbers_ru} {shift_ru} {en} {space} {backspace}"
		],

		shifted: [
			"Q W E R T Y U I O P",
			" A S D F G H J K L ",
			"Z X C V B N M . ,",
			"{numbers} {shift} {ru} {space} {backspace}"
		],

		shifted_ru: [
			"Й Ц У К {Е} Н Г Ш Щ З Х",
			" Ф Ы В А П Р О Л Д Ж Э ",
			"Я Ч С М И Т {Ь} Б Ю . ,",
			"{numbers_ru} {default_ru} {en} {space} {backspace}"
		],

		numbers: [
			"1 2 3",
			"4 5 6",
			"7 8 9",
			"{alpha} . {zero} {backspace}"
		],

		numbers_ru: [
			"1 2 3",
			"4 5 6",
			"7 8 9",
			"{alpha_ru} . {zero} {backspace}"
		]
	}

}

module.exports = {
	"normal": {

		_meta: {
			"tab": { key: "\t", text: "Tab", width: 60, classes: "control" },
			"shiftl": { keySet: "shifted", text: "Shift", width: 100, classes: "control" },
			"shiftr": { keySet: "shifted", text: "Shift", width: 100, classes: "control" },
			"caps": { keySet: "capsed", text: "Caps lock", width: 80, classes: "control" },
			"space": { key: " ", text: "Space", width: 180 },
			"enter": { key: "\r\n", text: "Enter", width: 80, classes: "control" },
			backspace,
		},

		default: [
			"` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
			"{tab} q w e r t y u i o p [ ] \\",
			"{caps} a s d f g h j k l ; ' {enter}",
			"{shiftl} z x c v b n m , . / {shiftr}",
			"{space} {accept}"
		],
		shifted: [
			"~ ! @ # $ % ^ & * ( ) _ + {backspace}",
			"{tab} Q W E R T Y U I O P { } |",
			"{caps} A S D F G H J K L : \" {enter}",
			"{shiftl} Z X C V B N M < > ? {shiftr}",
			"{space} {accept}"
		],

		capsed: [
			"` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
			"{tab} Q W E R T Y U I O P [ ] \\",
			"{caps} A S D F G H J K L ; ' {enter}",
			"{shiftl} Z X C V B N M , . / {shiftr}",
			"{space} {accept}"
		]
	},

	"compact": [
		{
			classes: "pad--double",
			pad: pads.letters_ru_en
		}
		,
		{
			pad: pads.numeric_simple
		},
	],

	"numeric": [
		{
			name: 'first',
			options: {},
			pad: pads.numeric_simple
		}
	]
};