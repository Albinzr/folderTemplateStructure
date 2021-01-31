/**
 * @name index
 */

/* private */

import * as VSCode from 'vscode'
import * as Path from 'path'

/**
 * @name 类型
 */
enum Type {
  file = 'file',
  dir = 'dir'
}

/**
 * @name 模板
 */
interface Template {
  title: string // 显示名称
  name: string // 文件或目录名
  type: Type // 类型。文件或目录
  content?: string // 内容
  children?: Template[]
}

const FS = VSCode.workspace.fs
const URI = VSCode.Uri

/**
 * @name 创建
 * @param template 模板
 * @param path 基础路径
 */
async function create(base: string, template: Template) {
  let path = Path.resolve(base, template.name)
  let uri = URI.file(path)

  try {
    await FS.stat(uri)

    VSCode.window.showInformationMessage('文件夹或文件已存在')
  } catch {
    if (template.type === Type.dir) {
      await FS.createDirectory(uri)

      if (template.children) {
        for (let a of template.children) {
          await create(path, a)
        }
      }
    } else {
      let content = template.content || '\n'
      await FS.writeFile(uri, Uint8Array.from(stringToUint8Array(content)))
    }
  }
}

/**
 * @name 字符串转Uint8Array
 * @param raw 字符串
 * @return Uint8Array
 */
function stringToUint8Array(raw: string) {
  var arrry = []
  for (var i = 0, j = raw.length; i < j; ++i) {
    arrry.push(raw.charCodeAt(i))
  }

  return new Uint8Array(arrry)
}

/* public */

/**
 * @name 主函数
 * @param target 目标
 */
async function main(target: { fsPath: string }): Promise<void> {
  let templates = VSCode.workspace.getConfiguration('createFolderFromTemplate')?.templates || []

  let titles = templates.map((a: Template) => a.title)
  let select = await VSCode.window.showQuickPick(titles, { placeHolder: '选择模板' })
  if (select) {
    let template = templates.find((a: Template) => a.title === select)
    await create(target.fsPath, template)
  }
}

/* construct */

export default main
