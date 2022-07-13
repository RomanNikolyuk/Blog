import removeImg from "../../../../images/icons8-remove-32.png";
import Swal from "sweetalert2";

// Doing Something with given Photo
class Photo {
    static csrfToken = document.querySelector('input[name="_token"]').getAttribute('value');

    static uploadFile(event) {
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

    static removeImage(event) {
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

    static removeButton() {
        const removeIcon = document.createElement('img');
        removeIcon.setAttribute('src', removeImg);
        removeIcon.classList.add('gallery__remove-icon');
        removeIcon.addEventListener('click', this.removeImage.bind(this));

        return removeIcon;
    }
}

export default Photo;
