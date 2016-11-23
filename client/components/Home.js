import React from 'react'
import { connect } from 'react-redux'
import SearchContainer from '../containers/SearchContainer'
import SearchResult from './SearchResult'

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.recordings) {
            this.props.fetchAll();
        }
    }

    render() {
        var recordings = [];

        (this.props.recordings || []).forEach((recording, index) => {
            recordings.push(
                <SearchResult
                    key={index}
                    recording={recording}
                    words=","
                />
            );
        });

        return (
            <div className="col-xs-12 col-md-8 col-lg-6">
                <SearchContainer/>
                <div style={styles.container}>
                    <h4>All Recordings</h4>
                    <ul style={styles.ul}>
                        {recordings}
                    </ul>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        marginTop: 15
    },
    ul: {
        paddingLeft: 18
    }
}

export default Home
