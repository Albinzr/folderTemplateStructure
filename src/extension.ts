import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('create-folder-from-template.create', target => {
    // console.log(target)

    console.log(vscode.workspace.getConfiguration('createFolderFromTemplate'))
  })

  context.subscriptions.push(disposable)
}
