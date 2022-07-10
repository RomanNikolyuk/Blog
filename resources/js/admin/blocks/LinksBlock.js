import Button from "./components/Button";
import _ from "lodash";

class LinksBlock {
    wrapper = document.createElement('div');

    constructor({data}) {
        this.data = data;
    }
    static get toolbox() {
        return {
            title: 'Links',
            icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" fill-rule="evenodd" clip-rule="evenodd"><path serif:id="shape 10" d="M19 0h-14c-2.76 0-5 2.239-5 5v14c0 2.76 2.239 5 5 5h14c2.759 0 5-2.239 5-5v-14c0-2.76-2.239-5-5-5m0 2c1.66 0 3 1.345 3 3v14c0 1.654-1.338 3-3 3h-14c-1.654 0-3-1.339-3-3v-14c0-1.658 1.342-3 3-3h14z"/></svg>'
        };
    }

    render() {
        const plusButton = Button.getPlusButton(this.addField);
        const title = document.createElement('input');
        const links = this.generateLinks();

        title.classList.add('article-block__title', 'appearance-none', 'block', 'w-full', 'bg-gray-200', 'text-gray-700', 'border', 'border-gray-200', 'rounded', 'py-3', 'px-4', 'mb-3', 'leading-tight', 'focus:outline-none', 'focus:bg-white');
        title.placeholder = 'Read Also';
        title.value = this.data.title ?? '';

        this.wrapper.classList.add('article-block__wrapper');

        this.wrapper.appendChild(title);
        links.forEach(linkNode => this.wrapper.appendChild(linkNode));
        this.wrapper.appendChild(plusButton);

        return this.wrapper;
    }

    save(blockContent) {
        const title = blockContent.querySelector('.article-block__title');
        const links = blockContent.querySelectorAll('.article-block__link');
        const linksArray = [];
        links.forEach(link => linksArray.push(link.value));

        return {
            title: title.value,
            links: linksArray
        };
    }

    validate(saveData) {
        if (saveData.title.length < 3) {
            return false;
        }

        for (const link of saveData.links) {
            if (link.length < 3) {
                return false;
            }
        }

        return true;
    }

    generateLinks() {
        function generateLink(url = '') {
            const link = document.createElement('input');

            link.classList.add('article-block__link', 'appearance-none', 'block', 'w-full', 'bg-gray-200', 'text-gray-700', 'border', 'border-gray-200', 'rounded', 'py-3', 'px-4', 'mb-3', 'leading-tight', 'focus:outline-none', 'focus:bg-white');
            link.placeholder = `http://127.0.0.1:8000/articles/1`;
            link.value = url;

            return link;
        }

        if (_.isEmpty(this.data)) {
            return [generateLink()];
        }

        const links = [];

        this.data.links.forEach(url => links.push(generateLink(url)))

        return links;
    }

    addField() {
        this.wrapper.appendChild(this.generateLinks()[0]);
    }
}

export default LinksBlock;
