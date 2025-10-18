# 🥝 A JS form-building module

> *kiwi.mia.0049* — FormBuilderJS

Quickly build fancy HTML forms without interacting with HTML!

FormBuilderJS provides a set of JS classes to create HTML forms and fields programmatically with support for HTML constraints and custom validation.

## Features

- Create forms and fields
- Validate field values
- Render forms and fields to HTML
- Support for various field types:
  - Text
  - File
  - Selection
  - And more!

## Example Usage

Here's a simple sign-up form that doesn't allow gmail addresses and requires a strong password:

```javascript
import { TextField } from "./fields/TextField.mjs";
import { EmailField } from "./fields/EmailField.mjs";
import { PasswordField } from "./fields/PasswordField.mjs";
import { CheckboxField } from "./fields/CheckboxField.mjs";
import { Form } from "./form.mjs";
import { FieldValidator } from "./validators/FieldValidator.mjs";

let noGmailAddressesValidator = new FieldValidator((field) => {
    // Get the value of the field
    let value = field.readValue() || "";

    // Check if the value is a Gmail address
    return !value.toLowerCase().endsWith("@gmail.com");
}, "Gmail addresses are not allowed!");

let form = new Form({
    id: "signup-form",
    action: "#",
    method: "POST",
    fields: [
        new TextField({
            id: "username",
            label: "Username",
            helper: "Choose a unique username.",
            attributes: {
                autocomplete: "username",
                placeholder: "Enter your username",
                required: "required",
                minLength: 4,
                maxLength: 20
            }
        }),
        new EmailField({
            id: "email",
            name: "email",
            label: "Email Address",
            helper: "We'll never share your email with anyone else.",
            attributes: {
                autocomplete: "email",
                placeholder: "Enter your email",
                required: "required"
            },
            validators: [noGmailAddressesValidator]
        }),
        new PasswordField({
            id: "password",
            label: "Password",
            helper: "Create a strong password.",
            includeNumbers: 1,
            includeSymbols: 1,
            includeUppercase: 1,
            includeLowercase: 1,
            min: 12,
            attributes: {
                autocomplete: "new-password",
                placeholder: "Enter your password",
                required: "required"
            }
        }),
        new CheckboxField({
            id: "terms",
            label: "I agree to the <a href=\"/legal/terms-and-conditions\">Terms and Conditions</a>",
            helper: "You must agree before submitting.",
            attributes: {
                required: "required"
            }
        })
    ]
});

document.body.appendChild(form.html());

form.validateAndShow();

form.dom().addEventListener("change", (event) => {
    form.validateAndShow();
});

form.dom().onsubmit = (event) => {
    event.preventDefault();

    if (!form.validateAndShow()) {
        alert("Please fix the errors in the form before submitting.");
    } else {
        console.log(form.getValues());
    }
};
```