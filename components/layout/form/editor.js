import { Editor } from '@tinymce/tinymce-react';

export function RichEditor(props) {
	return (
		<>
			<Editor
				onEditorChange={props.handleChange}
				onInit={(evt, editor) => (props.editorRef.current = editor)}
				value={props.description}
				tinymceScriptSrc={
					'https://cdn.tiny.cloud/1/v6lx3ohrair0pthr5tn6ex0uqnicspn03xbbpnyip45t3jm7/tinymce/6/tinymce.min.js'
				}
				init={{
					height: 500,
					selector: 'textarea',
					plugins: [
						'advlist autolink lists link image charmap print preview anchor',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table paste code help wordcount',
					],
					toolbar:
						'undo redo | formatselect | ' +
						'bold italic backcolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help',
					toolbar_mode: 'floating',
					tinycomments_mode: 'embedded',
					tinycomments_author: 'Author name',
					skin_url: '/assets/libs/tinymce/skins/ui/oxide',
					content_css: '/assets/libs/tinymce/skins/content/default/content.min.css',
				}}
			/>
		</>
	);
}
