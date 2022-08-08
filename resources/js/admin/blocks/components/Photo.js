import Swal from "sweetalert2";

// Doing Something with given Photo
class Photo {
    // Uploads photo by given event listener
    static async uploadFile(event) {
        const file = event.target.files[0];
        const container = event.target.parentNode;
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/admin/upload', {
            method: "POST",
            body: formData
        });

        const json = await response.json();

        if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: json.message,
            });
        } else {
            event.target.remove();
            container.insertAdjacentHTML('afterbegin', `<img src="${json.file.url}" alt="" class="${this.imageClass}">`);
        }
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
