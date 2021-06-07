import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Films = () => {
	const [films, setFilms] = useState({
		data: [],
		loading: false,
		error: ''
	});

	useEffect(() => {
		const fetchFilms = async () => {
			setFilms(prevState => ({
				...prevState,
				loading: true
			}));

			const url = `https://swapi.dev/api/films/`;
			const res = await axios.get(url);
			setFilms(prevState => ({
				...prevState,
				data: res.data.results,
				loading: false
			}));
		};
		fetchFilms();
	}, []);

	// const [search, setSearch] = useState('');

	// const handleSearch = e => {
	// 	setSearch(e.target.value);
	// };

	// let filteredFilms = films.data.filter(film => {
	// 	return film.title.toLowerCase().includes(search.toLowerCase());
	// });

	// const filmData = filteredFilms.map(film => {
	const filmsData = films.data.map(film => {
		return (
			<li key={film.episode_id}>
				<Link to={`/film/${film.title}`}>{film.title}</Link>
			</li>
		);
	});

	return (
		<>
			<h1>Starwars Film List</h1>
			{films.loading ? <p>Loading...</p> : <ul>{filmsData}</ul>}
		</>
	);
};

export default Films;
