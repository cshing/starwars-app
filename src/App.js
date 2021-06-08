import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Films from './components/Films';
import FilmDetails from './components/FilmDetails/FilmDetails';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import PlanetDetails from './components/PlanetDetails/PlanetDetails';
import './App.css';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Films} />
				<Route exact path='/film/:title' component={FilmDetails} />
				<Route exact path='/character/:name' component={CharacterDetails} />
				<Route exact path='/planet/:name' component={PlanetDetails} />
			</Switch>
		</Router>
	);
}

export default App;
