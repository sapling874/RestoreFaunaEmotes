import argparse
import json
import os.path as op
import pathlib
import sys

parser = argparse.ArgumentParser()
parser.add_argument("filename", type=pathlib.Path)
args = parser.parse_args()

filename = args.filename
if not filename.is_file():
    print("Input file does not exist or is not a file")
    sys.exit(1)

# Output path in the chat_data directory.
out_filename = pathlib.Path("chat_data") / filename.name

chat_data = {}

with open(filename) as f:
    for line in f.readlines():
        chat_message = json.loads(line)

        if "addChatItemAction" not in chat_message["replayChatItemAction"]["actions"][0]:
            continue
        chat_action = chat_message["replayChatItemAction"]["actions"][0]["addChatItemAction"]
        if "liveChatTextMessageRenderer" not in chat_action["item"]:
            continue

        message = chat_action["item"]["liveChatTextMessageRenderer"]["message"]
        timestamp = chat_action["item"]["liveChatTextMessageRenderer"]["timestampUsec"]

        emojis = []
        if any("emoji" in run for run in message["runs"]):
            for run in message["runs"]:
                if "emoji" not in run:
                    continue
                if not run["emoji"].get("isCustomEmoji", False):
                    continue
                if len(run["emoji"]["shortcuts"]) == 1:
                    # This differentiates Fauna custom emotes
                    # from generic youtube custom emotes.
                    # Channel emotes have two shortcuts, e.g
                    # ":love:" and ":_love", youtube emotes
                    # only have one.
                    continue
                emoji = run["emoji"]
                name = emoji["shortcuts"][1].replace(":", "")
                emojis.append(name)

            if len(emojis) > 0:
                assert timestamp not in chat_data
                chat_data[timestamp] = emojis

print("Output file: ", out_filename)
print("Total messages stored: ", len(chat_data))

with open(out_filename, "w") as out:
    json.dump(chat_data, out)
