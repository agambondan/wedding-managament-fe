import { useState } from 'react';
import AdminLayout from '../../../components/admin';
import { Form } from '../../../components/layout/form/form';

export default function StateProvinceAdd(props) {
	const [inputFields, setInputFields] = useState({
		code: '',
		name: '',
	});
	const data = {
		url: `${process.env.NEXT_PUBLIC_ENDPOINT_MASTER}/state-provinces`,
		redirects: `/admin/province`,
		module_name: `State Province`,
		title: `Save`,
		content_type: `application/json`,
		method: 'POST',
	};
	return (
		<>
			<Form
				inputFields={inputFields}
				setInputFields={setInputFields}
				data={data}
			/>
		</>
	);
}

StateProvinceAdd.layout = AdminLayout;
