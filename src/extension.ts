
import {window, commands, ExtensionContext } from 'vscode';
import * as HTTP from 'http';
import * as HTTPs from 'https';

export function activate(context: ExtensionContext) {

	console.log('Congratulations, your extension "harigamiExtension" is now active!');

	let disposable = commands.registerCommand('extension.harigami', () => {
		// The code you place here will be executed every time your command is executed

		const submitter = new CodeSubmitter();
		submitter.submitCode();

		window.showInformationMessage('Send your code successfully.');
	});

	context.subscriptions.push(disposable);
}


class CodeSubmitter {

	public submitCode() {

		// Get active editor
		let editor = window.activeTextEditor;
		if (!editor) {
			return
		}

		// Get document
		let doc = editor.document;
		let content: string = doc.getText();
		
        // send request to harigami server
		// const request = new XMLHttpRequest();
        // request.open("GET", `https://api.github.com/`);
        // request.send();

		// request.addEventListener("error", () => {
		// 	console.log("Network Error!");
		// });

		window.showInformationMessage(content);
		
	}

}

// this method is called when your extension is deactivated
export function deactivate() {}
