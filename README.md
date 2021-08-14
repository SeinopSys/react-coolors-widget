# React Coolors Widget

Unofficial React implementation of the [Coolors.co](https://coolors.co) palette widget, written in TypeScript.

Documentation and testing is work-in-progress.

## Usage

### Installation

```
$ npm install react-coolors-widget
$ yarn add react-coolors-widget
```

### Styling

The full list of variables and their defaults are in [_variables.scss](./src/_variables.scss).

#### SCSS

To change the default compilation behavior of using native CSS custom properties, be sure to override the boolean SCSS variable shown below.

```scss
// Use SCSS variables to customize looks
$react-coolors-use-custom-properties: false;
@import '~react-coolors-widget/dist/styles';
```

#### Pre-compiled CSS

The precompiled CSS uses custom properties, all of which you can override in your own styles to change how the component looks by creating your own class.

```css
@import url('~react-coolors-widget/dist/widget.css');

.my-widget-class {
  --react-coolors-link: salmon;
  --react-coolors-widget-bg: black;
  --react-coolors-border-radius: 0;
  --react-coolors-font-size: 1rem;
  --react-coolors-widget-height: 200px;
}
```

### Component

```tsx
import ReactDOM from 'react-dom';
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

If the `colors` prop is an empty array the component will not render. Valid color formats are short (3 chars) and long (6 chars) HEX strings, with or without `#` prefix, and using any casing for the letters is supported. Examples for valid values: `#aaa`, `abc`, `#a1b2c3`, `cccccc`, `#aBc123`

The `paletteName` is optional, and will render the provided string into the bottom left corner of the widget.

The widget also displays a link to the Coolors.co website with the provided colors pre-selected. The text of this link can be localized using the `linkText` prop.

For future-proofing (and to support potential alternative linking methods), the component that renders said link can also be replaced with the `LinkComponent` prop. Simply provide a React component that matches the `CoolorsLinkComponent` type. It receives:

* a `colors` prop, which is an array of normalized HEX colors (3 character long values are expanded to 6, and all values will have the `#` prefix)
* `children`, which will be the link text
