## Data processing

### Data format

The raw chat data is multiple tens of gigabytes,
far to much to fit inside an extension. It does
compress very well, but still not enough and most
of the data is irrelevant anyway.

The only data needed is a unique identifier per
message, and the emotes that were used in that message.
Any messages without emotes can be discarded.

Each message does have a true UID that identifies it,
but these are long and take up a lot of space. Instead,
the message timestamps can be used. These come in the
format of microsecond precision unix time, which is enough
that even in a data set of millions of messages there
are only a handful of collisions.

To handle those collisions, they can be stored separately
and the true UID used to differentiate them.

For the emote data, they can either be stored as a list
of emotes in the order they were used in a message, for
example `["clover", "snail"]`. Or to reduce the amount of
data further, messages that use all the same emote can be
reduced to a single integer encoding that emote.

As an example, any number of `"lol"` emotes in a message
are reduced to a single `0` that is then understood by
the extension when decoding to mean any number of `lol`s.
That common understanding is between the files
[encode.py](../scripts/encode.py) and
[decode.js](../src/common/decode.js).

Thus, the processed data format look like:
```json
{
    "collisions": {
        "1676942325123456": {
            "<unique-id-1>": 0,
            "<unique-id-1>": 1
        }
    },
    "messages": {
        "1676934000000000": 1,
        "1676934000000123": ["clover", "snail"],
        ...
    }
}
```

This is then compressed when building the extension, to further
reduce the size of any emotes which weren't encoded. But the main
size reduction actually comes from the timestamps, as they share
a lot of leading digits they compress very well, with only the
millisecond and microsecond level digits acting as the "random"
element of the identifier.

### Processing the raw data

The file `scripts/encode.py` needs to be set up with the
names of the emotes as they are represented in the chat data.

Any combinations of different emotes that are commonly used
can also be given an integer encoding.

Then to actually process the raw data, use the makefile

```
$ make process_raw_data
```

This will run each file in the `raw_chat_data` directory through
the `process.py` script, outputting a file in the `chat_data` directory.

The data should then be compressed with `make compress_chat_data` and
then it can be built with `make firefox` or `make chrome`.

That will output a zip file that you can load into a browser
(with extension developer tools enabled).

