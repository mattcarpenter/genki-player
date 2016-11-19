#!/usr/bin/python

import sys
import getopt

HELP_HINT = 'python import.py -a <audio url> -n <name> -t <transcript file>'

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
    print('loading....')

if __name__ == '__main__':
    main(sys.argv[1:])
