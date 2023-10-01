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

	const log = (message: string): void => {
		if (enableLogs) {
			console.log(message);
		}
	};

	const filesPath: string = `${targetDir}/**/*`;

	return {
		name: 'vite-plugin-webp-and-path',
		async writeBundle(): Promise<void> {
			try {
				// 元の画像ファイルを取得
				const imageFiles: string[] = glob.sync(
					`${filesPath}*.{${imgExtensions}}`
				);

				// 画像をwebpに変換
				for (const file of imageFiles) {
					const dir: string = path.dirname(file);
					await imagemin([file], {
						destination: dir,
						plugins: [imageminWebp({ quality })],
					});
				}
				log('Images converted to webp');

				// 元の画像ファイルを削除
				imageFiles.forEach((file: string) => {
					fs.unlinkSync(file);
				});
				log('Original image files deleted');

				// HTML内の画像パスを置換
				const textFiles: string[] = glob.sync(
					`${filesPath}*.{${textExtensions}}`
				);
				textFiles.forEach((filePath: string) => {
					const fileContent: string = fs.readFileSync(
						filePath,
						'utf-8'
					);
					let updatedContent: string = fileContent;

					imgExtensionsArray.forEach((ext: string) => {
						const regex: RegExp = new RegExp(`\\.${ext}`, 'g');
						updatedContent = updatedContent.replace(regex, '.webp');
					});

					fs.writeFileSync(filePath, updatedContent);
				});
				log('Image paths replaced in all HTML and CSS files');
			} catch (err) {
				console.error(err);
			}
		},
	};
};

export default VitePluginWebpAndPath;
