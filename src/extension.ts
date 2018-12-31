
import {window, commands, ExtensionContext } from 'vscode';
import * as HTTP from 'http';
import * as HTTPs from 'https';
import * as querystring from 'querystring';
import * as stringDecoder from 'string_decoder';

export function activate(context: ExtensionContext) {

	let disposable = commands.registerCommand('extension.harigami', () => {

		const submitter = new CodeSubmitter();
		submitter.submitCode();

		window.showInformationMessage('Send your code successfully.');
	});

	context.subscriptions.push(disposable);
}


class CodeSubmitter {

	public submitCode() {
		/**
		 * Submit code of active tab to harigami api. 
		 * Send these 3 items.
		 * 
		 * 1. code: contents of the code. All text of current active tab. 
		 * 2. lang: programing language. This depends on VSCode 'window.activeTextEditor.document.languageId' extension.
		 * 3. status: private or not. 0 => public 1 => private
		 * 
		 */

		// Get active editor
		let editor = window.activeTextEditor;
		if (!editor) {
			return
		}

		// Get document
		let doc = editor.document;
		let lang: string = doc.languageId;
		let content: string = doc.getText();

		// Send request to harigami server
		let json_data = {
			lang: lang, // TODO: transform lang type for corresiponding to harigami style
			code: content,
			status: 0
		}

		console.log(json_data);

		// to be querystring
        let qs_data = querystring.stringify(json_data);

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


export function deactivate() {}
