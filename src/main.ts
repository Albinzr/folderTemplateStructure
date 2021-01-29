/**
 * @name index
 */

/* private */

import * as vscode from 'vscode'

enum Type {
  file,
  dir
}

/**
 * @name 模板
 */
interface Template {
  title: string
  name: string
  type: Type
  children?: Template[]
}

/* public */

/**
 * @name 主函数
 * @param target 目标
 */
async function main(target: { fsPath: string }): Promise<void> {
  let templates = vscode.workspace.getConfiguration('createFolderFromTemplate').templates

  let titles = templates.map((a: Template) => a.title)
  let select = await vscode.window.showQuickPick(titles, { placeHolder: '选择模板' })

  let template = templates.find((a: Template) => a.title === select)
}

/* construct */

export default main
