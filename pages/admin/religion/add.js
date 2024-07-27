import { useState } from 'react';
import AdminLayout from '../../../components/admin';
import { Form } from '../../../components/layout/form/form';

export default function ReligionAdd() {
	const [inputFields, setInputFields] = useState({
		religion_code: '',
		religion_name: '',
	});
	const data = {
		url: `${process.env.ENDPOINT_MASTER}/religions`,
		redirects: `/admin/religion`,
		module_name: `Religion`,
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

ReligionAdd.layout = AdminLayout;
