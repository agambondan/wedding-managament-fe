import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin';
import { Form } from '../../../components/layout/form/form';
import { Spinner1 } from '../../../components/layout/spinner';
import { MasterService } from '../../../lib/http';

export default function NamePrefixEdit(props) {
	const router = useRouter();
	const { query } = router;
	const [isLoading, setIsLoading] = useState(false);
	const [gender, setGender] = useState([{ id: '', name: '' }]);
	const [inputFields, setInputFields] = useState({});
	useEffect(() => {
		setIsLoading(true);

		async function fetch() {
			let size = 10;
			let sort = 'sort';
			const request = {
				url: `name-prefixes/${query.id[0]}`,
			};
			const namePrefix = await MasterService(request)
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return err;
				});
			if (namePrefix.status !== 200) {
				await router.push('/name-prefixes');
			}
			setInputFields({
				...inputFields,
				...{
					name_prefix_code: namePrefix.data.name_prefix_code,
					name_prefix_name: namePrefix.data.name_prefix_name,
					id: namePrefix.data.id,
				},
			});
			request.url = `genders?size=${size}`;
			const gender = await MasterService(request)
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return err;
				});
			request.url = `genders?size=${gender.data.total}&sort=code,name,${sort}&fields=id,name`;
			const genders = await MasterService(request)
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return err;
				});
			if (genders.data.items.length !== 0) {
				setGender([]);
			}
			genders.data.items.map((item) => {
				setGender((prevState) => [
					...prevState,
					{
						id: item.id,
						name: item.name,
					},
				]);
			});
		}

		fetch().then(() => setIsLoading(false));
	}, [router]);
	const data = {
		url: `${process.env.ENDPOINT_MASTER}/name-prefixes/${query.id[0]}`,
		redirects: `/admin/name-prefix`,
		module_name: `Name Prefix`,
		title: `Update`,
		content_type: `application/json`,
		method: 'PUT',
	};
	let selectItem = {
		gender: gender,
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

NamePrefixEdit.layout = AdminLayout;
