# create-folder-from-template

A tool for creating folders and files from templates

<!-- VSCode extension. Install:
[https://marketplace.visualstudio.com/items?itemName=WingsJ.create-folder-from-template](https://marketplace.visualstudio.com/items?itemName=WingsJ.create-folder-from-template)。
 -->
## Usage

1. Right click on file in file explorer, click 'Create folder from template'.
2. Select a pre-defined template in command panel.
3. Input the name of the folder and enter.

## Configuration

Templates can be set in VSCode setting json, example：

```json
{
  "createFolderFromTemplate.templates": [
    {
      "title": "vue-component",
      "name": "vue-component",
      "type": "dir",
      "children": [
        {
          "name": "index.vue",
          "type": "file",
          "content": "<!--\n\n-->\n\n<template>\n\t<div class=\"\"></div>\n</template>\n\n<script src=\"./component.js\"></script>\n<style src=\"./style.scss\" lang=\"scss\" scoped></style>\n"
        },
        {
          "name": "component.js",
          "type": "file",
          "content": "export default {\n\tname: ''\n}\n"
        },
        {
          "name": "style.scss",
          "type": "file"
        }
      ]
    }
  ]
}
```

The setting object name is `createFolderFromTemplate.templates`. It must be an array, with the item as：

```ts
{
  title: string // display name
  name: string // name of the folder
  type: Type // "dir" or "file"
  content?: string // content, exclusive for file
  children?: [] // children dir or file, exclusive for dir
}
```

The children items have the same structure.
