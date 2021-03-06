# DropComponent

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]

This is a direct modification of [Romgrk's DropZone](https://github.com/romgrk/react-drop-zone/) for better management of the component and handling of files.

#### Install

`npm i -S @logicamente.info/react-drop-component`

## How to use

```jsx
import { DropComponent } from '@logicamente.info/react-drop-component'

<DropComponent onDrop={(file, text) => console.log(file, text)} />
```

## Props

| Name | Description | Default |
| --- | --- | --- |
| `onDrop` (required) | called when a file is dropped or selected. Signature: `(file: HTML5File, text: String)` | |
| `handleClick` | Handle click events on the rendered component | `true` |
| `dontRead` | Prevent reading the file content, if it's causing problems | `false` |
| `label` | Label on the component | `Select or Drop your file here` |
| `multiple` | Allows user to select or drop multiple files for each input | `false` |
| `accept` | File types that user can drop or pick from the file input dialog box | `*` |

### Details

The component overwrites the `onDrag/DragEnter/.../Drop` props of the render function child.

[build-badge]: https://img.shields.io/travis/logicamenteinfo/react-drop-component/master.png?style=flat-square
[build]: https://travis-ci.org/logicamenteinfo/react-drop-component

[npm-badge]: https://img.shields.io/npm/v/@logicamente.info/react-drop-component.png?style=flat-square
[npm]: https://www.npmjs.org/@logicamente.info/react-drop-component