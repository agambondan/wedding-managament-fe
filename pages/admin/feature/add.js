import { useState } from 'react';
import AdminLayout from '../../../components/admin';
import { Form } from '../../../components/layout/form/form';

export default function FeatureAdd() {
	const [inputFields, setInputFields] = useState({
		feature_code: '',
		feature_name: '',
	});
	const data = {
		url: `${process.env.NEXT_PUBLIC_ENDPOINT_MASTER}/features`,
		redirects: `/admin/feature`,
		module_name: `Feature`,
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

FeatureAdd.layout = AdminLayout;
