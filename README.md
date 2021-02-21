# Translation

This is a library for translating text.

![Code Style CI](https://github.com/benjaminnoufel/translation/workflows/Code%20Style%20CI/badge.svg)
![Test CI](https://github.com/benjaminnoufel/translation/workflows/Test%20CI/badge.svg)
![Package](https://github.com/benjaminnoufel/translation/workflows/Package/badge.svg)
![Package npmjs](https://github.com/benjaminnoufel/translation/workflows/Package%20npmjs/badge.svg)

## Summary

- [Requirements](#requirements)
- [Installation](#installation)
    - [[NPM][npm]](#[npm][npm])
    - [[Yarn][yarn]](#[yarn][yarn])
- [Usage](#usage)
    - [Without fallback](#without-fallback)
    - [With fallback](#with-fallback)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)

## Requirements

- [NPM][npm] or [Yarn][yarn]

## Installation

### [NPM][npm]

```console
$ npm install --save @benjaminnoufel/translation
```

### [Yarn][yarn]

```console
$ yarn add @benjaminnoufel/translation
```

## Usage

### Without fallback
```jsx
import {useLanguage, useTranslation} from "@benjaminnoufel/translation";

const App = () => {
    const [lang] = useLanguage();
    const translate = useTranslation({
        name: {
            en: "Name",
            fr: "Nom"
        },
        description: {
            en: "Description",
            fr: "Description"
        } 
    })
    
    return (
        <>
            <p>Name: {translate("name", lang)}</p>
        </>
    );   
}

```


### With fallback
```jsx
import {useLanguage, useTranslation} from "@@benjaminnoufel/translation";

const App = () => {
    const [lang] = useLanguage("en");
    const translate = useTranslation({
        name: {
            en: "Name",
            fr: "Nom"
        },
        description: {
            en: "Description",
            fr: "Description"
        } 
    })
    
    return (
        <>
            <p>Name: {translate("name", lang)}</p>
        </>
    );   
}

```
## Changelog

see [`CHANGELOG.md`](./CHANGELOG.md)

## Contributing

see [`CONTRIBUTING.md`](./CONTRIBUTING.md)

## License

see [`LICENSE`](./LICENSE)

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/
