import * as vscode from 'vscode'
import main from './main'

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('create-folder-from-template.create', target => {
    main(target)
  })

  context.subscriptions.push(disposable)
}
