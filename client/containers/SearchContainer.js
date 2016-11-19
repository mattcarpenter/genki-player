import React from 'react'
import { connect } from 'react-redux'
import Search from '../components/Search'
import { searchRecordings, searchRecordingsSuccess, searchRecordingsFailure } from '../actions/recording'

const mapStateToProps = (state, ownProps) => {
    return {
        searchResults: state.recording.searchResults
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSearch: (query) => {
            dispatch(searchRecordings(query)).then((response) => {
                !response.error ? dispatch(searchRecordingsSuccess(response.payload)) : dispatch(searchRecordingsFailure(response.payload));
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
