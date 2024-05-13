import React from 'react';
import { Editor } from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import './styles.scss';
import styles from './styles.module.scss';

const CustomCKEditor = (props) => {
    const editorConfiguration = {
        fontSize: {
            options: [
                9,
                10,
                11,
                12,
                13,
                'default',
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                26,
                28,
                36,
                48,
                72,
            ]
        },
        toolbar: {
            items: [
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
        placeholder: 'Content here...',
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
            <div className={styles.mainWrap}>
                <div className={styles.begin}>
                    <CKEditor
                        editor={Editor} // phiên bản của CKEditor đang sử dụng
                        config={editorConfiguration}
                        data={props.data} // Dữ liệu hiện tại của trường content được truyền vào CKEditor.
                        onChange={props.onChange} // cập nhật nội dung mới vào state 
                        value={props.value}
                        errors={props.errors}
                    />
                </div>
            </div>
        </>
    )
}

export default CustomCKEditor;
