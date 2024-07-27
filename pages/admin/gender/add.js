import { useState } from 'react';
import AdminLayout from '../../../components/admin';
import { Form } from '../../../components/layout/form/form';

export default function GenderAdd() {
	const [inputFields, setInputFields] = useState({
		code: 0,
		name: '',
	});
	const data = {
		url: `${process.env.NEXT_PUBLIC_ENDPOINT_MASTER}/genders`,
		redirects: `/admin/gender`,
		module_name: `Gender`,
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

GenderAdd.layout = AdminLayout;
