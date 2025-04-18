import argparse
import json
import os.path as op
import pathlib
import sys

import encode

parser = argparse.ArgumentParser()
parser.add_argument("filename", type=pathlib.Path)
args = parser.parse_args()

filename = args.filename
if not filename.is_file():
    print("Input file does not exist or is not a file")
    sys.exit(1)

# Output path in the chat_data directory.
out_filename = pathlib.Path("chat_data") / filename.name

collisions = {}
chat_data = {}

def parse(renderer):
    timestamp = renderer["timestampUsec"]

    if "message" not in renderer:
        # Happens with superchats with no message.
        return timestamp, []

    message = renderer["message"]

    emotes = []
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
            emotes.append(name)

    return timestamp, emotes

with open(filename) as f:
    for line in f.readlines():
        chat_message = json.loads(line)

        action = chat_message["replayChatItemAction"]["actions"][0]
        if not "addChatItemAction" in action:
            continue
        item = action["addChatItemAction"]["item"]
        if "liveChatTextMessageRenderer" in item:
            # Parse a normal chat message.
            message_renderer = item["liveChatTextMessageRenderer"]
            timestamp, emotes = parse(message_renderer)
        elif "liveChatMembershipItemRenderer" in item:
            # Membership message.
            message_renderer = action["addChatItemAction"]["item"]["liveChatMembershipItemRenderer"]
            timestamp, emotes = parse(message_renderer)
        elif "liveChatPaidMessageRenderer" in item:
            # Superchat message.
            message_renderer = item["liveChatPaidMessageRenderer"]
            timestamp, emotes = parse(message_renderer)
        else:
            continue


        if len(emotes) > 0:
            message_uid = message_renderer["id"]
            if timestamp not in collisions:
                collisions[timestamp] = {}
            collisions[timestamp][message_uid] = encode.encode_emotes(emotes)

            if timestamp in chat_data or len(collisions[timestamp]) > 1:
                # This message timestamp collides with another.
                # Remove it from the chat data but keep in collisions.
                del chat_data[timestamp]
                continue
            chat_data[timestamp] = encode.encode_emotes(emotes)

# Any timestamps that appear in both the chat_data
# and collisions dicts, weren't actually collisions.
# Remove them, leaving only the actual collisions.
for k in list(collisions.keys()):
    if k in chat_data:
        del collisions[k]

print("Output file: ", out_filename)
print("Total messages stored: ", len(chat_data))
print("Total collisions: ", len(collisions))

out_data = {
    "collisions": collisions,
    "messages": chat_data,
}

with open(out_filename, "w") as out:
    json.dump(out_data, out)
