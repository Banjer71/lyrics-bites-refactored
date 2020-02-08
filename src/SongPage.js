import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SongPage = props => {
  const [lyric, setLyrics] = useState("");
  const [copyRight, setCopyright] = useState(null);
  const [artist, setArtist] = useState("");
  const [cover, setCover] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [songTitle, setSongTitle] = useState("");

  useEffect(() => {
    const trackId =
      props.location && props.location.state
        ? props.location.state.trackId
        : "";

    const songTrack =
      props.location && props.location.state
        ? props.location.state.songName
        : "";

    if (!trackId && !songTrack) {
      return;
    }

    const musixmatch =
      "https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1";

    fetch(
      `${musixmatch}/track.lyrics.get?track_id=${trackId}&apikey=${process.env.REACT_APP_API_KEY_MUSICMATCH}`
    )
      .then(response => response.json())
      .then(
        data => {
          const words = data.message.body.lyrics;
          setLyrics(words.lyrics_body);
          setCopyright(words.lyrics_copyright);

          return fetch(
            `${musixmatch}/track.search?q_track=${songTrack}&apikey=${process.env.REACT_APP_API_KEY_MUSICMATCH}`
          )
            .then(res => res.json())
            .then(data => {
              const songName = data.message.body.track_list;
              setSongTitle(songName[0].track.track_name);
            });
        },

        [props.location]
      );
  });

  useEffect(() => {
    const abortControlledApi = new AbortController();
    const signal = abortControlledApi.signal;

    const album =
      props.location && props.location.state ? props.location.state.album : "";

    if (!album) {
      return;
    }
    const lastfm = `https://cors-anywhere.herokuapp.com/http://ws.audioscrobbler.com/2.0/?method=album.search&album=`;
    fetch(
      `${lastfm}${album}&api_key=${process.env.REACT_APP_API_KEY_LASTFM}&format=json`,
      { signal: signal }
    )
      .then(res => res.json())
      .then(data => {
        const albumCover = data.results.albummatches.album[0].image[2]["#text"];
        const artist = data.results.albummatches.album[0].artist;
        const albumName = data.results.albummatches.album[0].name;
        setCover(albumCover);
        setArtist(artist);
        setAlbumTitle(albumName);
      });

    //not sure this is workinf well but I will test it more
    return function cleanUp() {
      abortControlledApi.abort();
    };
  }, [props.location]);

  return (
    <div className="song-title">
      <div className="song-title-card">
      <h1>{songTitle}</h1>
        <div className="song-text">
        
          <pre className="lyrics">
            {lyric !== ""
              ? lyric
              : copyRight === ""
              ? "no lyrics on the database"
              : copyRight}
          </pre>
          <button className="btn-get-song">Get your song via Email</button>
          <br />
          <Link to="/">
            <button>Back to the HomePage</button>
          </Link>
        </div>
        <div className="cover-art">
          <img src={cover} alt="" />
          <p>{artist}</p>
          <p>{albumTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default SongPage;
