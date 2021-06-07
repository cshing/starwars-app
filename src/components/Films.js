import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DisplayError from './Common/DisplayError';

const Films = () => {
	const [films, setFilms] = useState({
		data: [],
		loading: false,
		error: ''
	});

	const [search, setSearch] = useState('');

	const handleSearch = e => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		const fetchFilms = async () => {
			setFilms(prevState => ({
				...prevState,
				loading: true
			}));

			const url = `https://swapi.dev/api/films/`;
			const res = await axios.get(url);
			console.log('filmsRes', res);
			setFilms(prevState => ({
				...prevState,
				data: res.data.results,
				loading: false
			}));
		};
		fetchFilms();
	}, []);

	let filteredFilms = films.data.filter(film => {
		return film.title.toLowerCase().includes(search.toLowerCase());
	});

	const filmsData = filteredFilms.map(film => {
		return (
			<li key={film.episode_id}>
				<Link to={`/film/${film.title}`}>{film.title}</Link>
			</li>
		);
	});

	return (
		<>
			<h1>Starwars Film List</h1>
			<span>
				Search: <input value={search} onChange={e => handleSearch(e)} />
			</span>
			{films.loading ? <p>Loading...</p> : <ul>{filmsData}</ul>}
			{films.error && <DisplayError error={films.error} />}
		</>
	);
};

export default Films;
