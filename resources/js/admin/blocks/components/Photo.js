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
}

export default Photo;
