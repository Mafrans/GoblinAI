import goblinai
import argparse

argParser = argparse.ArgumentParser()
argParser.add_argument("-m", "--mode", type=str, default="production")
argParser.add_argument("-D", "--dev", action="store_true")
argParser.add_argument("--ngrok-token", type=str)

args = argParser.parse_args()

if __name__ == '__main__':
    goblinai.start(
        mode="development" if args.dev else args.mode,
        ngrokToken=args.ngrok_token
    )