class PostSide {
    static get toolbox() {
        return {
            title: 'Image',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
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
