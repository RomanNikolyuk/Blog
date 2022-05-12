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

const data = document.querySelector('script[data-data]').dataset.data;
console.log(JSON.parse(data))
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
        gallery: Gallery,
        articlesBlock: ArticlesBlock,
        side: {
            class: PostSide,
            inlineToolbar: true
        }
    },
    data: JSON.parse(data)
});


document.querySelector('#form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const titleValue = document.querySelector('input[name="title"]').value;
    const data = await editorJs.save();
    const imageSrc = document.querySelector('input[name="image"]').value;

    const formData = new FormData;
    formData.append('title', titleValue);
    formData.append('description', JSON.stringify(data));
    formData.append('image', imageSrc);

    fetch('/admin/articles', {
        method: "POST",
        body: formData,
        headers: {
            'X-CSRF-TOKEN': csrfToken
        }
    })
        .then(output => window.location.href = '/admin/articles');
});
