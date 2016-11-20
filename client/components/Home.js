import React from 'react'
import { connect } from 'react-redux'
import SearchContainer from '../containers/SearchContainer'
import SearchResult from './SearchResult'

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAll();
    }

    render() {
        var recordings = [];

        (this.props.recordings || []).forEach((recording, index) => {
            recordings.push(
                <SearchResult
                    key={index}
                    recording={recording}
                />
            );
        });

        return (
            <div>
                <SearchContainer/>
                <div style={styles.all}>
                    <ul>
                        {recordings}
                    </ul>
                </div>
            </div>
        );
    }
}

const styles = {
    all: {
    }
}

export default Home
