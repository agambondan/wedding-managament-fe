import AdminLayout from '../../../components/admin';
import { Table } from '../../../components/layout/form/table';
import { formatDate } from '../../../lib/helper';
import { UserService } from '../../../lib/http';

export default function UserIndex(props) {
	let data = [];
	if (props.data.items.length === 0) {
		const obj = {
			id: 'dummy',
			full_name: '',
			gender: '',
			religion: '',
			is_activated: '',
			activated_at: '',
			created_at: '',
			role: '',
			action: '',
		};
		data.push(obj);
	} else {
		data = props.data.items.map((item) => {
			let full_name, gender, religion, role;
			if (item.role !== undefined) {
				role = item.role.name;
			}
			if (item.person !== undefined) {
				full_name = item.person.given_name + ' ' + item.person.middle_name;
				if (item.person.name_prefix !== undefined) {
					full_name = item.person.name_prefix.name_prefix_code + '. ' + full_name;
				}
			}
			if (item.person.gender !== undefined) {
				gender = item.person.gender.name;
			}
			if (item.person.religion !== undefined) {
				religion = item.person.religion.religion_code;
			}
			let createdAt = new Date(item.created_at);
			let activatedAt = new Date(item.activated_at);
			let lastLogin = new Date(item.last_login);
			let lastAccess = new Date(item.last_access);
			return {
				id: item.id,
				full_name: full_name,
				gender: gender,
				religion: religion,
				is_activated: item.is_activated,
				activated_at: activatedAt.toLocaleString(),
				last_login: lastLogin.toLocaleString(),
				last_access: formatDate(lastAccess),
				created_at: createdAt.toLocaleString(),
				role: role,
				action: '',
			};
		});
	}
	const detail = {
		redirects: `/admin/user/add`,
	};
	return (
		<>
			<Table data={data} detail={detail} />
		</>
	);
}

UserIndex.layout = AdminLayout;

export async function getServerSideProps(context) {
	const { req, query } = context;
	let size = 10;
	let page = 0;
	let sort = 'sort';
	if (query.size !== undefined) {
		size = query.size;
	}
	if (query.page !== undefined) {
		page = query.page;
	}
	if (query.sort !== undefined) {
		sort = query.sort;
	}
	const request = {
		url: `?size=${size}&page=${page}&sort=${sort}`,
		headers: {
			Cookie: `token=${req.cookies.token}`,
		},
	};
	const response = await UserService(request)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
	if (response.status !== 200) {
		return {
			redirect: {
				permanent: false,
				destination: '/admin',
			},
		};
	}
	return {
		props: {
			data: response.data,
		}, // will be passed to the page component as props
	};
}
