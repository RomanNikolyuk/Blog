class PostSide {
    static get toolbox() {
        return {
            title: 'Side',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z"/></svg>'
        }
    }

    render() {
        const sideTitle = document.createElement('input');
        sideTitle.classList.add('post-side__title');
        sideTitle.placeholder = 'Enter Side Title';

        const sideTextElement = document.createElement('textarea');
        sideTextElement.classList.add('post-side__text');
        sideTextElement.placeholder = 'Side Text';

        const plusButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        plusButton.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        plusButton.setAttribute('viewBox', '0 0 24 24');
        plusButton.innerHTML = '<path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>';
        plusButton.classList.add('post-side__button');

        plusButton.addEventListener('click', this.addField.bind(this));

        this.wrapper = document.createElement('div');
        this.wrapper.appendChild(sideTitle);
        this.wrapper.appendChild(sideTextElement);
        this.wrapper.appendChild(plusButton);

        this.wrapper.classList.add('post-side__container');

        return this.wrapper;
    }

    save(blockContent) {
        const sideTitle = blockContent.firstChild.value;
        const sideTexts = [];
        const sideTextsNodes = blockContent.querySelectorAll('.post-side__text');

        for (const sideText of sideTextsNodes) {
            sideTexts.push(sideText.value);
        }

        return {
            title: sideTitle,
            text: sideTexts
        }
    }

    validate(saveData) {
        return true;
    }

    addField() {
        const newTextField = document.createElement('textarea');
        newTextField.classList.add('post-side__text');
        newTextField.placeholder = 'Side Text';

        this.wrapper.appendChild(newTextField);
    }
}

export default PostSide;
