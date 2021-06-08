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
};

// React router Link passes down match, location props
// Using props.match.params here which will later be used for url matching
const FilmDetails = ({ match }) => {
	// Rename title to filmTitle
	const { title: filmTitle } = match.params;

	// set up initial state for filmDetails
	const [filmDetails, setFilmDetails] = useState({
		data: initialState,
		loading: false,
		error: ''
	});

	useEffect(() => {
		const fetchFilmDetails = async () => {
			// initialize loading state to true
			setFilmDetails(prevState => ({
				...prevState,
				loading: true
			}));

			try {
				// fetch data from the film endpoint with the search param which is available from the api for looking up specific film by film title,
				// then set results to data and set loading to false
				const url = `https://swapi.dev/api/films/?search=${encodeURI(
					filmTitle
				)}`;
				const res = await axios.get(url);
				setFilmDetails(prevState => ({
					...prevState,
					data: res.data.results[0],
					loading: false
				}));
			} catch (error) {
				setFilmDetails(prevState => ({
					...prevState,
					loading: false,
					error: 'Error retrieving film details'
				}));
			}
		};
		fetchFilmDetails();
	}, [filmTitle]);
	// Include filmTitle in the dependency array. useEffect depends on this filmTitle.
	// Whenever filmTitle changes (on the url), the useEffect hook is run again.

	const { data, loading, error } = filmDetails;

	const {
		title,
		episode_id,
		director,
		producer,
		release_date,
		opening_crawl,
		characters,
		planets,
		starships,
		vehicles,
		species
	} = data;

	return (
		<>
			<h1>Film Details Page</h1>

			<h2>Metadata</h2>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					<p>Title: {title}</p>
					<p>Episode: {episode_id}</p>
					<p>Director: {director}</p>
					<p>Producer: {producer}</p>
					<p>Release Date: {release_date}</p>
					<p>Opening Crawl: {opening_crawl}</p>
				</>
			)}

			<ListComponent
				listTitle='Characters'
				listEndpoints={characters}
				withLink
				pathname='character'
			/>
			<ListComponent
				listTitle='Planets'
				listEndpoints={planets}
				withLink
				pathname='planet'
			/>
			<ListComponent listTitle='Starships' listEndpoints={starships} />
			<ListComponent listTitle='Vehicles' listEndpoints={vehicles} />
			<ListComponent listTitle='Species' listEndpoints={species} />

			{error && <DisplayError error={error} />}
		</>
	);
};

export default FilmDetails;
