/**
 * @name index
 */

/* private */

import * as vscode from 'vscode'

/* public */

/**
 * @name 主函数
 * @param target 目标
 */
function main(target: { fsPath: string }): void {
  let templates = vscode.workspace.getConfiguration('createFolderFromTemplate').templates
}

/* construct */

export default main
