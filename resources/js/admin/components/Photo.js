import removeImg from "../../../images/icons8-remove-32.png";
import _ from "lodash";

class Photo {
    csrfToken = document.querySelector('input[name="_token"]').getAttribute('value');

    generateImage() {
        const container = document.createElement('div');
        container.classList.add(this.containerClass);
        let image = undefined;

        if (_.isEmpty(this.data)) {
            image = document.createElement('input');
            image.setAttribute('type', 'file');
            image.classList.add(this.inputClass);
            image.addEventListener('change', this.uploadFile.bind(this));
        }

        if (!_.isEmpty(this.data)) {
            image = document.createElement('img');
            image.src = this.data.url;
            image.classList.add(this.imageClass);
            this.megaphoto ? image.classList.add('megaphoto__image') : '';
        }

        container.appendChild(image);
        return this.containerClass ? container : image;
    }

    uploadFile(event) {
        const file = event.target.files[0];
        const container = event.target.parentNode;
        const removeIcon = this.#removeButton();
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
            event.target.remove();
            container.insertAdjacentHTML('afterbegin', `<img src="${json.file.url}" alt="" class="${this.imageClass}">`)
            container.appendChild(removeIcon);
        });
    }

    #removeImage(event) {
        const container = event.target.parentNode;
        const oldImage = container.querySelector('img');
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
        });

        event.target.remove();
        oldImage.remove();

        container.insertAdjacentElement('afterbegin', this.generateImage());
    }

    #removeButton() {
        const removeIcon = document.createElement('img');
        removeIcon.setAttribute('src', removeImg);
        removeIcon.classList.add('gallery__remove-icon');
        removeIcon.addEventListener('click', this.#removeImage.bind(this));

        return removeIcon;
    }
}

export default Photo;
