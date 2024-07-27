import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin';
import { Form } from '../../../components/layout/form/form';
import { Spinner1 } from '../../../components/layout/spinner';
import { MasterService } from '../../../lib/http';

export default function FeatureEdit() {
	const router = useRouter();
	const { query } = router;
	const [isLoading, setIsLoading] = useState(false);
	const [inputFields, setInputFields] = useState({});
	useEffect(() => {
		setIsLoading(true);

		async function fetch() {
			const request = {
				url: `features/${query.id[0]}`,
			};
			const feature = await MasterService(request)
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return err;
				});
			if (feature.status !== 200) {
				await router.push('/feature');
			}
			setInputFields({
				...inputFields,
				...{
					feature_code: feature.data.feature_code,
					feature_name: feature.data.feature_name,
				},
			});
		}

		fetch().then(() => setIsLoading(false));
	}, [router]);
	const data = {
		url: `${process.env.ENDPOINT_MASTER}/features/${query.id[0]}`,
		redirects: `/admin/feature`,
		module_name: `Feature`,
		title: `Update`,
		content_type: `application/json`,
		method: 'PUT',
	};
	if (isLoading) return <Spinner1 />;
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

FeatureEdit.layout = AdminLayout;
