'use strict';
let container = document.getElementById('container');

let testingBubbleSorter = new BubbleSortDemo({
    element: document.getElementById('container'),
    test: 1
});

describe('Add element', function () {
    let numOfChildren = container.children.length;
    let newElement;

    beforeEach(function() {
        newElement = testingBubbleSorter.addElement();
    });

    it('Adding one new element', function() {
        expect(container.children.length-numOfChildren).to.equal(1);
    });

    it('Adding the input element of a "number" type', function() {
        expect(newElement.type).to.equal('number');
    });

    it('Adding the input element with value 0', function() {
        expect(newElement.value).to.equal('0');
    });

    afterEach(function() {
        testingBubbleSorter.removeElement();
    });
});

describe('Remove element', function () {
    let numOfChildren;
    let newElement;

    beforeEach(function() {
        newElement = testingBubbleSorter.addElement();
        numOfChildren = container.children.length;

        testingBubbleSorter.removeElement();
    });

    it('Removing one element', function() {
        expect(numOfChildren - container.children.length).to.equal(1);
    });

    it('Removing an appropriate input element', function() {
        expect(newElement.parent).to.equal(undefined);
    });

    it('Not removing the last element', function() {
        while (container.children.length>2) {
            testingBubbleSorter.removeElement();
        }

        try {
            testingBubbleSorter.removeElement();
        } catch(err) {}

        expect(container.children.length).to.equal(2);
    });

    after( function() {
        testingBubbleSorter.addElement().value = '9';
        testingBubbleSorter.addElement().value = '7';
        testingBubbleSorter.addElement().value = '6';
        testingBubbleSorter.addElement().value = '5';
        testingBubbleSorter.addElement().value = '8';
        testingBubbleSorter.addElement().value = '4';
        testingBubbleSorter.addElement().value = '0';
        testingBubbleSorter.addElement().value = '2';
        testingBubbleSorter.addElement().value = '3';
    })

});

describe('Initialisation of the BubbleSortDemo', function () {
    let newElement;

    it('If user inputs value, which isn\'t a number, tha array isn\'t initialising', function() {
        newElement = testingBubbleSorter.addElement();
        newElement.value = '-';

        try {
            testingBubbleSorter.init();
        } catch(err) {}

        expect(testingBubbleSorter.state).to.equal(BubbleSortDemo.notInitialize);

        testingBubbleSorter.removeElement();
    });
    it('Not initialising second time', function() {
        testingBubbleSorter._state = BubbleSortDemo.readyForSort;

        expect(testingBubbleSorter.init()).to.equal(null);

        testingBubbleSorter._state = BubbleSortDemo.notInitialize;
    });
});

describe('Step of sorting', function () {
    let count;
    let isSorted;
    
    before( function() {
            testingBubbleSorter.init();
        }
    );

    beforeEach( function() {
        testingBubbleSorter.step();
        count = 0;
    });

    it('Two elements have style \'changed\' on first step', function() {
        for (let i = 1; i < container.children.length; i++) {
            if ( container.children[i].classList.contains('changed') ) {
                count++;
            }
        }

        expect(count).to.equal(2);
    });

    it('Two elements have style \'changedBefore\' on every step', function() {
        for (let i = 1; i < container.children.length; i++) {
            if ( container.children[i].classList.contains('changedBefore' ) ) {
                count++;
            }
        }

        expect(count).to.equal(2);
    });

    it('Two elements have style \'changed\' on every step', function() {
        for (let i = 1; i < container.children.length; i++) {
            if ( container.children[i].classList.contains('changed') ) {
                count++;
            }
        }

        expect(count).to.equal(2);
    });

    it('Finally the array will be sorted', function() {

        while(testingBubbleSorter.state !== BubbleSortDemo.sorted) {
            testingBubbleSorter.step();
        }

        isSorted = true;
        for (let i = 1; i < container.children.length-1; i++) {
            if ( parseFloat(container.children[i].value) > parseFloat(container.children[i+1].value) ) {
                isSorted = false;
                break;
            }
        }

        expect(isSorted).to.equal(true);
    });
    
    after( function() {
        container.children[0].innerHTML = 'Input the elements of the array:';

        while (container.children.length>1) {
            container.removeChild(container.lastChild);
        }

        testingBubbleSorter._state = BubbleSortDemo.notInitialize;

        testingBubbleSorter.addElement().value = '1';
        testingBubbleSorter.addElement().value = '9';
        testingBubbleSorter.addElement().value = '7';
        testingBubbleSorter.addElement().value = '6';
        testingBubbleSorter.addElement().value = '5';
        testingBubbleSorter.addElement().value = '8';
        testingBubbleSorter.addElement().value = '4';
        testingBubbleSorter.addElement().value = '0';
        testingBubbleSorter.addElement().value = '2';
        testingBubbleSorter.addElement().value = '3';

        testingBubbleSorter = null;
    });
    
});
