import { useState } from 'react';
import AdminLayout from '../../../components/admin';
import { Form } from '../../../components/layout/form/form';

export default function DiscountAdd() {
	const [inputFields, setInputFields] = useState({
		name: '',
		description: '',
		percent: 1,
		is_active: false,
	});
	const data = {
		url: `${process.env.ENDPOINT_MASTER}/discounts`,
		redirects: `/admin/discount`,
		module_name: `Discount`,
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

DiscountAdd.layout = AdminLayout;
