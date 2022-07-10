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
            image.addEventListener('change', (event) => this.uploadFile(event));
        } else {
            image = document.createElement('img');
            image.src = url;
            image.classList.add(this.imageClass);
        }

        return image;
    }

    uploadFile(event) {
        const file = event.target.files[0];
        const container = event.target.parentNode;
        // const removeIcon = Photo.removeButton();
        const formData = new FormData();
        formData.append('image', file);

        fetch('/admin/upload', {
            method: "POST",
            body: formData,
            headers: {
                'X-CSRF-TOKEN': this.csrfToken
            }
        }).then(async (response) => {
            if (response.ok) {
                return response.json();
            } else {
                const json = await output.json();

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: json.message,
                });
            }
        }).then(json => {
            event.target.remove();
            container.insertAdjacentHTML('afterbegin', `<img src="${json.file.url}" alt="" class="${this.imageClass}">`)
            // container.appendChild(removeIcon);
        });
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
