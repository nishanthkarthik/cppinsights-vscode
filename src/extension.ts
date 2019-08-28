// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Insights } from './insights';
import { Tokens, ICppInsightsConfig } from './insights.model';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const config = vscode.workspace.getConfiguration(Tokens.CONFIG_TOKEN) as unknown as ICppInsightsConfig;;

	context.subscriptions.push(vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World!');
	}), vscode.commands.registerCommand("extension.transformCpp", () => {
		const insights = new Insights(config);
		insights.checkBinary().then(() => {
			// const sourceFile = '/home/nishanth/Desktop/test.cpp';
			const sourceFile = vscode.window.activeTextEditor!.document.uri.fsPath;
			insights.transform(sourceFile).then((out) => {
				console.log(out);
				vscode.commands.executeCommand(Tokens.DIFF_COMMAND, vscode.Uri.file(out), vscode.Uri.file(sourceFile))
					.then(() => { }, () => vscode.window.showErrorMessage('Something went wrong'));
			}).catch((err) => {
				console.log('rejected', err);
			});
		}).catch(() => {
			vscode.window.showErrorMessage(`The executable at ${insights.getConfig().binary} is missing`)
		});
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {
}
