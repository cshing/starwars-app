import ListComponent from '../Common/ListComponent';

// React router Link passes down match, location props
// Use the props.location.state that has been passed down from Link state
const CharacterDetails = ({ location }) => {
	const character = location.state.list;

	const {
		name,
		height,
		mass,
		hair_color,
		skin_color,
		eye_color,
		birth_year,
		gender,
		homeworld,
		films,
		species,
		vehicles,
		starships
	} = character;

	return (
		<>
			<h1>Character Details Page</h1>
			<p>Name: {name}</p>
			<p>Height: {height}</p>
			<p>Mass: {mass}</p>
			<p>Hair Color: {hair_color}</p>
			<p>Skin Color: {skin_color}</p>
			<p>Eye Color: {eye_color}</p>
			<p>Birth Year: {birth_year}</p>
			<p>Gender: {gender}</p>

			<ListComponent listTitle='Homeworld' listEndpoints={homeworld} />
			<ListComponent listTitle='Films' listEndpoints={films} />
			<ListComponent listTitle='Species' listEndpoints={species} />
			<ListComponent listTitle='Vehicles' listEndpoints={vehicles} />
			<ListComponent listTitle='Starships' listEndpoints={starships} />
		</>
	);
};

export default CharacterDetails;
