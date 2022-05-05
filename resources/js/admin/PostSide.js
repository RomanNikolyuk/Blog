import AddFieldButton from "./components/AddFieldButton";

class PostSide extends AddFieldButton{
    static get toolbox() {
        return {
            title: 'Side',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z"/></svg>'
        }
    }

    render() {
        const sideTitle = document.createElement('div');
        sideTitle.classList.add('post-side__title');
        sideTitle.placeholder = 'Enter Side Title';
        sideTitle.contentEditable = true;

        const sideTextElement = document.createElement('div');
        sideTextElement.classList.add('post-side__text');
        sideTextElement.placeholder = 'Side Text';
        sideTextElement.contentEditable = true;

        const plusButton = this.getPlusButton(this.addField);

        this.wrapper = document.createElement('div');
        this.wrapper.appendChild(sideTitle);
        this.wrapper.appendChild(sideTextElement);
        this.wrapper.appendChild(plusButton);

        this.wrapper.classList.add('post-side__container');

        return this.wrapper;
    }

    save(blockContent) {
        const sideTitle = blockContent.querySelector('.post-side__title');
        const sideTexts = [];
        const sideTextsNodes = blockContent.querySelectorAll('.post-side__text');

        for (const sideText of sideTextsNodes) {
            sideTexts.push(sideText.innerHTML);
        }

        return {
            title: sideTitle.innerHTML,
            text: sideTexts
        }
    }

    validate(saveData) {
        return true;
    }

    addField() {
        const newTextField = document.createElement('div');
        newTextField.classList.add('post-side__text');
        newTextField.placeholder = 'Side Text';
        newTextField.contentEditable = true;

        this.wrapper.appendChild(newTextField);
    }
}

export default PostSide;
