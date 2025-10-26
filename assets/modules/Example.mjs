import { Form } from "./forms/Form.mjs";
import { TextField } from "./Fields/TextField.mjs";
import { DateField } from "./Fields/DateField.mjs";
import { RadioField } from "./Fields/RadioField.mjs";
import { MultiSelectField } from "./Fields/MultiSelectField.mjs";
import { FileField } from "./Fields/FileField.mjs";
import { CheckboxField } from "./Fields/CheckboxField.mjs";
import { ColorField } from "./Fields/ColorField.mjs";
import { Datalist } from "./options/Datalist.mjs";
import { Option } from "./options/Option.mjs";
import { RandomIDProvider } from "./IDProviders/RandomIDProvider.mjs";
import { OptionsGroup } from "./options/OptionsGroup.mjs";
import { UniformArrayField } from "./Fields/UniformArrayField.mjs";

let form = new Form({
    id: 'accident-report-form',
    fields: [
        new TextField({
            id: 'full-name',
            label: 'Full Name',
            helper: 'Enter your full name.',
            attributes: {
                required: true,
                placeholder: 'John Doe',
                minLength: 2,
                maxLength: 50
            }
        }),
        new DateField({
            id: 'accident-date',
            label: 'Accident Date',
            helper: 'Select the date of the accident.',
            datalist: new Datalist(RandomIDProvider.new(), [
                new Option((new Date()).toISOString().split('T')[0], 'Today'),
                new Option((new Date(Date.now() - 86400000)).toISOString().split('T')[0], 'Yesterday')
            ]),
            value: (new Date()).toISOString().split('T')[0],
            attributes: {
                required: true
            }
        }),
        new UniformArrayField({
            id: 'witnesses',
            name: 'witnesses',
            label: 'Witnesses',
            helper: 'Add the names of any witnesses to the accident.',
            min: 1,
            max: 3,
            unique: true,
            itemFieldClass: TextField,
            itemFieldParams: {
                label: 'Witness',
                attributes: { required: true }
            }
        }),
        new RadioField({
            id: 'injuries',
            label: 'Were there any injuries?',
            helper: 'Select yes or no.',
            options: [
                new Option("yes", 'Yes'),
                new Option("no", 'No')
            ],
            attributes: {
                required: true
            }
        }),
        new ColorField({
            id: 'vehicle-color',
            label: 'Vehicle Color',
            helper: 'Select the color of your vehicle.',
            datalist: new Datalist(RandomIDProvider.new(), [
                new Option('#FF0000', 'Red'),
                new Option('#0000FF', 'Blue'),
                new Option('#00FF00', 'Green'),
                new Option('#000000', 'Black'),
                new Option('#FFFFFF', 'White')
            ])
        }),
        new MultiSelectField({
            id: 'damaged-parts',
            label: 'Damaged Parts',
            helper: 'Select all damaged parts of the vehicle.',
            options: [
                new OptionsGroup([
                    new Option('front-bumper', 'Front Bumper'),
                    new Option('hood', 'Hood'),
                    new Option('grille', 'Grille')
                ], 'Front Section'),
                new OptionsGroup([
                    new Option('rear-bumper', 'Rear Bumper'),
                    new Option('trunk', 'Trunk'),
                    new Option('tail-lights', 'Tail Lights')
                ], 'Rear Section')
            ],
            min: 1,
            attributes: {
                required: true
            }
        }),
        new FileField({
            id: 'photos',
            label: 'Upload Photos',
            helper: 'Upload photos of the accident scene and damages.',
            accept: 'image/*',
            multiple: true,
            min: 1,
            max: 5,
            attributes: {
                required: true
            }
        }),
        new CheckboxField({
            id: 'terms',
            label: 'I agree to the terms and conditions.',
            value: false,
            attributes: {
                required: true
            }
        })
    ]
});

form.appendIn(document.body);

form.validate();

form.dom().addEventListener('change', () => {
    form.validate();

    console.log(form.getSummary());
});