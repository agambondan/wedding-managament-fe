import { useState } from 'react';
import AdminLayout from '../../../components/admin';
import { Form } from '../../../components/layout/form/form';

export default function MultimediaTypeAdd() {
	const [inputFields, setInputFields] = useState({
		name: '',
		slug: '',
	});
	const data = {
		url: `${process.env.ENDPOINT_MASTER}/multimedia-types`,
		redirects: `/admin/multimedia-type`,
		module_name: `Multimedia Type`,
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

MultimediaTypeAdd.layout = AdminLayout;
