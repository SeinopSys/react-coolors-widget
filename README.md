# React Coolors Widget

[![Build Status](https://img.shields.io/travis/SeinopSys/react-coolors-widget/main.svg)](http://travis-ci.org/SeinopSys/react-coolors-widget) [![Coverage](https://img.shields.io/codecov/c/github/SeinopSys/react-coolors-widget/main.svg)](https://codecov.io/github/SeinopSys/react-coolors-widget) [![npm version](https://img.shields.io/npm/v/react-coolors-widget)](https://img.shields.io/npm/v/react-coolors-widget) [![npm downloads](https://img.shields.io/npm/dm/react-coolors-widget.svg)](https://www.npmjs.com/package/react-coolors-widget)

Unofficial React implementation of the [Coolors.co] palette widget, written in TypeScript. Documentation and testing is work-in-progress.

[Coolors.co]: https://coolors.co

## Usage

### Installation

```
$ npm install react-coolors-widget
$ yarn add react-coolors-widget
```

### Styling

The component's CSS uses custom properties, all of which you can override to change how the component looks by creating your own class.

The full list of custom properties and their defaults are at the top of [widget.scss](./src/widget.css).

```css
@import url('~react-coolors-widget/dist/widget.css');

.my-widget-class {
  --react-coolors-widget-font: monospace;
  --react-coolors-info-link: salmon;
  --react-coolors-info-link-hover-color: red;
  --react-coolors-widget-bg: black;
  --react-coolors-border-radius: 0;
  --react-coolors-info-font-size: 1rem;
  --react-coolors-widget-height: 200px;
}
```

### Component

Below is an example combining many possible patterns: using TypeScript, CSS modules, providing props from a variable, and also using the JSX syntax.

```tsx
import ReactDOM from 'react-dom';
import { targetEl } from './somwehere-else';
import { CoolorsWidget } from 'react-coolors-widget';
// If using TypeScript, the `props` type is availabe under this export
import type { CoolorsWidgetProps } from 'react-coolors-widget';
// When using css modules, import the class names, otherwise you can hard code them
import styles from './app.css';

const widgetProps: CoolorsWidgetProps = {
  colors: ['#f00', '#0f0', '#00f'],
  paletteName: 'RGB',
}

ReactDOM.render(<CoolorsWidget {...widgetProps} className={styles['my-widget-class']} />, targetEl);
```

The component accepts several props which alter its behavior:

#### `colors: string[]`

Array of color strings. Valid color formats are short (3 chars) and long (6 chars) HEX strings, with or without `#` prefix, and using any casing for the letters is supported. Examples for valid values: `#aaa`, `abc`, `#a1b2c3`, `cccccc`, `#aBc123`

If it's an empty array, the component will not render anything.

#### `className?: string`

Can be used to provide any additional classes to the wrapper element (e.f. for overriding styles). It is handled separately from the other default HTML attributes to ensure that the component's own classes are added alongside the ones you provide.

#### `paletteName?: string`

If provided, this text will render the in the bottom left corner of the widget.

#### Linking

The widget also displays a link to the Coolors.co website with the provided colors pre-selected. The text of this link can be localized using the `linkText` prop.

For future-proofing (and to support potential alternative linking methods), the component that renders said link can also be replaced with the `LinkComponent` prop. Simply provide a React component that matches the `CoolorsLinkComponent` type. It receives:

* a `colors` prop, which is an array of normalized HEX colors (3 character long values are expanded to 6, and all values will have the `#` prefix)
* `children`, which will be the link text ()

Of course, a default value is provided what will link to the current Coolors.co website with the provided colors, but we warned, as there is a 10 color maximum limit on those links, and trying to add more colors results in a 404 error page. As such the default component will throw an error if you try to provide too many colors.

#### Click handling

Additionally, an `onColorClick` prop is also available, which gets called each time a color's box is clicked, and it passed the click event as the first argument, and the text inside the element as the second. For now the second argument's format is fixed, it will be the HEX code in all uppercase **without** the `#` prefix. This can be used to copy the text to the clipboard for example.

Besides these properties, the widget's root element is a simple `<div>` under the hood, so you can also pass any attributes that you could give to a regular `<div>` element as additional props to this component, and it will be added to the rendered element.

#### Error handling

The component will throw an error if encounters invalid input. Currently, the following can cause a rendering error:

1. invalid color values are provided in the `colors` prop
2. more than 10 colors are provided in the `colors` prop, while using the default `LinkComponent`

In these cases, an error with the name of `CoolorsWidgetError` will be thrown, and the message will include a prefix to indicate that the error came from this component. You can make sure your entire app does not crash in these cases by including an [error boundary] component, such as [`react-error-boundary`].


[error boundary]: https://reactjs.org/docs/error-boundaries.html

[`react-error-boundary`]: https://www.npmjs.com/package/react-error-boundary
