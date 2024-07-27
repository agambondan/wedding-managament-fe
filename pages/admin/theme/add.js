import { useRef, useState } from 'react';
import AdminLayout from '../../../components/admin';
import { RichEditor } from '../../../components/layout/form/editor';
import { Form } from '../../../components/layout/form/form';

export default function ThemeAdd() {
	const editorRef = useRef('');
	const [inputFields, setInputFields] = useState({
		name: '',
		html: '',
		description: '',
	});
	const data = {
		url: `${process.env.ENDPOINT_MASTER}/themes`,
		redirects: `/admin/theme`,
		module_name: `Theme`,
		title: `Save`,
		content_type: `application/json`,
		method: 'POST',
	};
	const handleChangeWYSIWYG = () => {
		setInputFields({ ...inputFields, html: editorRef.current.getContent() });
	};
	return (
		<>
			<Form inputFields={inputFields} setInputFields={setInputFields} data={data}>
				<div className={'py-2 my-1 text-2xl'}>HTML</div>
				<RichEditor
					description={inputFields.html}
					editorRef={editorRef}
					handleChange={handleChangeWYSIWYG}
				/>
			</Form>
		</>
	);
}

ThemeAdd.layout = AdminLayout;
