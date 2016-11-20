
'use strict'

import kuroshiro from 'kuroshiro'

var ready = false

console.log('initializing kuroshiro')

kuroshiro.init((err) => {
	console.log('kuroshiro ready')
    ready = true
});

export function furiganize(input) {
	// change mode to 'furigana' to generate furigana markup
	return ready ? kuroshiro.convert(input, {mode:'normal', to:'hiragana'}) : input
}