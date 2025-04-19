# Emotes in order of descending usage,
# to prioritise encoding the most used
# emotes as a single character.
encoding = {
    "lol": 0,
    "love": 1,
    "clover": 2,
    "flushed": 3,
    "yay": 4,
    "dead": 5,
    "yandere": 6,
    "noo": 7,
    "cry": 8,
    "comfy": 9,
    "zoom": 10,
    "hugsnail": 11,
    "bald": 12,
    "wide1": 13,
    "wide2": 14,
    "wide3": 15,
    "UUU": 16,
    "UUUU": 17,
    "slap": 18,
    "wave": 19,
    "shy": 20,
    "disgust": 21,
    "pien": 22,
    "angry": 23,
    "smug": 24,
    "tako": 25,
    "smile": 26,
    "bonk": 27,
    "innocent": 28,
    "sleep": 29,
    "nemusmug": 30,
    "doki": 31,
    "pinklight": 32,
    "greenlight": 33,

    # Common multi-emote messages.
    ("wide1", "wide2", "wide3"): 40,
    ("pinklight", "yay", "greenlight"): 41,
    ("pinklight", "love", "greenlight"): 42,
    ("pinklight", "lol", "greenlight"): 43,
}

# Encode a list of emotes in a message.
def encode_emotes(emotes):
    # All are the same emote.
    if len(set(emotes)) == 1:
        return encoding[emotes[0]]

    # Known multi-emote message.
    if tuple(emotes) in encoding:
        return encoding[tuple(emotes)]

    # Otherwise, just return the list.
    return emotes
