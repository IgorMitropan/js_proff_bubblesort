'use strict';
class Array {
    constructor(options) {
        this._el = options.element;
        this._state = Array.notInitialize;
        this._i = 1;
        this._j = 1;
        if(options.test) { //special mode without delay for testing
            this._delay = 0;
        } else {
            this._delay = options.delay || 500;
            this.step = throttle(this.step, this._delay); // add throttling func in purpose to execute onclick handler
        }                                                   // correctly while delay
    }

    static get notInitialize() {
        return 0;
    }

    static get readyForSort() {
        return 1;
    }

    static get sorted() {
        return 2;
    }

    get state() {
        return this._state;
    }

    addElement() {
        if (this.state) {
            return null;
        }
        let space = document.createTextNode('\n');
        let newElement = document.createElement('input');
        newElement.type = 'number';
        newElement.value = '0';
        this._el.appendChild(space);
        this._el.appendChild(newElement);
        return newElement;
    }

    removeElement() {
        if (this.state) {
            return null;
        }
        if (this._el.children.length > 2) {
            this._el.removeChild(container.lastChild);
            this._el.removeChild(container.lastChild); // we delete last element of the array and the white space
        } else {
            throw new Error("You can't delete all elements of the array!");
        }
    }

    init() {
        if (this.state) {
            return null;
        }

        for (let i = 1; i < this._el.children.length; i++) { // we start with second child, because first child is a legend
            if (isNaN(parseFloat(container.children[i].value))) {
                throw new Error("Element N" + i + " is not a number!");
            }
        }

        this._state = Array.readyForSort;
        this._el.children[0].innerHTML = 'Array:';
        for (let i = 1; i < this._el.children.length; i++) {
            this._el.children[i].disabled = true;
        }
    }

    step() {
        if (this.state === 0) {
            return null;
        }
        if (this.state === 2) {
            throw new Error("The array has already been sorted!");
        }

        let i = this._i;
        let j = this._j;
        for (; i < this._el.children.length - 1; i++) {
            for (; j < this._el.children.length - i; j++) {
                let firstVal = parseFloat(this._el.children[j].value);
                let secondVal = parseFloat(this._el.children[j + 1].value);

                if (firstVal > secondVal) {
                    this._change(this._el.children[j], this._el.children[j + 1]);
                    this._i = i;
                    this._j = j + 1;
                    return;
                }
            }
            j = 1;
        }

        this._state = Array.sorted;
        this._removeClass('changed','changedBefore');
    }

    _removeClass(firstClassName, secondClassName) {
        for (let i = 1; i < this._el.children.length; i++) {
            this._el.children[i].classList.remove(firstClassName, secondClassName);
        }
    }

    _change(first, second) {
        this._removeClass('changedBefore');

        let changedPrevStep = this._el.querySelectorAll('.changed');
            if (changedPrevStep) {
                for(let i = 0; i < changedPrevStep.length ; i++) {
                    changedPrevStep[i].classList.add('changedBefore');
                }
            }
        this._removeClass('changed');

        first.classList.add('changed');
        second.classList.add('changed');

        let empty = first.value;
        if (this._delay) {
            setTimeout(function () {
                first.value = second.value;
                second.value = empty;
            }, this._delay);
        } else {
            first.value = second.value;
            second.value = empty;
        }
    }

}
