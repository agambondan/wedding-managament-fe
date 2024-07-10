import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin';
import { AdminContext } from '../../lib/const';

export default function Index() {
	const [hadith, setHadith] = useState([]);

	useEffect(() => {
		fetchHadith();
	}, []);

	const fetchHadith = async () => {
		try {
			const response = await axios.get(
				'http://localhost:9900/books/bukhari?page=2&size=20'
			);
			setHadith(response.data);
		} catch (error) {
			console.error(error);
		}
	};
	console.log(hadith);
	const user = React.useContext(AdminContext);
	const givenName = user.person !== undefined ? user.person.given_name : '';
	const middleName = user.person !== undefined ? user.person.middle_name : '';
	return <>Dashboard</>;
}

Index.layout = AdminLayout;
