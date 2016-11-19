import { FETCH_RECORDING_SUCCESS, FETCH_RECORDING_FAILURE, RECORDING_STATE_LOADING,
         SEARCH_RECORDINGS_SUCCESS, SEARCH_RECORDINGS_FAILURE } from '../actions/recording'

const initialState = {
    data: null
};

export default function update(state = initialState, action) {
  switch(action.type) {
    case FETCH_RECORDING_SUCCESS:
        return { ...state, data: action.payload.data };

    case SEARCH_RECORDINGS_SUCCESS:
        return { ...state, searchResults: action.payload.data }
  }

  return state
}
