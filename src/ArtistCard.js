import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './artistcard.css';

const ArtistCard = ({ track }) => {
	const [ cover, setCover ] = useState('');

	useEffect(
		() => {
			let albumName = track.album_name;
			let name = albumName.replace(/ /gi, '%20');

			const lastfm = `https://cors-anywhere.herokuapp.com/http://ws.audioscrobbler.com/2.0/?method=album.search&album=${name}&api_key=${process
				.env.REACT_APP_API_KEY_LASTFM}&format=json`;

			fetch(lastfm)
				.then((res) => res.json())
				.then((data) => {
					const albumCover = data.results.albummatches.album[0].image[3]['#text'];
					setCover(albumCover);
				})
				.catch((err) => console.log(err));
		},
		[ track.album_name ]
	);

	return (
		<div className="card">
			<h2 className="card-artist">{track.artist_name}</h2>
			<p className='card-info-album'>Album: {track.album_name}</p>
			<p className="album-cover">
				<img src={cover} alt="pic" />
			</p>

			<p className='card-info-album track-name'>Track: {track.track_name}</p>
			{/* <p className='card-info-album'>Track: {track.track_id}</p> */}
			<button type="submit" className="btn-lyrics">
				<Link
					to={{
						pathname: '/SongPage',
						state: {
							trackId: track.track_id,
							album: track.album_name,
							songName: track.track_name
						}
					}}
				>
					Get Lyrics
				</Link>
			</button>
		</div>
	);
};

export default ArtistCard;
