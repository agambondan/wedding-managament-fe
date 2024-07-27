import React from 'react';
import AdminLayout from '../../components/admin';
import { AdminContext } from '../../lib/const';

export default function Index() {
	const user = React.useContext(AdminContext);
	const givenName = user.person !== undefined ? user.person.given_name : '';
	const middleName = user.person !== undefined ? user.person.middle_name : '';
	return <>Dashboard</>;
}

Index.layout = AdminLayout;
