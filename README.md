# Translation

This is a library for translating text.

![Code Style CI](https://github.com/benjaminnoufel/translation/workflows/Code%20Style%20CI/badge.svg)
![Test CI](https://github.com/benjaminnoufel/translation/workflows/Test%20CI/badge.svg)
![Package](https://github.com/benjaminnoufel/translation/workflows/Package/badge.svg)
![Package npmjs](https://github.com/benjaminnoufel/translation/workflows/Package%20npmjs/badge.svg)

## Summary

- [Requirements](#requirements)
- [Installation](#installation)
  - [NPM](#using-npm)
  - [Yarn](#using-yarn)
- [Config options](#config-options)
- [Examples](#examples)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)

## Requirements

- [NPM][npm] or [Yarn][yarn]

## Installation

### Using npm:

```console
$ npm install --save @benjaminnoufel/translation
```

### Using yarn:

```console
$ yarn add @benjaminnoufel/translation
```

## Config options

| key | value | default |
| ------ | ----- | ------ |
| locale | string | en |
| fallbackLng | string | en |
| separator | string | . |
| fallbackMsg | string | TODO{separator}{word}{locale} or ""|
| messages | object | {} |

:warning: messages must be respect the JSON norm

## Examples

see [`Examples`](./examples)

## Changelog

see [`CHANGELOG`](./CHANGELOG.md)

## Contributing

see [`CONTRIBUTING`](./CONTRIBUTING.md)

## License

see [`LICENSE`](./LICENSE)

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/
