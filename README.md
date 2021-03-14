# tab-info

[![CI](https://github.com/tab-info/tab-info-extension/actions/workflows/main.yml/badge.svg)](https://github.com/tab-info/tab-info-extension/actions/workflows/main.yml)

This README outlines the details of collaborating on this browser extension

## Using this extension

<img width="640" alt="Screen Shot 2021-03-07 at 5 33 29 PM" src="https://user-images.githubusercontent.com/558005/110265034-7ff82b80-7f6f-11eb-82a2-2a2f5ce1abe8.png">

The purpose of this extension is to surface meta information about
a web application running in a given browser tab, in an easily visible way.

For example, if you had a web app that was configured to run
inside a docker container and you had several nearly identical
containers running side-by-side, this could help you easily
disambiguate between them.

### Encoding information for the extension to discover

All of the information that this extension can display is provided
via `<meta>` tags, found within the `<head>` of a web application's HTML.

These follow the following convention

```html
<meta type="tab-info" name="PROPERTY_NAME" content="PROPERTY_VALUE" />
```

For example, one tag that must be present in order for the
extension to activate is

```html
<meta type="tab-info" name="enabled" content="true" />
```

And if you wanted to color code this extension's button in the
browser toolbar

```html
<meta type="tab-info" name="button-color" content="#a3a" />
```

### Supported properties

| Name                | Type     | Description                                  |
| ------------------- | -------- | -------------------------------------------- |
| `enabled`           | `string` | "true" in order to activate the extension    |
| `button-color`      | `string` | Color of the toolbar button (e.g., `"#ff0"`) |
| `popup-description` | `string` | Text in the extension popup window           |

## Contributing to this project

### Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with NPM)
- [Yarn](https://yarnpkg.com/en/)
- [Volta](https://volta.sh/)

### Installation

- `git clone <repository-url>` this repository
- `cd tab-info`
- `yarn`

### Running / Development

- `node demo-pages/index.js` to start an optional demo server, that surfaces
  pages like [`http://localhost:3001/demo1.html`](http://localhost:3001/demo1.html)
  for testing

  - You may wish to run this script in the background

- `yarn watch-prod`

- In your [Edge](https://www.microsoft.com/en-us/edge) or Chrome browser,
  [load the entire project folder as an unpacked extension](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading)

- As you change files in this repo, the project will be rebuilt. You will have
  to go to [your extensions management page](chrome://extensions) to reload the
  extension manually each time this happens

#### Building

- `yarn build`

### Further Reading / Useful Links

- [glimmerx](http://github.com/glimmerjs/glimmer-experimental/)
- [webpack](https://webpack.js.org/)
- [babel](https://babeljs.io/docs/en/configuration)

## Legal

&copy; 2021 LinkedIn
