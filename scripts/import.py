#!/usr/bin/python

import sys
import getopt
import json
from lib import kakasi

HELP_HINT = 'python lib.py -a <audio url> -n <name> -t <transcript file>'

def main(argv):
    audio_url = ''
    name = ''
    transcript_file = ''

    try:
        opts, args = getopt.getopt(argv, 'a:n:t:', ['audio=','name=', 'transcript='])
    except getopt.GetoptError:
        print(HELP_HINT)
        sys.exit(2)

    for opt, arg in opts:
        if opt == '-a':
            audio_url = arg

        if opt == '-n':
            name = arg

        if opt == '-t':
            transcript_file = arg

    if audio_url != '' and name != '' and transcript_file != '':
        load(audio_url, name, transcript_file) 
    else:
        print(HELP_HINT)

def load(audio_url, name, transcript_file):
    fp = open(transcript_file, encoding='utf-8')
    transcript = json.load(fp)
    fp.close()

    out = []

    for result in transcript['results']:
        alternatives = result['alternatives']
        if len(alternatives) > 0:
            words = []
            confidence = alternatives[0]['confidence']
            transcript = alternatives[0]['transcript']
            for timestamp in alternatives[0]['timestamps']:
                inverted = kakasi.Kakasi().invert(timestamp[0])
                words.append({
                    'word': timestamp[0],
                    'inverted': inverted,
                    'start': timestamp[1],
                    'end': timestamp[2]
                })
            if confidence > 0.7:
                out.append({
                    'words': words,
                    'confidence': confidence,
                    'transcript': transcript
                })

    print(json.dumps(out))

if __name__ == '__main__':
    main(sys.argv[1:])
