import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Films from './components/Films';
import FilmDetails from './components/FilmDetails/FilmDetails';
import CharacterDetails from './components/CharacterDetails/CharacterDetails';
import './App.css';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Films} />
				<Route exact path='/film/:title' component={FilmDetails} />
				<Route exact path='/character/:name' component={CharacterDetails} />
			</Switch>
		</Router>
	);
}

export default App;
