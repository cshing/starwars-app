import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Characters = ({ charactersUrlArr }) => {
	// rename characters props to charactersUrl
	const [characters, setCharacters] = useState({
		data: [],
		loading: false,
		error: ''
	});

	console.log('characters:', characters);

	useEffect(() => {
		const fetchCharacters = async () => {
			setCharacters(prevState => ({
				...prevState,
				loading: true
			}));
			const results = [];
			const promises = charactersUrlArr.map(url => axios.get(url));
			const res = await Promise.all(promises);
			res.forEach(result => results.push(result.data));

			console.log('results:', results);

			setCharacters(prevState => ({
				...prevState,
				data: results,
				loading: false
			}));
		};
		fetchCharacters();
	}, [charactersUrlArr]); // why need to add charactersUrls here? React Hook useEffect has a missing dependency: 'charactersUrls'. Either include it or remove the dependency array

	const charactersData = characters.data.map(character => {
		const { name } = character;
		// const name = character.name

		return (
			// <li key={name}>{name}</li>;
			<li key={name}>
				<Link to={{ pathname: `/character/${name}`, state: { character } }}>
					{name}
				</Link>
			</li>
		);
	});

	return (
		<>
			<h2>Characters</h2>
			{characters.loading ? <p>Loading...</p> : <ul>{charactersData}</ul>}
		</>
	);
};

export default Characters;
