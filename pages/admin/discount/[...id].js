import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin';
import { Form } from '../../../components/layout/form/form';
import { Spinner1 } from '../../../components/layout/spinner';
import { MasterService } from '../../../lib/http';

export default function DiscountEdit() {
	const router = useRouter();
	const { query } = router;
	const [isLoading, setIsLoading] = useState(false);
	const [inputFields, setInputFields] = useState({});
	useEffect(() => {
		setIsLoading(true);

		async function fetch() {
			const request = {
				url: `discounts/${query.id[0]}`,
			};
			const discount = await MasterService(request)
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return err;
				});
			if (discount.status !== 200) {
				await router.push('/discount');
			}
			setInputFields({
				...inputFields,
				...{
					name: discount.data.name,
					description: discount.data.description,
					percent: discount.data.percent,
					is_active: discount.data.is_active,
				},
			});
		}

		fetch().then(() => setIsLoading(false));
	}, [router]);
	const data = {
		url: `${process.env.NEXT_PUBLIC_ENDPOINT_MASTER}/discounts/${query.id[0]}`,
		redirects: `/admin/discount`,
		module_name: `Discount`,
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

DiscountEdit.layout = AdminLayout;
