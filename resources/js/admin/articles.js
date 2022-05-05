import EditorJS from "@editorjs/editorjs";
const Header = require('@editorjs/header');
import Embed from '@editorjs/embed';
import PostSide from "./PostSide";
import '../../css/articles.css';
import Gallery from "./Gallery";
const csrfToken = document.querySelector('input[name="_token"]').getAttribute('value');
import List from "@editorjs/list";
import ArticlesBlock from "./ArticlesBlock";
import Image from "./Image";

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
        image: Image,
        list: {
            class: List,
            inlineToolbar: true,
            config: {
                defaultStyle: 'unordered'
            }
        },
        embed: Embed,
        side: {
            class: PostSide,
            inlineToolbar: true
        },
        gallery: Gallery,
        articlesBlock: ArticlesBlock
    },
});


document.querySelector('#form').addEventListener('submit', (event) => {
    event.preventDefault();

    editorJs.save().then(output => {
        console.log('Output', output);
    });
});
