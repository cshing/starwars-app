import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DisplayError from './DisplayError';

// I create this common ListComponent and intend to reuse this anywhere a list of items is required
// (ie. in film / character details page)
const ListComponent = ({ listTitle, listEndpoints, withLink, pathname }) => {
	// set up initial state for list
	const [list, setList] = useState({
		data: [],
		loading: false,
		error: ''
	});

	useEffect(() => {
		// fetch data from the array of endpoints, then set results to data and set loading to false
		const fetchMultiEndpoints = async () => {
			const results = [];
			const promises = listEndpoints.map(url => axios.get(url));
			const res = await Promise.all(promises);
			res.forEach(result => results.push(result.data));

			setList(prevState => ({
				...prevState,
				data: results,
				loading: false
			}));
		};

		// fetch data from the single endpoint, then set results to data and set loading to false
		const fetchSingleEndpoint = async () => {
			const res = await axios.get(listEndpoints);

			setList(prevState => ({
				...prevState,
				data: [res.data],
				loading: false
			}));
		};

		const fetchList = async () => {
			// initialize loading state to true
			setList(prevState => ({
				...prevState,
				loading: true
			}));

			try {
				// Since the data endpoints required for fetching subdata of a film/character can be a single URL or an array of URLs,
				// we need to first check if the listEndpoints is an array or not.
				// Then we can fetch data with either fetchMultiEndpoints or fetchSingleEndpoint
				if (Array.isArray(listEndpoints)) {
					fetchMultiEndpoints();
				} else {
					fetchSingleEndpoint();
				}
			} catch (error) {
				setList(prevState => ({
					...prevState,
					loading: false,
					error: 'Error retrieving subdata'
				}));
			}
		};
		fetchList();
	}, [listEndpoints]);
	// Include listEndpoints in the dependency array. useEffect depends on this listEndpoints.
	// Whenever listEndpoints changes, the useEffect hook is run again.

	const { data, loading, error } = list;

	const listData = data.map(list => {
		const listItem = list.name || list.title;

		// if both withLink and pathname props are passed down, then display Link component, if not display a plain li
		// saving the list object as state so the list data are retrievable in the Details Page by clicking this anchor link.
		return withLink && pathname ? (
			<li key={listItem}>
				<Link to={{ pathname: `/${pathname}/${listItem}`, state: { list } }}>
					{listItem}
				</Link>
			</li>
		) : (
			<li key={listItem}>{listItem}</li>
		);
	});

	const noData = <li>No data available for {listTitle.toLowerCase()}</li>;

	return (
		<>
			<h2>{listTitle}</h2>

			{loading || data.length == 0 ? (
				<p>Loading...</p>
			) : (
				<ul>{data.length > 0 ? listData : noData}</ul>
			)}

			{error && <DisplayError error={error} />}
		</>
	);
};

export default ListComponent;
