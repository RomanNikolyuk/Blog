import Photo from "./components/Photo";
import MIcon from "../../../images/icons8-m-50.png";
import _ from "lodash";

class ImageBlock {
    static get toolbox() {
        return {
            title: 'Image',
            icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg>'
        };
    }

    constructor({data}) {
        this.data = data;
    }

    render() {
        const wrapper = document.createElement('div');
        const image = this.generateImage();
        const caption1 = document.createElement('input');
        const caption2 = document.createElement('input');
        const captionClasses = ['appearance-none', 'block', 'w-full', 'bg-gray-200', 'text-gray-700', 'border', 'border-gray-200', 'rounded', 'py-3', 'px-4', 'mb-3', 'leading-tight', 'focus:outline-none', 'focus:bg-white'];

        caption1.classList.add('simage__caption', ...captionClasses);
        caption2.classList.add('simage__caption', ...captionClasses);
        caption1.id = 'caption1';
        caption2.id = 'caption2';
        caption1.placeholder = 'Enter Big Caption';
        caption2.placeholder = 'Enter Small Caption';
        caption1.value = this.data.bigCaption ?? '';
        caption2.value = this.data.smallCaption ?? '';

        wrapper.appendChild(image);
        wrapper.appendChild(caption1);
        wrapper.appendChild(caption2);

        return wrapper;
    }

     generateImage() {
        let image = undefined;

        if (_.isEmpty(this.data)) {
            image = document.createElement('input');
            image.setAttribute('type', 'file');
            image.addEventListener('change', Photo.uploadFile.bind(this));
        }

        if (!_.isEmpty(this.data)) {
            image = document.createElement('img');
            image.src = this.data.url;
        }

        return image;
    }

    save(blockContent) {
        const image    = blockContent.querySelector('img');
        const caption1 = blockContent.querySelector('#caption1');
        const caption2 = blockContent.querySelector('#caption2');

        return {
            url: image?.src,
            bigCaption: caption1.value,
            smallCaption: caption2.value,
            options: {
                megaphoto: false
            }
        };
    }

    validate(saveData) {
        if (!saveData.url) {
            return false;
        }

        return true;
    }
}

export default ImageBlock;
