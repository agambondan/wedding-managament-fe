import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin';
import { Form } from '../../../components/layout/form/form';
import { Spinner1 } from '../../../components/layout/spinner';
import { MasterService } from '../../../lib/http';

export default function EventEdit() {
	const router = useRouter();
	const { query } = router;
	const [isLoading, setIsLoading] = useState(false);
	const [inputFields, setInputFields] = useState({});
	useEffect(() => {
		setIsLoading(true);

		async function fetch() {
			const request = {
				url: `events/${query.id[0]}`,
			};
			const event = await MasterService(request)
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return err;
				});
			if (event.status !== 200) {
				await router.push('/event');
			}
			setInputFields({
				...inputFields,
				...{
					event_code: event.data.event_code,
					event_name: event.data.event_name,
					short_description: event.data.short_description,
					description: event.data.description,
				},
			});
		}

		fetch().then(() => setIsLoading(false));
	}, [router]);
	const data = {
		url: `${process.env.ENDPOINT_MASTER}/events/${query.id[0]}`,
		redirects: `/admin/event`,
		module_name: `Event`,
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

EventEdit.layout = AdminLayout;
