import chalk from 'chalk';

import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

interface Options {
	targetDir?: string;
	imgExtensions?: string;
	textExtensions?: string;
	quality?: number;
	enableLogs?: boolean;
}

const VitePluginWebpAndPath = (options: Options = {}) => {
	const {
		targetDir = './dist/',
		imgExtensions = 'jpg,png',
		textExtensions = 'html,css',
		quality = 80,
		enableLogs = true,
	} = options;

	const imgExtensionsArray: string[] = imgExtensions.split(',');

	const log = (
		message: string,
		type: 'info' | 'success' | 'error' = 'info'
	): void => {
		if (enableLogs) {
			let output = message;
			switch (type) {
				case 'info':
					output = chalk.blue(message);
					break;
				case 'success':
					output = chalk.green(message);
					break;
				case 'error':
					output = chalk.red(message);
					break;
			}
			console.log(output);
		}
	};

	const filesPath: string = `${targetDir}/**/*`;

	return {
		name: 'vite-plugin-webp-and-path',
		async writeBundle(): Promise<void> {
			try {
				// get target files
				const imageFiles: string[] = glob.sync(
					`${filesPath}*.{${imgExtensions}}`
				);
				const textFiles: string[] = glob.sync(
					`${filesPath}*.{${textExtensions}}`
				);
				log(`Target images is: ${imageFiles.join(', ')}`, 'info');

				// image convert
				for (const file of imageFiles) {
					const dir: string = path.dirname(file);
					await imagemin([file], {
						destination: dir,
						plugins: [imageminWebp({ quality })],
					});
					log(`Converted: ${file}`, 'success');
				}
				log('All images converted to webp!', 'success');
				imageFiles.forEach((file: string) => {
					fs.unlinkSync(file);
				});
				log('All original images deleted.');

				// path replace
				for (const filePath of textFiles) {
					const fileContent: string = fs.readFileSync(
						filePath,
						'utf-8'
					);
					let updatedContent: string = fileContent;

					for (const ext of imgExtensionsArray) {
						const regex: RegExp = new RegExp(`\\.${ext}`, 'g');
						updatedContent = updatedContent.replace(regex, '.webp');
					}

					fs.writeFileSync(filePath, updatedContent);
					log(`Image paths replaced in ${filePath}`);
				}
				log('All image paths replaced!', 'success');
			} catch (err) {
				log(`Error: ${err}`, 'error');
			}
		},
	};
};

export default VitePluginWebpAndPath;
