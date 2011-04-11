var common = require('../common');
var assert = common.assert;
var fixture = common.helper.fixture;

var writer = common.m3u.httpLiveStreamingWriter();
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

// Adds a playlist as the next item preceeded by an EXT-X-STREAM-INF tag.
writer.playlist('simple.m3u', {
  bandwidth: 3000000,
  programId: 1,
});

writer.playlist('another.m3u', {
  bandwidth: 3000000, // required
  programId: 1,
  codecs: ['avc1.4d001e', 'mp4a.40.5'],
  resolution: '640x480',
});

// EXT-X-ENDLIST: Indicates that no more media files will be added to the m3u file.
// (optional)
writer.endlist();

// EXT-X-VERSION: Indicates the compatibility version of the Playlist file.
// (optional)
writer.version(3);

fixture.compare(writer, 'http_live_streaming_writer.m3u8');
