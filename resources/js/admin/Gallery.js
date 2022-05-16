import GalleryImage from '../../images/icons8-gallery-80.png';
import Photo from "./components/Photo";
import _ from "lodash";

class Gallery extends Photo {
    inputClass = 'gallery__input';
    containerClass = 'gallery__container';
    imageClass = 'gallery__image';

    constructor({data}) {
        super();

        this.data = data;
    }

    static get toolbox() {
        return {
            title: 'Gallery',
            icon: `<img src="${GalleryImage}" alt=""/>`
        }
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('gallery__wrapper');
        let container1 = undefined;
        let container2 = undefined;
        if (_.isEmpty(this.data.urls)) {
            container1 = this.generateImage();
            container2 = this.generateImage();
        }

        if (!_.isEmpty(this.data.urls)) {
            container1 = document.createElement('img');
            container2 = document.createElement('img');
            container1.src = this.data.urls[0];
            container2.src = this.data.urls[1];
            container1.classList.add(this.imageClass);
            container2.classList.add(this.imageClass);
        }

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

export default Gallery;
