import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin';
import { Form } from '../../../components/layout/form/form';
import { Spinner1 } from '../../../components/layout/spinner';
import { MasterService } from '../../../lib/http';

export default function CityEdit() {
	const router = useRouter();
	const { query } = router;
	const [isLoading, setIsLoading] = useState(false);
	const [stateProvince, setStateProvince] = useState([{ id: '', name: '' }]);
	const [inputFields, setInputFields] = useState({});
	useEffect(() => {
		setIsLoading(true);

		async function fetch() {
			let size = 10;
			let sort = 'sort';
			const request = {
				url: `cities/${query.id[0]}`,
			};
			const city = await MasterService(request)
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return err;
				});
			if (city.status !== 200) {
				await router.push('/city');
			}
			setInputFields({
				...inputFields,
				...{
					code: city.data.code,
					name: city.data.name,
					id: city.data.id,
				},
			});
			request.url = `state-provinces?size=${size}`;
			const province = await MasterService(request)
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return err;
				});
			request.url = `state-provinces?size=${province.data.total}&sort=code,name,${sort}&fields=id,name`;
			const provinces = await MasterService(request)
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return err;
				});
			if (provinces.data.items.length !== 0) {
				setStateProvince([]);
			}
			provinces.data.items.map((item) => {
				setStateProvince((prevState) => [
					...prevState,
					{
						id: item.id,
						name: item.name,
					},
				]);
			});
		}

		fetch().then(() => setIsLoading(false));
	}, []);
	const data = {
		url: `${process.env.NEXT_PUBLIC_ENDPOINT_MASTER}/cities/${query.id[0]}`,
		redirects: `/admin/city`,
		module_name: `City`,
		title: `Update`,
		content_type: `application/json`,
		method: 'PUT',
	};
	let selectItem = {
		province: stateProvince,
	};
	if (isLoading) return <Spinner1 />;
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

CityEdit.layout = AdminLayout;
