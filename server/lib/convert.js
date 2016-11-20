
'use strict'

import kuroshiro from 'kuroshiro'

var ready = false

console.log('initializing kuroshiro')

kuroshiro.init((err) => {
	console.log('kuroshiro ready')
    ready = true
});

export function furiganize(input) {
	return ready ? kuroshiro.convert(input, {mode:'furigana', to:'hiragana'}) : input
}