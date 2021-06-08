import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DisplayError from './Common/DisplayError';

const Films = () => {
	// set up initial state for films
	const [films, setFilms] = useState({
		data: [],
		loading: false,
		error: ''
	});

	useEffect(() => {
		const fetchFilms = async () => {
			// initialize loading state to true
			setFilms(prevState => ({
				...prevState,
				loading: true
			}));

			try {
				// fetch data from films endpoint with axios, then set results to data and set loading to false
				const url = `https://swapi.dev/api/films/`;
				const res = await axios.get(url);
				setFilms(prevState => ({
					...prevState,
					data: res.data.results,
					loading: false
				}));
			} catch (error) {
				setFilms(prevState => ({
					...prevState,
					loading: false,
					error: 'Error retrieving films data'
				}));
			}
		};
		fetchFilms();
	}, []);

	const { data, loading, error } = films;

	const [search, setSearch] = useState('');

	// taking the event property from the DOM, setSearch with the search value
	const displaySearch = e => {
		setSearch(e.target.value);
	};

	// filter film list according to search value
	let filteredFilms = data.filter(film => {
		return film.title.toLowerCase().includes(search.toLowerCase());
	});

	// taking the filteredFilms, map it in a way we want it to display with the anchor link component
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
			<>
				Search: <input value={search} onChange={e => displaySearch(e)} />
			</>
			{loading ? <p>Loading...</p> : <ul>{filmsData}</ul>}
			{error && <DisplayError error={error} />}
		</>
	);
};

export default Films;
