import GalleryImage from '../../../images/icons8-gallery-80.png';
import Photo from "./components/Photo";
import _ from "lodash";
import Button from "./components/Button";
import Swal from "sweetalert2";

class GalleryBlock {
    inputClass = 'gallery__input';
    containerClass = 'gallery__container';
    imageClass = 'gallery__image';
    csrfToken = document.querySelector('input[name="_token"]').getAttribute('value')

    constructor({data}) {
        this.data = data;
        this.wrapper = document.createElement('div');
    }

    static get toolbox() {
        return {
            title: 'Gallery',
            icon: `<img src="${GalleryImage}" alt=""/>`
        }
    }

    render() {
        let row = document.createElement('div');
        let plusButton = Button.getPlusButton(this.render.bind(this));

        if (_.isEmpty(this.data.urls)) {
            row.appendChild(this.generateImage());
            row.appendChild(this.generateImage());
        }

        this.data.urls?.forEach(url => {
            row.appendChild(this.generateImage(url));
        });

        this.data.urls = [];

        document.querySelector('.plus__button')?.remove();

        this.wrapper.classList.add('gallery__wrapper');

        row.classList.add('gallery__row');

        this.wrapper.appendChild(row);
        this.wrapper.appendChild(plusButton);

        return this.wrapper;
    }

    generateImage(url = "") {
        let image = undefined;

        if (url === "") {
            image = document.createElement('input');
            image.type = 'file';
            image.addEventListener('change', Photo.uploadFile.bind(this));
        } else {
            image = document.createElement('img');
            image.src = url;
            image.classList.add(this.imageClass);
        }

        return image;
    }

    save(blockContent) {
        const images = blockContent.querySelectorAll('.gallery__image');
        const output = {
            urls: []
        };
        images?.forEach(image => output.urls.push(image.src));

        return output;
    }

    validate(saveData) {
        if (!saveData) {
            return false;
        }

        if (saveData.urls.length < 2) {
            return false;
        }

        return true;
    }
}

export default GalleryBlock;
