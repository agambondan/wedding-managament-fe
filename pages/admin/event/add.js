import { useState } from 'react';
import AdminLayout from '../../../components/admin';
import { Form } from '../../../components/layout/form/form';

export default function EventAdd() {
	const [inputFields, setInputFields] = useState({
		event_code: '',
		event_name: '',
		short_description: '',
		description: '',
	});
	const data = {
		url: `${process.env.ENDPOINT_MASTER}/events`,
		redirects: `/admin/event`,
		module_name: `Event`,
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

EventAdd.layout = AdminLayout;
