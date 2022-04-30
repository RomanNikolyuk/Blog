import GalleryImage from '../../images/icons8-gallery-80.png';
import removeImg from '../../images/icons8-remove-32.png';

class Gallery {
    csrfToken = document.querySelector('input[name="_token"]').getAttribute('value');
    static get toolbox() {
        return {
            title: 'Gallery',
            icon: `<img src="${GalleryImage}" alt=""/>`
        }
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('gallery__wrapper');

        const container1 = this.#generateContent();
        const container2 = this.#generateContent();
        const input = document.createElement('input');
        input.classList.add('gallery__caption');

        wrapper.appendChild(container1);
        wrapper.appendChild(container2);

        return wrapper;
    }

    #generateContent(needContainer = true) {
        const container = document.createElement('div');
        container.classList.add('gallery__container');

        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.classList.add('gallery__input');
        input.addEventListener('change', this.uploadFile.bind(this));

        container.appendChild(input);
        return needContainer ? container : input;
    }

    uploadFile(event) {
        const file = event.target.files[0];
        const container = event.target.parentNode;
        const removeIcon = document.createElement('img');
        removeIcon.setAttribute('src', removeImg);
        removeIcon.classList.add('gallery__remove-icon');
        removeIcon.addEventListener('click', this.#removeImage.bind(this));

        const formData = new FormData();
        formData.append('image', file);

        fetch('/admin/upload', {
            method: "POST",
            body: formData,
            headers: {
                'X-CSRF-TOKEN': this.csrfToken
            }
        }).then((response) => {
            return response.json();
        }).then(json => {
            container.innerHTML = `<img src="${json.file.url}" alt="" class="gallery__image">`;
            container.appendChild(removeIcon);
        });
    }

    #removeImage(event) {
        const container = event.target.parentNode;
        const imagePath = container.querySelector('img').getAttribute('src');
        const formData = new FormData();
        formData.append('image', imagePath);

        fetch('/admin/remove', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': this.csrfToken,
                'accept': 'application/json'
            }
        }).then(result => {
            return result.json();
        }).then(json => {
            console.log(json);
        });

        container.innerHTML = '';

        container.insertAdjacentElement('afterbegin', this.#generateContent(false));
    }

    save(blockContent) {
        return {
            empty: true
        };
    }
}

export default Gallery;
