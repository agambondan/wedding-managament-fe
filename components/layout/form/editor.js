// if (typeof window !== 'undefined') {
//     require('tinymce/tinymce');
//     require('tinymce/themes/silver');
//     require('tinymce/plugins/advlist');
//     require('tinymce/plugins/autolink');
//     require('tinymce/plugins/lists');
//     require('tinymce/plugins/link');
//     require('tinymce/plugins/image');
//     require('tinymce/plugins/charmap');
//     require('tinymce/plugins/preview');
//     require('tinymce/plugins/anchor');
//     require('tinymce/plugins/searchreplace');
//     require('tinymce/plugins/visualblocks');
//     require('tinymce/plugins/code');
//     require('tinymce/plugins/fullscreen');
//     require('tinymce/plugins/insertdatetime');
//     require('tinymce/plugins/media');
//     require('tinymce/plugins/table');
//     require('tinymce/plugins/code');
//     require('tinymce/plugins/help');
//     require('tinymce/plugins/wordcount');
// }

import 'tinymce/plugins/wordcount';

import {Editor} from '@tinymce/tinymce-react';

export function RichEditor(props) {
    return (
        <>
            <Editor
                onEditorChange={props.handleChange}
                apiKey={"ftrrp4a2z0rbm0he1m8oxh3xbflieubcv5djulisisbc4wgr"}
                onInit={(evt, editor) => props.editorRef.current = editor}
                initialValue={props.description}
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    skin_url: '/assets/libs/tinymce/skins/ui/oxide',
                    content_css: '/assets/libs/tinymce/skins/content/default/content.min.css'
                    // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
            />
        </>
    );
}

// export function Asu(props) {
//     return (
//         <Editor
//             onInit={(evt, editor) => props.editorRef.current = editor}
//             initialValue={props.description}
//             onEditorChange={props.handleChange}
//             init={{
//                 height: 500,
//                 menubar: true,
//                 plugins: [
//                     'advlist autolink lists link image charmap print preview anchor',
//                     'searchreplace visualblocks code fullscreen',
//                     'insertdatetime media table paste code help wordcount'
//                 ],
//                 toolbar: 'undo redo | formatselect | ' +
//                     'bold italic backcolor | alignleft aligncenter ' +
//                     'alignright alignjustify | bullist numlist outdent indent | ' +
//                     'removeformat | help',
//                 skin_url: '/assets/libs/tinymce/skins/ui/oxide',
//                 content_css: '/assets/libs/tinymce/skins/content/default/content.min.css'
//             }}
//         />
//     )
// }

// export function AReactComponent(props) {
//     return (
//         <Editor
//             value={props.content}
//             onInit={(evt, editor) => props.editorRef.current = editor}
//             init={{
//                 height: 500,
//                 menubar: true,
//                 plugins: [
//                     'advlist autolink lists link image charmap print preview anchor',
//                     'searchreplace visualblocks code fullscreen',
//                     'insertdatetime media table paste code help wordcount'
//                 ],
//                 toolbar:
//                     'undo redo | formatselect | bold italic backcolor | \
//                     alignleft aligncenter alignright alignjustify | \
//                     bullist numlist outdent indent | removeformat | \
//                     table | help',
//                 skin_url: '/assets/libs/tinymce/skins/ui/oxide', // Static files path(step 2)
//                 content_css: '/assets/libs/tinymce/skins/content/default/content.min.css',  // Static files path(step 2)
//             }}
//             onEditorChange={props.handleChange}
//         />
//     );
// }
