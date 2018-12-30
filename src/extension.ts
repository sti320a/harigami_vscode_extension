
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
		const json_data = {
			lang: "Python",
			code: content
		}

		const qs_data = querystring.stringify(json_data);

		const options = {
			hostname: '127.0.0.1',
			port: 5000,
			path: '/',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(qs_data)
			}
		}

		let StringDecoder = stringDecoder.StringDecoder;
		let decoder = new StringDecoder('');

		// リクエスト定義と応答処理設定
		let req = HTTP.request(options, function(res) {
			console.log("STATUS: ", res.statusCode);
			console.log("HEADERS: ", JSON.stringify(res.headers));
			res.setEncoding('utf8');

			// 応答受信処理
			res.on('data', function(chunk: any){
				console.log("BODY: ", chunk);
				// Query String -> JSON形式へ変換
				var rcv_text = querystring.parse(decoder.write(chunk))
					var rcv_json_text = JSON.stringify(rcv_text);
					var rcv_json = JSON.parse(rcv_json_text);
					console.log("json text = ", rcv_json.message);
					console.log("json number = ", rcv_json.sound);
					console.log("json boolean = ", rcv_json.reply);
				});
				// 応答終了処理
				res.on('end', function(){
				console.log('これ以上データはありません。')
			});
		});
		// 送信のエラー処理
		req.on('error', function(e){
		console.log( "エラー発生: ", e.message);
		});
		// データ送信(GET)
		req.write(qs_data);
		req.end();
			
		window.showInformationMessage(content);
			
	}

}

// this method is called when your extension is deactivated
export function deactivate() {}
