import EditorJS from "@editorjs/editorjs";

import Embed from '@editorjs/embed';
import PostSide from "./components/PostSide";
import '../../css/articles.css';
import Gallery from "./components/Gallery";
import List from "@editorjs/list";
import ArticlesBlock from "./components/ArticlesBlock";
import Image from "./components/Image";
import Swal from "sweetalert2";

const Header = require('@editorjs/header');

const csrfToken = document.querySelector('input[name="_token"]').getAttribute('value');
const fillData = document.querySelector('script[data-data]').dataset.data;
const articleId = document.querySelector('script[data-id]').dataset.id;

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
    data: JSON.parse(fillData.length ? fillData : '{}')
});


document.querySelector('#form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const fetchUri = fillData.length ? '/admin/articles/' + articleId : '/admin/articles';
    const fetchMethod = fillData.length ? 'PUT' : 'POST';

    const titleValue = document.querySelector('input[name="title"]').value;
    const data = await editorJs.save();
    const imageSrc = document.querySelector('input[name="image"]').value;

    const formData = new FormData;
    formData.append('title', titleValue);
    formData.append('description', JSON.stringify(data));
    formData.append('image', imageSrc);
    formData.append('_method', fetchMethod);

    const output = await fetch(fetchUri, {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRF-TOKEN': csrfToken,
            'accept': 'application/json'
        }
    })

    if (!output.ok) {
        const json = await output.json();

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: json.message,
        });
    } else {
        window.location.href = '/admin/articles';
    }
});