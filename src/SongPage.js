import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defImage from './default-image_600.png';
import './songpage.css';

const SongPage = (props) => {
	const [ lyric, setLyrics ] = useState('');
	const [ copyRight, setCopyright ] = useState(null);
	const [ artist, setArtist ] = useState('');
	const [ cover, setCover ] = useState('');
	const [ albumTitle, setAlbumTitle ] = useState('');
	const [ songTitle, setSongTitle ] = useState('');

	useEffect(() => {
		const trackId = props.location && props.location.state ? props.location.state.trackId : '';

		const songTrack = props.location && props.location.state ? props.location.state.songName : '';

		if (!trackId && !songTrack) {
			return;
		}

		fetch(`/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${process.env.REACT_APP_API_KEY_MUSICMATCH}`)
			.then((response) => response.json())
			.then(
				(data) => {
					const words = data.message.body.lyrics;
					setLyrics(words.lyrics_body);
					setCopyright(words.lyrics_copyright);

					return fetch(
						`/ws/1.1/track.search?q_track=${songTrack}&apikey=${process.env.REACT_APP_API_KEY_MUSICMATCH}`
					)
						.then((res) => res.json())
						.then((data) => {
							const songName = data.message.body.track_list;
							setSongTitle(songName[0].track.track_name);
						});
				},
				[ props.location ]
			);
	});

	useEffect(
		() => {
			const abortControlledApi = new AbortController();
			const signal = abortControlledApi.signal;

			const album = props.location && props.location.state ? props.location.state.album : '';

			if (!album) {
				return;
			}

			fetch(
				`/2.0/?method=album.search&album=${album}&api_key=${process.env.REACT_APP_API_KEY_LASTFM}&format=json`,
				{ signal: signal }
			)
				.then((res) => res.json())
				.then((data) => {
					const albumInfo = data.results.albummatches.album[0];
					console.log(albumInfo);
					if (typeof albumInfo !== 'undefined') {
						setCover(albumInfo.image[3]['#text']);
						setArtist(albumInfo.artist);
						setAlbumTitle(albumInfo.name);
					} else {
						setCover(defImage);
					}
				});

			return function cleanUp() {
				abortControlledApi.abort();
			};
		},
		[ props.location ]
	);

	return (
		<div className="song-title">
			<div className="song-title-card">
				<h1 className="song-title">{songTitle}</h1>
				<div className="song-text">
					<pre className="lyrics">
						{lyric !== '' ? lyric : copyRight === '' ? 'no lyrics on the database' : copyRight}
					</pre>
					<button className="btn-get-song">Get your song via Email</button>

					<Link to="/">
						<button>Back to the HomePage</button>
					</Link>
				</div>
				<p className="cover-art">
					<img src={cover} alt="album cover" />
					<p className="cover-art-info">{artist}</p>
					<p className="cover-art-info">{albumTitle}</p>
				</p>
			</div>
		</div>
	);
};

export default SongPage;
