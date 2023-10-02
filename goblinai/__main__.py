#!/usr/bin/env python
# PYTHON_ARGCOMPLETE_OK

import goblinai
import argparse
import argcomplete

argParser = argparse.ArgumentParser()
argParser.add_argument("-m", "--mode", type=str, default="production")
argParser.add_argument("-D", "--dev", action="store_true")
argParser.add_argument("--ngrok-token", type=str)

argcomplete.autocomplete(argParser)
args = argParser.parse_args()


def main():
    goblinai.start(
        mode="development" if args.dev else args.mode, ngrokToken=args.ngrok_token
    )


if __name__ == "__main__":
    main()
