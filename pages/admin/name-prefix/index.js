import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin';
import { Table } from '../../../components/layout/form/table';
import { Spinner1 } from '../../../components/layout/spinner';
import { MasterService } from '../../../lib/http';

export default function NamePrefixIndex() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([
		{
			id: '',
			name_prefix_code: '',
			name_prefix_name: '',
			created_at: '',
			gender: '',
			action: '',
			gender_id: '',
		},
	]);
	useEffect(() => {
		setIsLoading(true);
		const { query } = router;
		let size = '10';
		let page = '0';
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
			url: `name-prefixes?size=${size}&page=${page}&sort=${sort}`,
		};

		async function fetch() {
			await MasterService(request)
				.then((res) => {
					if (res.data.items.length !== 0) {
						setData([]);
					}
					console.log(res.data)
					res.data.items.map((item) => {
						let gender = {
							id: '',
							name: '',
						};
						if (item.gender !== undefined) {
							gender = item.gender;
						}
						let date = new Date(item.created_at);
						setData((prevData) => [
							...prevData,
							{
								id: item.id,
								name_prefix_code: item.name_prefix_code,
								name_prefix_name: item.name_prefix_name,
								created_at: date.toLocaleString(),
								gender: gender.name,
								action: '',
								gender_id: gender.id,
							},
						]);
					});
					return res;
				})
				.catch((err) => {
					return err;
				});
		}

		fetch().then(() => setIsLoading(false));
	}, [router]);
	const detail = {
		redirects: `/admin/name-prefix/add`,
	};
	console.log(data);
	if (isLoading) return <Spinner1 />;
	return (
		<>
			<Table data={data} detail={detail} />
		</>
	);
}

NamePrefixIndex.layout = AdminLayout;
