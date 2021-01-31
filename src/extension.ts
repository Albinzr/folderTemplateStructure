import * as VSCode from 'vscode'
import Main from './main'

export function activate(context: VSCode.ExtensionContext) {
  let disposable = VSCode.commands.registerCommand('create-folder-from-template.create', target => {
    Main(target)
  })

  context.subscriptions.push(disposable)
}
