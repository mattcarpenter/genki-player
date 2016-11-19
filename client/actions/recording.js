import axios from 'axios';

export const FETCH_RECORDING = 'FETCH_RECORDING';
export const FETCH_RECORDING_SUCCESS = 'FETCH_RECORDING_SUCCESS';
export const FETCH_RECORDING_FAILURE = 'FETCH_RECORDING_FAILURE';

export const SEARCH_RECORDINGS = 'SEARCH_RECORDINGS';
export const SEARCH_RECORDINGS_SUCCESS = 'SEARCH_RECORDINGS_SUCCESS';
export const SEARCH_RECORDINGS_FAILURE = 'SEARCH_RECORDINGS_FAILURE';

export const RECORDING_STATE_LOADING = 'RECORDING_STATE_LOADING';
export const RECORDING_STATE_LOADED = 'RECORDING_STATE_LOADED';

export const SET_RECORDING_STATE = 'SET_RECORDING_STATE';
export const RECORDING_STATE_PLAYING = 'RECORDING_STATE_PLAYING';
export const RECORDING_STATE_PAUSED = 'RECORDING_STATE_PAUSED';

export function fetchRecording(recordingId) {
	const request = axios({
		method: 'get',
		url: '/recording?recordingId=' + recordingId,
		headers: []
	});

	return {
		type: FETCH_RECORDING,
		payload: request
	};
}

export function fetchRecordingSuccess(recording) {
	return {
		type: FETCH_RECORDING_SUCCESS,
		payload: recording
	};
}

export function fetchRecordingFailure(error) {
	console.log('fetch fail');
	return {
		type: FETCH_RECORDING_FAILURE,
		payload: error
	};
}

export function setRecordingState(state) {
	return {
		type: SET_RECORDING_STATE,
		state: state
	};
}


export function searchRecordings(query) {
	const request = axios({
		method: 'get',
		url: '/search?query=' + encodeURIComponent(query),
		headers: []
	});

	return {
		type: SEARCH_RECORDINGS,
		payload: request
	};
}

export function searchRecordingsSuccess(recording) {
	return {
		type: SEARCH_RECORDINGS_SUCCESS,
		payload: recording
	};
}

export function searchRecordingsFailure(error) {
	return {
		type: SEARCH_RECORDINGS_FAILURE,
		payload: error
	};
}
