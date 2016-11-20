import React from 'react'
import { connect } from 'react-redux'
import Recording  from '../components/Recording'
import { fetchRecording, fetchRecordingSuccess, fetchRecordingFailure, clearRecording } from '../actions/recording'
import { setVolume } from '../actions/session'
import { RECORDING_STATE_LOADED } from '../actions/recording'

const mapStateToProps = (state, ownProps) => {
  return {
    recordingId: ownProps.params.recordingId,
    recordingData: state.recording.data,
    searchTerms: (ownProps.location.query.words || '').split(','),
    volume: state.session.volume
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRecording: (recordingId) => {
      dispatch(fetchRecording(recordingId)).then((response) => {
        !response.error ? dispatch(fetchRecordingSuccess(response.payload)) : dispatch(fetchRecordingFailure(response.payload));
      });
    },
    clearRecording: () => {
      dispatch(clearRecording());
    },
    setVolume: (volume) => {
      dispatch(setVolume(volume));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Recording)
