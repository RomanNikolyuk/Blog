import GalleryImage from '../../images/icons8-gallery-80.png';
import Photo from "./components/Photo";

class Gallery extends Photo {
    inputClass = 'gallery__input';
    containerClass = 'gallery__container';
    imageClass = 'gallery__image';

    static get toolbox() {
        return {
            title: 'Gallery',
            icon: `<img src="${GalleryImage}" alt=""/>`
        }
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('gallery__wrapper');

        const container1 = this.generateImage();
        const container2 = this.generateImage();

        const input = document.createElement('input');
        input.classList.add('gallery__caption');

        wrapper.appendChild(container1);
        wrapper.appendChild(container2);

        return wrapper;
    }

    save(blockContent) {
        const images = blockContent.querySelectorAll('.gallery__image');
        const output = {
            urls: []
        };
        images.forEach(image => output.urls.push(image.src));

        return output;
    }
}

export default Gallery;
