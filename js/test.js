'use strict';
let container = document.getElementById('container');
let testingArray = new Array({
    element: document.getElementById('container'),
    test: 1
});

describe('Add element', function () {
    let numOfChildren = container.children.length;
    let newElement;
    beforeEach(function() {
        newElement = testingArray.addElement();
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
        testingArray.removeElement();
    });
});

describe('Remove element', function () {
    let numOfChildren;
    let newElement;
    beforeEach(function() {
        newElement = testingArray.addElement();
        numOfChildren = container.children.length;
        testingArray.removeElement();
    });

    it('Removing one element', function() {
        expect(numOfChildren - container.children.length).to.equal(1);
    });

    it('Removing an appropriate input element', function() {
        expect(newElement.parent).to.equal(undefined);
    });

    it('Not removing the last element', function() {
        while (container.children.length>2) {
            testingArray.removeElement();
        }
        try {
            testingArray.removeElement();
        } catch(err) {}
        expect(container.children.length).to.equal(2);
    });

    after( function() {
        testingArray.addElement().value = '9';
        testingArray.addElement().value = '7';
        testingArray.addElement().value = '6';
        testingArray.addElement().value = '5';
        testingArray.addElement().value = '8';
        testingArray.addElement().value = '4';
        testingArray.addElement().value = '0';
        testingArray.addElement().value = '2';
        testingArray.addElement().value = '3';
    })

});

describe('Initialisation of the Array', function () {
    let newElement;
    it("If user inputs value, which isn't a number, tha array isn't initialising", function() {
        newElement = testingArray.addElement();
        newElement.value = '-';
        try {
            testingArray.init();
        } catch(err) {}
        expect(testingArray.state).to.equal(Array.notInitialize);
        testingArray.removeElement();
    });
    it("Not initialising second time", function() {
        testingArray._state = Array.readyForSort;
        expect(testingArray.init()).to.equal(null);
        testingArray._state = Array.notInitialize;
    });
});

describe('Step of sorting', function () {
    let count;
    let isSorted;
    
    before( function() {
            testingArray.init();
        }
    );

    beforeEach( function() {
        testingArray.step();
        count = 0;
    });

    it("Two elements have style 'changed' on first step", function() {
        for (let i = 1; i < container.children.length; i++) {
            if ( container.children[i].classList.contains('changed') ) {
                count++;
            };
        }
        expect(count).to.equal(2);
    });

    it("Two elements have style 'changedBefore' on every step", function() {
        for (let i = 1; i < container.children.length; i++) {
            if ( container.children[i].classList.contains('changedBefore' ) ) {
                count++;
            };
        }
        expect(count).to.equal(2);
    });

    it("Two elements have style 'changed' on every step", function() {
        for (let i = 1; i < container.children.length; i++) {
            if ( container.children[i].classList.contains('changed') ) {
                count++;
            };
        }
        expect(count).to.equal(2);
    });

    it("Finally the array will be sorted", function() {

        while(testingArray.state !== Array.sorted) {
            testingArray.step();
        }
        isSorted = true;
        for (let i = 1; i < container.children.length-1; i++) {
            if ( parseFloat(container.children[i].value) > parseFloat(container.children[i+1].value) ) {
                isSorted = false;
                break;
            };
        }
        expect(isSorted).to.equal(true);
    });
    
    after( function() {
        container.children[0].innerHTML = 'Input the elements of the array:';
        while (container.children.length>1) {
            container.removeChild(container.lastChild);
        }
        testingArray._state = Array.notInitialize;

        testingArray.addElement().value = '1';
        testingArray.addElement().value = '9';
        testingArray.addElement().value = '7';
        testingArray.addElement().value = '6';
        testingArray.addElement().value = '5';
        testingArray.addElement().value = '8';
        testingArray.addElement().value = '4';
        testingArray.addElement().value = '0';
        testingArray.addElement().value = '2';
        testingArray.addElement().value = '3';

        testingArray = null;
    });
    
});
