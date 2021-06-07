import { useState, useEffect } from 'react';
import axios from 'axios';

const ListComponent = ({ listTitle, listEndpoints }) => {
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

			setList(prevState => ({
				...prevState,
				data: results,
				loading: false
			}));
		};

		const fetchSingleEndpoint = async () => {
			const res = await axios.get(listEndpoints);

			setList(prevState => ({
				...prevState,
				data: res.data.results,
				loading: false
			}));
		};

		const fetchList = async () => {
			setList(prevState => ({
				...prevState,
				loading: true
			}));

			if (Array.isArray(listEndpoints)) {
				fetchMultiEndpoints();
			} else {
				fetchSingleEndpoint();
			}
		};
		fetchList();
	}, [listEndpoints]);

	const listData = list.data.map(list => {
		// const { name } = list;
		// const name = list.name
		// console.log('@@@ list:', list);
		const listItem = list.name || list.title;
		return <li key={listItem}>{listItem}</li>;
	});

	return (
		<>
			<h2>{listTitle}</h2>
			{list.loading ? <p>Loading...</p> : <ul>{listData}</ul>}
		</>
	);
};

export default ListComponent;
