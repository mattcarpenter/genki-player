
'use strict'

export const SESSION_SET_VOLUME = 'SESSION_SET_VOLUME';

export function setVolume(volume) {
	return {
		type: SESSION_SET_VOLUME,
		volume: volume
	};
}
