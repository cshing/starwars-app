import ListComponent from '../Common/ListComponent';

// React router Link passes down match, location props
// Use the props.location.state that has been passed down from Link state
const PlanetDetails = ({ location }) => {
	const planet = location.state.list;

	const {
		name,
		rotation_period,
		orbital_period,
		diameter,
		climate,
		gravity,
		terrain,
		surface_water,
		population,
		residents,
		films
	} = planet;

	return (
		<>
			<h1>Planet Details Page</h1>
			<p>Name: {name}</p>
			<p>Rotation Period: {rotation_period}</p>
			<p>Orbital Period: {orbital_period}</p>
			<p>Diameter: {diameter}</p>
			<p>Climate: {climate}</p>
			<p>Gravity: {gravity}</p>
			<p>Terrain: {terrain}</p>
			<p>Surface Water: {surface_water}</p>
			<p>Population: {population}</p>

			<ListComponent listTitle='Residents' listEndpoints={residents} />
			<ListComponent listTitle='Films' listEndpoints={films} />
		</>
	);
};

export default PlanetDetails;
