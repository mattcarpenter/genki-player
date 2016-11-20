import React from 'react'
import YouTube from 'react-youtube'
import Transport from './Transport'
import Captions from './Captions'
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
    return (
      <div style={styles.container}>
        <div style={styles.player}>
          <ReactPlayer
            url={(this.props.recordingData || {}).url}
            progressFrequency={10}
            width={PLAYER_WIDTH}
            controls={false}
            height={30}
            onDuration={this.onDuration.bind(this)}
            onProgress={this.onProgress.bind(this)}
            playing={this.state.playing}
            onPlay={this.onPlay.bind(this)}
            ref={(player) => this.player = player}
            volume={this.props.volume}
          />
        </div>
        <Transport
          phrases={(this.props.recordingData || {}).phrases}
          duration={this.state.duration}
          time={this.state.progress * this.state.duration}
          width={PLAYER_WIDTH}
          onSeek={this.seek.bind(this)}
          playing={this.state.playing}
          onTogglePlaying={this.onTogglePlaying.bind(this)}
          volume={this.props.volume}
          onVolumeChange={this.onVolumeChange.bind(this)}
        />
        <Captions
          phrases={(this.props.recordingData || {}).phrases}
          time={this.state.progress * this.state.duration}
          width={PLAYER_WIDTH}
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
    display: 'none'
  }
};

export default Recording
