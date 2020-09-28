# @tkesgar/reno

[![TypeScript](https://img.shields.io/npm/types/scrub-js.svg)](https://www.typescriptlang.org/)
[![Code style: ESLint](https://img.shields.io/badge/code%20style-ESLint-blueviolet)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Build Status](https://travis-ci.org/tkesgar/reno.svg?branch=master)](https://travis-ci.org/tkesgar/reno)
[![codecov](https://codecov.io/gh/tkesgar/reno/branch/master/graph/badge.svg?token=4puoyEuBrd)](https://codecov.io/gh/tkesgar/reno)

> You think they're big too? They really get in the way...

reno is a library to work with environment variables.

## Installation

```bash
npm install @tkesgar/reno
```

## Usage

### loadEnv(opts?)

Loads the following env files in order:

- Local env (`.env`)
- Local environment env (e.g. `production.local.env`)
- Environment env (e.g. `production.env`)
- Default env (e.g. `default.env`)

reno internally uses [dotenv][dotenv]. If an env file does not exist it will
skipped, and any environment variables specified earlier will not be overridden.

Environment name is determined from `opts.env` (defaults to the value of
`NODE_ENV`). If `opts.env` is `null`, environment env files will be skipped.

`*.local.env` can be skipped by setting `opts.loadLocalEnv` to `false`.

The default env file name is specified by `opts.default` (defaults to
`default.env`).

### getEnv(): string

Returns the value of `NODE_ENV`. Defaults to `"development"` if `NODE_ENV`
environment variable is not set.

### isDevelopment(): boolean

Alias to `getEnv() === "development"`.

### isProduction(): boolean

Alias to `getEnv() === "production"`.

## Contributing

Feel free to [submit issues][issues] and create [pull requests][pulls].

## License

Licensed under [MIT License][license].

<!-- prettier-ignore-start -->
[dotenv]: https://www.npmjs.com/package/dotenv
[issues]: https://github.com/tkesgar/reno/issues
[license]: https://github.com/tkesgar/reno/blob/master/LICENSE
[pulls]: https://github.com/tkesgar/reno/pulls
<!-- prettier-ignore-end -->
