import React from 'react'
import YouTube from 'react-youtube'
import Transport from './Transport'
import CaptionsContainer from '../containers/CaptionsContainer'
import ReactPlayer from 'react-player'

const PLAYER_WIDTH = 640;

class Recording extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: 0,
      progress: 0,
      playing: false
    };
  }

  componentDidMount() {
    this.props.fetchRecording(this.props.recordingId);
  }

  onDuration(duration) {
    this.setState({ duration: duration });
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
    this.player.seekTo(time / this.state.duration);
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.player}>
          <ReactPlayer
            url={(this.props.recordingData || {}).url}
            progressFrequency={10}
            width={PLAYER_WIDTH}
            controls={true}
            height="auto"
            onDuration={this.onDuration.bind(this)}
            onProgress={this.onProgress.bind(this)}
            playing={this.state.playing}
            onPlay={this.onPlay.bind(this)}
            ref={(player) => this.player = player}
          />
        </div>
        <Transport
          phrases={(this.props.recordingData || {}).phrases}
          duration={this.state.duration}
          time={this.state.progress * this.state.duration}
          width={PLAYER_WIDTH}
          onSeek={this.seek.bind(this)}
        />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },

  player: {
    position: 'relative'
  }
};

export default Recording
