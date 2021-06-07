import { useState, useEffect } from 'react';
import axios from 'axios';
import ListComponent from '../Common/ListComponent';
import DisplayError from '../Common/DisplayError';

const initialState = {
	title: '',
	episode_id: '',
	director: '',
	producer: '',
	release_date: '',
	opening_crawl: '',
	characters: [],
	planets: [],
	starships: [],
	vehicles: [],
	species: []
	// loading: false,
	// error: ''
};

// React router pass two props to all the component - match, location
const FilmDetails = ({ match }) => {
	// const filmTitle = match.params.title;
	const { title: filmTitle } = match.params;

	const [filmDetails, setFilmDetails] = useState({
		//initialState});
		data: initialState,
		loading: false,
		error: ''
	});

	console.log('filmDetails:', filmDetails);

	useEffect(() => {
		const fetchFilmDetails = async () => {
			setFilmDetails(prevState => ({
				...prevState,
				loading: true
			}));

			const url = `https://swapi.dev/api/films/?search=${encodeURI(filmTitle)}`;
			const res = await axios.get(url);

			console.log('res', res);

			setFilmDetails(prevState => ({
				...prevState,
				data: res.data.results[0],
				loading: false
			}));
		};
		fetchFilmDetails();
	}, [filmTitle]);

	const { data, loading, error } = filmDetails;

	return (
		<>
			<h1>Film Details Page</h1>

			<h2>Metadata</h2>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					<p>Title: {data.title}</p>
					<p>Episode: {data.episode_id}</p>
					<p>Director: {data.director}</p>
					<p>Producer: {data.producer}</p>
					<p>Release Date: {data.release_date}</p>
					<p>Opening Crawl: {data.opening_crawl}</p>
				</>
			)}

			<ListComponent
				listTitle='Characters'
				listEndpoints={data.characters}
				withLink
				pathname='character'
			/>
			<ListComponent listTitle='Planets' listEndpoints={data.planets} />
			<ListComponent listTitle='Starships' listEndpoints={data.starships} />
			<ListComponent listTitle='Vehicles' listEndpoints={data.vehicles} />
			<ListComponent listTitle='Species' listEndpoints={data.species} />

			{error && <DisplayError error={error} />}
		</>
	);
};

export default FilmDetails;
