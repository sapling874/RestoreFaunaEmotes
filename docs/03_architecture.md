## Extension architecture

The core component of the extension, is that it needs
to patch the page's `fetch` function to be able to
intercept the emote-less chat data that is served to it.

To do this, the main script needs to run in the `MAIN`
world rather than the usual isolated world of an extension.
The `manifest.json` file is set up to load code into the
correct worlds.

That code is able to patch the `fetch` function, but the
extension also needs a component running in the isolated
world because only here is it able to use the function
`browser.runtime.getURL` to get a URL to files shipped
with the extension (chat data, images).

There wasn't a generic way to do this between Firefox
and Chrome, so each takes a different approach.

In Firefox, all isolated code runs as content scripts
specific to each page. It is able to use the `exportFunction`
function to expose the functionality that is needed for
patching chat data into the MAIN world.

There are some issues with that, e.g async functions don't
work very well over that boundary, but it can be worked around.

In Chrome, there is no `exportFunction` and the alternative is
to use `sendMessage` to communicate between the MAIN world
and the isolated one. The only place to listen for those
messages though is in a background worker, so much of the
functionality in the Firefox content scripts code is moved
into the background worker.

Background workers don't have a persistent state, so instead
of loading in the chat data once and storing it, it is read
and parsed from the extension files with every request, at
the cost of a few milliseconds of latency added on to the
original fetch request.

