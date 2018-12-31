
import {window, commands, ExtensionContext } from 'vscode';
import * as HTTP from 'http';
import * as HTTPs from 'https';
import * as querystring from 'querystring';
import * as stringDecoder from 'string_decoder';

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
		let json_data = {
			lang: "Python",
			code: content,
			status: 0
		}

		// to be querystring
        let qs_data = querystring.stringify(json_data);

        console.log(qs_data);

		let webclient = require("request");
		webclient.post(
			{
				url: "http://localhost:5000/api_submit_code",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
					"Content-Length": qs_data.length
					},
				body: qs_data

			}, function (error, response, body) {
				console.log(response);
			}
		);

		window.showInformationMessage(content);			
	}

}

// this method is called when your extension is deactivated
export function deactivate() {}
