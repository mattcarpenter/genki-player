#!/usr/bin/python

import pexpect
import os

child = pexpect.spawn('java -Dkakasi.home=' + os.getcwd() + '/lib/bin -jar lib/bin/kakasi.jar -JH -iUTF-8 -oUTF-8')

class Kakasi:
    def invert_tokens(self, tokens):
        def parse_token(token):
            child.sendline(token)
            child.expect('\n')
            return child.readline().decode('utf-8').strip()
        return [parse_token(token) for token in tokens]

    def invert(self, phrase):
        child.sendline(phrase)
        child.expect('\n')
        return child.readline().decode('utf-8').strip()