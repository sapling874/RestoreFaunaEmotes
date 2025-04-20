from collections import Counter, namedtuple

# Buckets of 5 seconds.
round_factor = 5*1e6

RankedBucket = namedtuple("RankedBucket", ["timestamp", "total", "most_common", "counter"])

def get_highlights(chat_data, timestamps_to_offsets):
    buckets = {}

    def ts_to_offset(ts):
        for (t, o) in timestamps_to_offsets:
            if ts < int(t):
                return int(o)//1000 - 10

    max_offset = max(int(item[1])//1000 for item in timestamps_to_offsets)
    max_offset_hours = max_offset/3600

    # No highlights closer than 5 minutes.
    # For streams longer than 3 hours, scales up to 10 minutes at 12 hours.
    near_factor_minutes = 5 + 5*max((max_offset_hours-3)/9, 0)
    near_factor_us = near_factor_minutes*60*1e6

    for ts, emote in chat_data.items():
        if type(emote) != int:
            continue
        ts = int(ts)
        rounded_ts = int((ts // round_factor) * round_factor)

        if rounded_ts not in buckets:
            buckets[rounded_ts] = Counter()

        buckets[rounded_ts][emote] += 1

    ranked_buckets = sorted([RankedBucket(ts, c.total(), c.most_common(1)[0][0], c) for ts, c in buckets.items()], key=lambda x: -x[1])

    selected_highlights = []
    for bucket in ranked_buckets:
        if len(selected_highlights) > 9:
            break

        offset = ts_to_offset(bucket.timestamp)

        # Ignore beginning and end of stream.
        if offset < 300 or (max_offset-offset) < 300:
            continue

        time_diffs = [abs(b.timestamp-bucket.timestamp) for b in selected_highlights]
        too_near = any(d<near_factor_us for d in time_diffs)
        if too_near:
            continue

        selected_highlights.append(bucket)

    return {ts_to_offset(hl.timestamp): hl.most_common for hl in selected_highlights}
