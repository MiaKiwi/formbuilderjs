import { NumberOfSubFieldsFieldValidator } from "../Validators/NumberOfSubFieldsFieldValidator.mjs";
import { UniqueSubfieldValuesFieldValidator } from "../Validators/UniqueSubfieldValuesFieldValidator.mjs";
import { SubfieldsField } from "./SubfieldsField.mjs";

export class ArrayField extends SubfieldsField {
    constructor({
        itemFieldClass,
        itemFieldParams = {},
        min = null,
        max = null,
        unique = false,
        ...params
    }) {
        super(params);

        this.itemFieldClass = itemFieldClass;
        this.itemFieldParams = itemFieldParams;
        this.min = min;
        this.max = max;

        // Add validators
        if (this.min !== null || this.max !== null) {
            this.validators.push(new NumberOfSubFieldsFieldValidator(this.min ?? 0, this.max ?? Infinity));
        }
        if (unique) {
            this.validators.push(new UniqueSubfieldValuesFieldValidator());
        }
    }



    createItemElement(item, doc = document) {
        let itemContainer = doc.createElement('div');

        itemContainer.classList.add('array-field-item');

        let itemElement = item.createFieldElement(doc);

        let indexElement = doc.createElement('span');
        indexElement.classList.add('item-index');
        indexElement.innerText = `${this.items.indexOf(item) + 1}. `;

        let removeButton = doc.createElement('button');
        removeButton.type = 'button';
        removeButton.classList.add('remove-button');
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', () => {
            this.removeItem(item);
            itemContainer.remove();
        });

        itemContainer.appendChild(indexElement);
        itemContainer.appendChild(itemElement);
        itemContainer.appendChild(removeButton);

        return itemContainer;
    }



    createInputRegionElement(doc = document) {
        let container = doc.createElement('div');

        container.classList.add('array-field-container');

        for (let itemField of this.items) {
            let itemElement = this.createItemElement(doc, itemField);
            container.appendChild(itemElement);
        }

        let addButton = doc.createElement('button');
        addButton.type = 'button';
        addButton.classList.add('add-button');
        addButton.innerText = 'Add Item';
        addButton.addEventListener('click', () => {
            this.addItem(this.itemFieldClass, this.itemFieldParams);
            let newItemElement = this.createItemElement(this.items[this.items.length - 1], doc);
            container.appendChild(newItemElement);
        });

        container.appendChild(addButton);

        return container;
    }
}