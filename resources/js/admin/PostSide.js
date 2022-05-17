import AddFieldButton from "./components/AddFieldButton";
import _ from "lodash";

class PostSide extends AddFieldButton {
    constructor({data}) {
        super();

        this.data = data;
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('post-side__container');
    }
    static get toolbox() {
        return {
            title: 'Side',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z"/></svg>'
        }
    }

    render() {
        const primaryText = this.generatePrimaryText();
        const primaryTextWrapper = this.generatePrimaryTextWrapper(primaryText);
        const sideTitle = this.generateSideTitle();
        const sideTexts = this.generateSideTextElement();
        const plusButton = this.getPlusButton(this.addField);
        const sideWrapper = this.generateSideWrapper(sideTitle, sideTexts, plusButton);

        this.wrapper.appendChild(primaryTextWrapper);
        this.wrapper.appendChild(sideWrapper);

        return this.wrapper;
    }

    generatePrimaryText() {
        const primaryText = document.createElement('div');

        primaryText.classList.add('post-side__primary-text', 'post-side__text');
        primaryText.contentEditable = true;
        primaryText.innerHTML = this.data.text ?? '';

        return primaryText;
    }

    generateSideTitle() {
        const sideTitle = document.createElement('div');

        sideTitle.classList.add('post-side__title');
        sideTitle.placeholder = 'Enter Side Title';
        sideTitle.contentEditable = true;
        sideTitle.innerHTML = this.data.side.title ?? '';

        return sideTitle;
    }

    generateSideTextElement() {
        function generateTextElement(text = '') {
            const sideTextElement = document.createElement('div');

            sideTextElement.classList.add('post-side__text', 'post-side__side-text');
            sideTextElement.placeholder = 'Side Text';
            sideTextElement.contentEditable = true;
            sideTextElement.innerHTML = text;

            return sideTextElement;
        }

        if (_.isEmpty(this.data)) {
            return [generateTextElement()];
        }

        if (!_.isEmpty(this.data)) {
            const texts = [];

            this.data.side.text.forEach(element => texts.push(generateTextElement(element)));

            return texts;
        }
    }

    generatePrimaryTextWrapper(primaryText) {
        const primaryTextWrapper = document.createElement('div');

        primaryTextWrapper.classList.add('post-side__primary-text-wrapper')
        primaryTextWrapper.appendChild(primaryText);

        return primaryTextWrapper;
    }

    generateSideWrapper(sideTitle, sideTexts, plusButton) {
        const sideWrapper = document.createElement('div');

        sideWrapper.classList.add('post-side__side-wrapper');
        sideWrapper.appendChild(sideTitle);
        sideTexts.forEach(text => sideWrapper.appendChild(text));
        sideWrapper.appendChild(plusButton);

        return sideWrapper;
    }

    save(blockContent) {
        const primaryText = blockContent.querySelector('.post-side__primary-text');
        const sideTitle = blockContent.querySelector('.post-side__title');
        const sideTexts = [];
        const sideTextsNodes = blockContent.querySelectorAll('.post-side__side-text');

        for (const sideText of sideTextsNodes) {
            sideTexts.push(sideText.innerHTML);
        }

        return {
            text: primaryText.innerHTML,
            side: {
                title: sideTitle.innerHTML,
                text: sideTexts
            }
        }
    }

    validate(saveData) {
        if (saveData.text.length < 4) {
            return false;
        }

        if (saveData.side.title.length < 2) {
            return false;
        }

        return true;
    }

    addField() {
        const wrapper = document.querySelector('.post-side__side-wrapper');
        const newTextField = document.createElement('div');
        newTextField.classList.add('post-side__text');
        newTextField.placeholder = 'Side Text';
        newTextField.contentEditable = true;

        wrapper.appendChild(newTextField);
    }
}

export default PostSide;
