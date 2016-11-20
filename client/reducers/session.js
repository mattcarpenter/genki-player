import { SESSION_SET_VOLUME } from '../actions/session'

const initialState = {
    volume: 0.75
};

export default function update(state = initialState, action) {
  switch(action.type) {
    case SESSION_SET_VOLUME:
        return { ...state, volume: action.volume };
  }

  return state
}
