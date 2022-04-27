import EditorJS from "@editorjs/editorjs";
const Header = require('@editorjs/header');
import ImageTool from '@editorjs/image';
import Embed from '@editorjs/embed';
import PostSide from "./PostSide";
import '../../css/articles.css';
const csrfToken = document.querySelector('input[name="_token"]').getAttribute('value');

const editorJs = new EditorJS({
    holder: 'description',
    tools: {
        header: {
            class: Header,
            config: {
                levels: [1, 2, 3, 4, 5],
                defaultLevel: 2,
                placeholder: 'Enter a level'
            }
        },
        image: {
            class: ImageTool,
            config: {
                endpoints: {
                    byFile: '/admin/upload'
                },
                additionalRequestHeaders: {
                    'X-CSRF-TOKEN': csrfToken
                }
            },
        },
        embed: Embed,
        tImage: PostSide
    },
});


document.querySelector('#form').addEventListener('submit', (event) => {
    event.preventDefault();

    editorJs.save().then(output => {
        console.log('Output', output);
    });
});
