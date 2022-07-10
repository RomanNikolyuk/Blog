import Photo from "./components/Photo";
import MIcon from "../../../images/icons8-m-50.png";
import _ from "lodash";

class ImageBlock {
    imageClass = 'simage__image';
    captionClasses = ['appearance-none', 'block', 'w-full', 'bg-gray-200', 'text-gray-700', 'border', 'border-gray-200', 'rounded', 'py-3', 'px-4', 'mb-3', 'leading-tight', 'focus:outline-none', 'focus:bg-white'];
    megaphoto = undefined;

    static get toolbox() {
        return {
            title: 'Image',
            icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg>'
        };
    }

    constructor({data}) {
        if (!_.isEmpty(data)) {
            this.megaphoto = data.options.megaphoto;
        } else {
            this.megaphoto = false;
        }
        this.data = data;
    }

    render() {
        const image = Photo.generateImage();
        const caption1 = document.createElement('input');
        const caption2 = document.createElement('input');

        caption1.classList.add('simage__caption', ...this.captionClasses);
        caption2.classList.add('simage__caption', ...this.captionClasses);
        caption1.id = 'caption1';
        caption2.id = 'caption2';
        caption1.placeholder = 'Enter Big Caption';
        caption2.placeholder = 'Enter Small Caption';
        caption1.value = this.data.bigCaption ?? '';
        caption2.value = this.data.smallCaption ?? '';

        const wrapper = document.createElement('div');
        wrapper.appendChild(image);
        wrapper.appendChild(caption1);
        wrapper.appendChild(caption2);

        return wrapper;
    }

    renderSettings() {
        const wrapper = document.createElement('div');
        const image = document.querySelector('.simage__image');

        const buttonSettings = {
            name: 'MegaPhoto',
            icon: `<img src="${MIcon}" alt="" width="20" height="20">`
        };

        const button = document.createElement('div');
        button.classList.add('cdx-settings-button');
        button.innerHTML = buttonSettings.icon;

        button.addEventListener('click', () => {
            image.classList.toggle('megaphoto__image');
            this.megaphoto = !this.megaphoto;
            button.classList.toggle('cdx-settings-button--active');
        });
        wrapper.appendChild(button);

        return wrapper;
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
                megaphoto: this.megaphoto
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
