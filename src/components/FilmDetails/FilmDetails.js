import { useState, useEffect } from 'react';
import axios from 'axios';
// import Characters from './Characters';
import ListComponent from '../Common/ListComponent';

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
};

// React router pass two props to all the component - match, location
const FilmDetails = ({ match }) => {
	// const filmTitle = match.params.title;
	const { title: filmTitle } = match.params;

	const [filmDetails, setFilmDetails] = useState({
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

	return (
		<>
			<h1>Film Details Page</h1>
			<h2>Metadata</h2>
			{filmDetails.loading ? (
				<p>Loading...</p>
			) : (
				<>
					<p>Title: {filmDetails.data.title}</p>
					<p>Episode: {filmDetails.data.episode_id}</p>
					<p>Director: {filmDetails.data.director}</p>
					<p>Producer: {filmDetails.data.producer}</p>
					<p>Release Date: {filmDetails.data.release_date}</p>
					<p>Opening Crawl: {filmDetails.data.opening_crawl}</p>
				</>
			)}

			{/* <Characters charactersUrlArr={filmDetails.data.characters} /> */}
			
			<ListComponent
				listTitle='Characters'
				listEndpoints={filmDetails.data.characters}
				withLink
				pathname='character'
			/>
			<ListComponent
				listTitle='Planets'
				listEndpoints={filmDetails.data.planets}
			/>
			<ListComponent
				listTitle='Starships'
				listEndpoints={filmDetails.data.starships}
			/>
			<ListComponent
				listTitle='Vehicles'
				listEndpoints={filmDetails.data.vehicles}
			/>
			<ListComponent
				listTitle='Species'
				listEndpoints={filmDetails.data.species}
			/>
		</>
	);
};

export default FilmDetails;
