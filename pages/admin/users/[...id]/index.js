import { useState } from 'react';
import AdminLayout from '../../../../components/admin';
import { Form } from '../../../../components/layout/form/form';
import { MasterService } from '../../../../lib/http';

export default function UserEdit(props) {
	const [inputFields, setInputFields] = useState({
		user_code: props.data.user_code,
		user_name: props.data.user_name,
		id: props.data.id,
	});
	const data = {
		url: `${process.env.ENDPOINT_MASTER}/${props.data.id}`,
		redirects: `/admin/user`,
		module_name: `User`,
		title: `Update`,
		content_type: `application/json`,
		method: 'PUT',
	};
	let selectItem = {
		province: props.provinces,
	};
	return (
		<>
			<Form
				inputFields={inputFields}
				setInputFields={setInputFields}
				data={data}
				select={selectItem}
			/>
		</>
	);
}

UserEdit.layout = AdminLayout;

export async function getServerSideProps(context) {
	const { req, query } = context;
	let size = 1;
	let sort = 'sort';
	let request = {
		url: `state-provinces?size=${size}`,
		headers: {
			Cookie: `token=${req.cookies.token}`,
		},
	};
	const province = await MasterService(request)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
	if (province.status !== 200) {
		return {
			redirect: {
				permanent: false,
				destination: '/admin',
			},
		};
	}
	request.url = `${query.id[0]}`;
	const user = await MasterService(request);
	request.url = `state-provinces?size=${province.data.total}&sort=code,name,${sort}&fields=id,name`;
	const provinces = await MasterService(request);
	return {
		props: {
			data: user.data,
			provinces: provinces.data.items,
		}, // will be passed to the page component as props
	};
}
