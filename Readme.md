# node-m3u

A node.js module for creating m3u / m3u8 files. Supported dialects are [m3u][],
[extended m3u][] and [http live streaming m3u][].

[m3u]: http://en.wikipedia.org/wiki/M3U
[extended m3u]: http://en.wikipedia.org/wiki/M3U#Extended_M3U_directives
[http live streaming m3u]:http://tools.ietf.org/html/draft-pantos-http-live-streaming

## Installation

    npm install m3u

## Usage

The default `Writer` class can be used to create basic m3u files:

    var writer = require('m3u').writer();

    // A comment.
    writer.comment('I am a comment');

    // An empty line.
    writer.write(); // blank line

    // A playlist item, usually a path or url.
    writer.file('foo.mp3');

    console.log(writer.toString());

The `ExtendedWriter` supports all methods of the normal `Writer`, as well as
additional capabilities defined by the extended m3u format.

    var writer = require('m3u').extendedWriter();

    // Adds a playlist item preceeded by an optional EXTINF tag for the duration.
    // and title of the item.
    writer.file('bar.mp3');
    writer.file('bar.mp3', 23);
    writer.file('bar.mp3', 23, 'Artist - Title');

    console.log(writer.toString());

The `HttpLiveStreamingWriter` supports all methods of the `ExtendedWriter`, as
well as additional capabilities defined by Apple:

    var writer = require('m3u').httpLiveStreamingWriter();

    // EXT-X-TARGETDURATION: Maximum media file duration.
    writer.targetDuration(10);

    // EXT-X-MEDIA-SEQUENCE: Sequence number of first file (optional).
    // (optional)
    writer.mediaSequence(0)

    // EXT-X-PROGRAM-DATE-TIME: The date of the program's origin, optional.
    // (optional)
    writer.programDateTime('2011-04-11T21:24:06Z');

    // EXT-X-ALLOW-CACHE: Set if the client is allowed to cache this m3u file.
    // (optional)
    writer.allowCache(true);
    writer.allowCache(false);

    // EXT-X-PLAYLIST-TYPE: Provides mutability information about the m3u file.
    // (optional)
    writer.playlistType('EVENT');
    writer.playlistType('VOD');

    // EXT-X-ENDLIST: Indicates that no more media files will be added to the m3u file.
    // (optional)
    writer.endlist();

    // EXT-X-VERSION: Indicates the compatibility version of the Playlist file.
    // (optional)
    writer.version(3);

    // Adds a playlist as the next item preceeded by an EXT-X-STREAM-INF tag.
    writer.playlist('another.m3u', {
      bandwidth: 3000000, // required
      programId: 1,
      codecs: ['avc1.42001e', 'mp4a.40.34'],
      resolution: '640x480',
    });

    console.log(writer.toString());

## Todo

Things I'm working on:

* npm package

## Contributing

Stuff I probably won't have time to do myself, and would love to get patches for:

* Implement the ability to read m3u files
* Support node.js's writeable stream interface for the writers
* `HttpLiveStreamingWriter#key()` (EXT-X-KEY)
* `HttpLiveStreamingWriter#discontinuity()` (EXT-X-DISCONTINUITY)
* Support JS date objects for `HttpLiveStreamingWriter#programDateTime()`

## License

node-m3u is licensed under the MIT license.
