/**
 *  index
 */

import * as VSCode from 'vscode'
import * as Path from 'path'

/**
 *  类型
 */
enum Type {
  file = 'file',
  dir = 'dir'
}

/**
 *  模板
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
 *  创建
 * @param base 基础路径
 * @param template 模板
 * @param name 名称
 */
async function create(base: string, template: Template, name?: string) {
  let path = Path.resolve(base, name ?? template.name)
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
 *  字符串转Uint8Array
 * @param raw 字符串
 * @return Uint8Array
 */
function stringToUint8Array(raw: string) {
  var array = []
  for (var i = 0, j = raw.length; i < j; ++i) {
    array.push(raw.charCodeAt(i))
  }

  return new Uint8Array(array)
}

/**
 *  主函数
 * @param target 目标
 */
async function main(target: { fsPath: string }): Promise<void> {
  let templates = VSCode.workspace.getConfiguration('createFolderFromTemplate')?.templates || []

  let templateName = await VSCode.window.showQuickPick(
    templates.map((a: Template) => a.title),
    { placeHolder: '选择模板' }
  )
  if (templateName) {
    let template = templates.find((a: Template) => a.title === templateName)
    let foldName = await VSCode.window.showInputBox({ placeHolder: '输入名称' })
    if (foldName) {
      await create(target.fsPath, template, foldName)
    }
  }
}

export default main
