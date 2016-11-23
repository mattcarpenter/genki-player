import React from 'react'
import YouTube from 'react-youtube'
import Transport from './Transport'
import Captions from '../containers/CaptionsContainer'
import ReactPlayer from 'react-player'
import SearchResult from './SearchResult'

class Recording extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      playing: false,
      width: 640,
      searchResults: []
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('willReceivePrps', this.props, nextProps);
    if (this.props.recordingId !== nextProps.recordingId) {
      // initialize and kick off loading of new props
      this.setState({
        progress: 0,
        playing: false
      });

      this.props.fetchRecording(nextProps.recordingId);
    }

    if (nextProps.searchResults !== this.state.searchResults) {
      this.setState({ searchResults: nextProps.searchResults });
    }
  }

  componentWillMount() {
    this.props.fetchRecording(this.props.recordingId);
  }

  componentDidMount() {
    this.setState({ width: Math.min(640, $('.container').innerWidth()) - 20 });
  }

  componentWillUnmount() {
    this.props.clearRecording();
  }

  onProgress(progress) {
    if (progress.played) {
      this.setState({ progress: progress.played });
    }
  }

  onPlay() {
    this.setState({ playing: true });
  }

  seek(time) {
    this.player.seekTo(time / this.props.duration);
  }

  onTogglePlaying() {
    if (!this.state.playing) {
      this.setState({ playing: true });
    } else {
      this.setState({ playing: false });
    }
  }

  onVolumeChange(volume) {
    this.props.setVolume(volume);
  }

  render() {

    var searchResults = [];
    var searchContainer = [];
    (this.state.searchResults || []).forEach((result, index) => {
      searchResults.push(
        <SearchResult
          key={index}
          recording={result}
        />
      );
    });

    if (searchResults.length > 0) {
      searchContainer.push(
        <div key="0" style={styles.results}>
          <h5>Search Results</h5>
          <ul style={styles.ul}>
            {searchResults}
          </ul>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <div style={styles.player}>
          <ReactPlayer
            url={(this.props.recordingData || {}).url}
            progressFrequency={10}
            width={this.state.width}
            controls={false}
            height={30}
            onProgress={this.onProgress.bind(this)}
            playing={this.state.playing}
            onPlay={this.onPlay.bind(this)}
            ref={(player) => this.player = player}
            volume={this.props.volume}
          />
        </div>
        <Transport
          phrases={(this.props.recordingData || {}).phrases}
          duration={this.props.duration}
          time={this.state.progress * this.props.duration}
          width={this.state.width}
          onSeek={this.seek.bind(this)}
          playing={this.state.playing}
          onTogglePlaying={this.onTogglePlaying.bind(this)}
          volume={this.props.volume}
          onVolumeChange={this.onVolumeChange.bind(this)}
          searchTerms={(this.props.location.query.words || '').split(',')}
        />
        <Captions
          phrases={(this.props.recordingData || {}).phrases}
          time={this.state.progress * this.props.duration}
          width={this.state.width}
        />
        {searchContainer}
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  player: {
    display: 'none'
  },

  results: {
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    borderStyle: 'solid'
  }
};

export default Recording
