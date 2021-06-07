import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DisplayError from './DisplayError';

const ListComponent = ({ listTitle, listEndpoints, withLink, pathname }) => {
	const [list, setList] = useState({
		data: [],
		loading: false,
		error: ''
	});

	useEffect(() => {
		const fetchMultiEndpoints = async () => {
			const results = [];
			const promises = listEndpoints.map(url => axios.get(url));
			const res = await Promise.all(promises);
			res.forEach(result => results.push(result.data));

			console.log('multiRes', results);

			setList(prevState => ({
				...prevState,
				data: results,
				loading: false
			}));
		};

		const fetchSingleEndpoint = async () => {
			const res = await axios.get(listEndpoints);
			console.log('singleRes', res);

			setList(prevState => ({
				...prevState,
				data: [res.data],
				loading: false
			}));
		};

		const fetchList = async () => {
			setList(prevState => ({
				...prevState,
				loading: true
			}));

			if (Array.isArray(listEndpoints)) {
				console.log('is array');
				fetchMultiEndpoints();
			} else {
				console.log('is NOT array');
				fetchSingleEndpoint();
			}
		};
		fetchList();
	}, [listEndpoints]);

	const listData = list.data.map(list => {
		const listItem = list.name || list.title;
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

			{list.loading ? (
				<p>Loading...</p>
			) : (
				<ul>{list.data.length > 0 ? listData : noData}</ul>
			)}

			{list.error && <DisplayError error={list.error} />}
		</>
	);
};

export default ListComponent;
