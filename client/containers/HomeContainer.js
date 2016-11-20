import React from 'react'
import { connect } from 'react-redux'
import Home from '../components/Home'
import { fetchAllRecordings, fetchAllRecordingsSuccess, fetchAllRecordingsFailure } from '../actions/recording'

const mapStateToProps = (state, ownProps) => {
    return {
        recordings: state.recording.allRecordings
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchAll: () => {
            dispatch(fetchAllRecordings()).then((response) => {
                !response.error ? dispatch(fetchAllRecordingsSuccess(response.payload)) : dispatch(fetchAllRecordingsFailure(response.payload));
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
