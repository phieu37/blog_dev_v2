import React from 'react';
import { Editor, EditorConfig } from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

const CustomCKEditor = (props) => {
    const editorConfiguration = {
        toolbar: {
            items: [
                // 'exportPDF', 'exportWord', '|',
                'findAndReplace', 'selectAll', '|',
                'heading', '|',
                'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
                'bulletedList', 'numberedList', 'todoList', '|',
                'outdent', 'indent', '|',
                'undo', 'redo',
                '-',
                'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
                'alignment', '|',
                'link', 'uploadImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
                'specialCharacters', 'horizontalLine', 'pageBreak', '|',
                'textPartLanguage', '|',
                'sourceEditing'
            ],
            // shouldNotGroupWhenFull: true
        },
        language: 'en',
        image: {
            toolbar: [
                'imageTextAlternative',
                'toggleImageCaption',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
                'linkImage'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableCellProperties',
                'tableProperties'
            ]
        },
        // tắt thông báo lỗi widget-toolbar-no-items {toolbarId: 'mediaEmbed'}
        removePlugins: ["MediaEmbedToolbar"],
        mediaEmbed: {
            previewsInData: true
        }
    };

    return (
        <>
            <div className='card'>
                {/* begin::Editor */}
                <div className='mx-auto'>
                    <CKEditor
                        editor={Editor} // phiên bản của CKEditor đang sử dụng
                        config={editorConfiguration}
                        data={props.data} // Dữ liệu hiện tại của trường content được truyền vào CKEditor.
                        onChange={props.onChange} // cập nhật nội dung mới vào state 
                        value={props.value}
                        errors={props.errors}
                    // onReady={editor => {
                    //     // You can store the "editor" and use when it is needed.
                    //     console.log('Editor is ready to use!', editor);
                    // }}
                    // onChange={(event, editor) => {
                    //     const data = editor.getData();
                    //     console.log({ event, editor, data });
                    // }}
                    // onBlur={(event, editor) => {
                    //     console.log('Blur.', editor);
                    // }}
                    // onFocus={(event, editor) => {
                    //     console.log('Focus.', editor);
                    // }}
                    />
                </div>
                {/* end::Editor */}
            </div>
        </>
    )
}

export default CustomCKEditor;
