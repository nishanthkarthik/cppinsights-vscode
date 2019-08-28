import { workspace } from 'vscode';
import { exec } from 'child_process';
import { writeFile } from 'fs';

import { ICppInsightsConfig, Tokens } from "./insights.model";
import { InsightsConfigurator } from './insights-cli';

export class Insights {
    constructor(private config: ICppInsightsConfig) {}

    public getConfig() {
        return this.config;
    }

    public checkBinary(): Promise<boolean | string> {
        return new Promise((resolve, reject) => {
            exec(`${this.config.binary} -version`, (err, stdout, stderr) => {
                err ? reject(err) : resolve(stdout);
            });
        });
    }

    public transform(sourceFile: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(`${this.config.binary} ${InsightsConfigurator.getArgs(this.config, sourceFile)}`, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                    return;
                }

                const destFile = `/tmp/${this.hash(sourceFile)}.cpp`;
                writeFile(destFile, stdout, (err) => {
                    err ? reject(err) : resolve(destFile)
                });
            });
        });
    }

    public hash(source: string) {
        return [...source].reduce((acc, cur) => (acc * 31 + cur.charCodeAt(0)) | 0, 0);
    }
}