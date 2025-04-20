## Raw data

For this to work, the raw chat data of all livestreams is needed,
gathered before emotes are removed.

The tool [yt-dlp](https://github.com/yt-dlp/yt-dlp) can be used
to do this.

The data collected here should go in a directory `raw_chat_data`
in the top level of this repository.

Start by fetching a list of all video IDs from the channel.

```
$ yt-dlp --flat-playlist --print "%(id)s;%(title)s" https://www.youtube.com/channel/UCO_aKKYxn4tvrqPjcTzZ6EQ | tee all_titles.txt | cut -d';' -f1 | tee all_ids.txt
```

This produces two files, one with video IDs and titles purely
for information, and one which is just the list of video IDs.

The download speed for just one chat file is fairly low as it
needs to be downloaded in small, sequential chunks. To speed
things up, split into multiple batches to download in parallel.

```
$ split -d -n l/10 all_ids.txt batch
```

The output of this is 10 files, `batch00` to `batch09`,
each with one tenth of the list of IDs.

Then to actually download the chat data, start up 10 new terminals
and run with one batch file in each:

```
$ yt-dlp --no-overwrites --write-subs --skip-download --sub-langs live_chat -o '%(id)s' --batch-file ../batch00
```

and so on for each batch file. This will still probably
take several hours, so go do something else.

Some videos might need to be signed in to download (e.g age
restricted or otherwise), the `--cookies-from-browser` flag
can be used to do that, although it seems to stop working
partway through a long list of IDs. Possibly only a short
lifetime on the cookies? Just keep retrying.

To confirm that all files are downloaded, take a diff between
the actual files and the IDs list.

```
$ diff -u <(ls *.live_chat.json | cut -c 1-11 | sort) <(cat all_ids.txt | sort) | less
```

Use the file with titles to figure out why some files might be
missing, e.g chat is disabled on a particular stream or video
is a short.

