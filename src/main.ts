/**
 *  index
 */

import * as VSCode from 'vscode'
import * as Path from 'path'

/**
 * 
 */
enum Type {
  file = 'file',
  dir = 'dir'
}

/**
 * 
 */
interface Template {
  title: string 
  name: string 
  type: Type 
  content?: string 
  children?: Template[]
}

const FS = VSCode.workspace.fs
const URI = VSCode.Uri

/**
 *  
 * @param base 
 * @param template
 * @param name 
 */
async function create(base: string, template: Template, name?: string) {
  let path = Path.resolve(base, name ?? template.name)
  let uri = URI.file(path)

  try {
    await FS.stat(uri)

    VSCode.window.showInformationMessage('folder or file already exists')
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
 *  Uint8Array
 * @param raw
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
 *  
 * @param target 
 */
async function main(target: { fsPath: string }): Promise<void> {
  let templates = VSCode.workspace.getConfiguration('createFolderFromTemplate')?.templates || []

  let templateName = await VSCode.window.showQuickPick(
    templates.map((a: Template) => a.title),
    { placeHolder: 'select template' }
  )
  if (templateName) {
    let template = templates.find((a: Template) => a.title === templateName)
    let foldName = await VSCode.window.showInputBox({ placeHolder: 'enter a name' })
    if (foldName) {
      await create(target.fsPath, template, foldName)
    }
  }
}

export default main
