import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin';
import { Table } from '../../../components/layout/form/table';
import { Spinner1 } from '../../../components/layout/spinner';
import { MasterService } from '../../../lib/http';

export default function CityIndex() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([
		{
			id: '',
			code: '',
			name: '',
			created_at: '',
			province: '',
			action: '',
			id: '',
		},
	]);
	useEffect(() => {
		setIsLoading(true);
		const { query } = router;
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
			url: `cities?size=${size}&page=${page}&sort=${sort}`,
		};

		async function fetch() {
			await MasterService(request)
				.then((res) => {
					if (res.data.items.length !== 0) {
						setData([]);
					}
					res.data.items.map((item) => {
						let stateProvince = {
							id: '',
							name: '',
						};
						if (item.province !== undefined) {
							stateProvince = item.province;
						}
						let date = new Date(item.created_at);
						setData((prevData) => [
							...prevData,
							{
								id: item.id,
								code: item.code,
								name: item.name,
								created_at: date.toLocaleString(),
								province: stateProvince.name,
								action: '',
								id: stateProvince.id,
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
		redirects: `/admin/city/add`,
	};
	if (isLoading) return <Spinner1 />;
	return <Table data={data} detail={detail} />;
}

CityIndex.layout = AdminLayout;
