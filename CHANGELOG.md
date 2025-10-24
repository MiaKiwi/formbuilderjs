# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [STVP](https://drive.mia.kiwi/index.php/s/PLGxSTNDxSTVP).

## [25.0.3] - 2025-10-24

### Changed

- Remade entire project



## [25.0.2] - 2025-10-18

### Added

- Fields track what form they're a member of (`form` attribute)
- Field validator class`FieldValidator`, executed after HTML5 constraints
- Special validation options for `PasswordField`: `includeNumbers`, `includeSymbols`, `includeUppercase`, `includeLowercase`, and `min`
- More details and example in README

### Changed

- Casing in comments for consistency



## [25.0.1] - 2025-10-18

### Added

- Hidden field (`HiddenField`)
- Search field (`SearchField`)
- File field (`FileField`)

### Changed

- `MultiSelectField` attribute `valueType` to `Option[]`, instead of `Options[]`



## [25.0.0] - 2025-10-18

### Added

- `Field` base class
- Checkboxes (`CheckboxField`)
- Color field (`ColorField`)
- Date field (`DateField`)
- Local datetime field (`DateTimeLocal`)
- Email field (`EmailField`)
- Month field (`MonthField`)
- Multi-select field (`MultiSelectField`)
- Number field (`NumberField`)
- Password field (`PasswordField`)
- Radio input (`RadioField`)
- Range field (`RangeField`)
- Select field (`SelectField`)
- Phone number field (`TelephoneField`)
- Textarea field (`TextareaField`)
- Time field (`TimeField`)
- Text field (`TextField`)
- URL field (`URLField`)
- Week field (`WeekField`)
- Basic styling
- Options and option groups (`Option`, `OptionsGroup`)
