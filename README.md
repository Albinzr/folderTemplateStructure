从模板创建文件夹的工具。

VSCode 扩展。安装地址：
[https://marketplace.visualstudio.com/items?itemName=WingsJ.create-folder-from-template](https://marketplace.visualstudio.com/items?itemName=WingsJ.create-folder-from-template)。

# 使用

1. 在文件浏览器中点击右键，选“从模板创建文件夹”。
2. 在命令面板选择一个预设的方法。

# 配置

在设置中可配置多个方案，示例：

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

配置设置在`createFolderFromTemplate.templates`属性下，必须为一个数组。每一个元素是一个方法，其结构为：

```ts
{
  title: string // 显示名称
  name: string // 目录或文件名
  type: Type // 类型。目录（"dir"）或文件（"file"）
  content?: string // 内容。文件专属
  children?: [] // 子目录或文件数组。目录专属
}
```

其中 children 的元素结构与自身相同。
