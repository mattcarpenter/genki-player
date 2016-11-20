import React from 'react'

class Transport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progressWidth: 0,
      progressPosition: 0
    };
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.time !== this.props.time) {
      var constrainedCurrentTime = this.props.time > this.props.duration ? this.props.duration : this.props.time;
      this.setState({ progressPosition: constrainedCurrentTime * this.props.width / this.props.duration });
    }
  }

  containsSearchTerms(caption) {
    var found = false;
    return false;
    (caption.inverted || '').split(' ').forEach((word) => {
      (this.props.searchTerms || []).forEach((term) => {
        if (term === word) {
          found = true;
        }
      });
    });

    return found;
  }

  onVolumeChange(event) {
    this.props.onVolumeChange(Number(event.target.value));
  }

  render() {
    var segments = [];

    // build segments
    if (this.props.phrases && this.props.duration) { 
      this.props.phrases.forEach((phrase, index) => {
        // For this phrase, calculate the earliest start and latest end time of all words
        let start = Math.min.apply(null, phrase.words.map((w) => w.start));
        let end = Math.max.apply(null, phrase.words.map((w) => w.end));

        let left = start * this.props.width / this.props.duration;
        let right = (end * this.props.width / this.props.duration) + 1;

        segments.push(
          <div
            onClick={()=>this.props.onSeek(start)}
            key={index}
            style={{ ...styles.segment, left: left, width: right-left, backgroundColor: this.containsSearchTerms(phrase) ? '#efeab1' : '#F0F0F0' }}
            className="transport-segment">
          </div>
        );
      });
    }

    var playButtonClassname = 'fa fa-' + (this.props.playing ? 'pause' : 'play');

    // return transport container with segments and position indicator
    return (
      <div style={{ ...styles.container, width: this.props.width }}>
        <div style={{ ...styles.transport, width: this.props.width }}>
          {segments}
          <div style={{ ...styles.progress, left: this.state.progressPosition }}></div>
        </div>
        <div style={styles.controls}>
          <div style={styles.left}>
            <button
              style={styles.playButton}
              onClick={()=> this.props.onTogglePlaying()} >
                <i className={playButtonClassname} aria-hidden="true"></i>
            </button>
            <div style={styles.time}>
              {secondsToHms(this.props.time)} / {secondsToHms(this.props.duration)}
            </div>
          </div>
          <div style={styles.volumeContainer}>
            <div style={{ marginRight: 10 }}>
              <i className="fa fa-volume-up" aria-hidden="true"></i>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              width="120px"
              value={this.props.volume}
              onChange={(event) => this.onVolumeChange(event)} />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  time: {
    display: 'inline-block',
    fontSize: '0.92em'
  },
  volumeContainer: {
    width: '100px',
    display: 'flex'
  },
  playButton: {
    marginRight: 10,
    width: '27px'
  },
  transport: {
    borderWidth: 1.0,
    borderStyle: 'solid',
    borderColor: '#A0A0A0',
    height: 40,
    marginBottom: 10,
    position: 'relative'
  },
  left: {
    marginRight: 'auto'
  },
  controls: {
    padding: 5,
    borderStyle: 'solid',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    backgroundColor: '#FAFAFA',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  progress: {
    height: '38px',
    top: 0,
    backgroundColor: '#00FF00',
    width: '1px',
    position: 'absolute'
  },
  segment: {
    height: '38px',
    position: 'absolute',
    top: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderStyle: 'solid',
    borderColor: '#D9D9D9',
    cursor: 'pointer'
  }
};

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);
  return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}

export default Transport
