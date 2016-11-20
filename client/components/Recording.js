import React from 'react'
import YouTube from 'react-youtube'
import Transport from './Transport'
import Captions from './Captions'
import ReactPlayer from 'react-player'

class Recording extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: 0,
      progress: 0,
      playing: false,
      width: 640
    };
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
            width={this.state.width}
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
          width={this.state.width}
          onSeek={this.seek.bind(this)}
          playing={this.state.playing}
          onTogglePlaying={this.onTogglePlaying.bind(this)}
          volume={this.props.volume}
          onVolumeChange={this.onVolumeChange.bind(this)}
        />
        <Captions
          phrases={(this.props.recordingData || {}).phrases}
          time={this.state.progress * this.state.duration}
          width={this.state.width}
        />
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
  }
};

export default Recording
