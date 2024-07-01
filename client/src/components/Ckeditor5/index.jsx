import React from 'react';
import { Editor } from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import './styles.scss';
import styles from './styles.module.scss';

const CustomCKEditor = (props) => {
    const editorConfiguration = {
        toolbar: {
            items: [
                'findAndReplace', 'selectAll', '|',
                'heading', '|',
                'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
                'bulletedList', 'numberedList', 'todoList', '|',
                'alignment', '|',
                'outdent', 'indent', '|',
                'undo', 'redo',
                'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
                'sourceEditing',
                '-',
                'link', 'uploadImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
                'specialCharacters', 'horizontalLine', 'pageBreak', '|',
                'textPartLanguage',
            ],
            shouldNotGroupWhenFull: true
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
        },
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
            ]
        },
        fontFamily: {
            options: [
                'default',
                'Arial, Helvetica, sans-serif',
                'Courier New, Courier, monospace',
                'Georgia, serif',
                'Lucida Sans Unicode, Lucida Grande, sans-serif',
                'Tahoma, Geneva, sans-serif',
                'Times New Roman, Times, serif',
                'Trebuchet MS, Helvetica, sans-serif',
                'Verdana, Geneva, sans-serif'
            ],
            // supportAllValues: true
        },
        fontSize: {
            options: [
                // 9,
                10,
                // 11,
                12,
                // 13,
                'default',
                // 15,
                16,
                // 17,
                18,
                // 19,
                20,
                // 21,
                // 22,
                // 23,
                24,
                // 26,
                // 28,
                36,
                48,
                // 72,
            ],
            supportAllValues: true
        },
        link: {
            decorators: {
                addTargetToExternalLinks: true,
                defaultProtocol: 'https://',
                toggleDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'file'
                    }
                }
            }
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
                        // onChange={(event, editor) => {
                        //     const data = editor.getData();
                        //     console.log({ event, editor, data });
                        // }}
                        // onBlur={(event, editor) => {
                        //     // console.log('Blur.', editor);
                        //     event.preventDefault();
                        // }}
                        // onFocus={(event, editor) => {
                        //     // console.log('Focus.', editor);
                        //     event.preventDefault();

                        // }}
                        // onMouseDown={(e) => e.preventDefault()}
                    />
                </div>
            </div>
        </>
    )
}

export default CustomCKEditor;
