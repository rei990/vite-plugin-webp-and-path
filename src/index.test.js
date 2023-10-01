import VitePluginWebpAndPath from './index.js';

// 依存関係をモック
jest.mock('fs', () => ({
	unlinkSync: jest.fn(),
	readFileSync: jest.fn(),
	writeFileSync: jest.fn(),
}));
jest.mock('glob', () => ({
	sync: jest.fn(),
}));
jest.mock('imagemin', () => jest.fn());
jest.mock('imagemin-webp', () => jest.fn());

describe('VitePluginWebpAndPath', () => {
	// テスト前にモックをクリア
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return an object with the correct properties', () => {
		const plugin = VitePluginWebpAndPath();

		expect(typeof plugin).toBe('object');
		expect(plugin).toHaveProperty('name');
		expect(plugin.name).toBe('vite-plugin-webp-and-path');
		expect(plugin).toHaveProperty('writeBundle');
		expect(typeof plugin.writeBundle).toBe('function');
	});

	// 画像の変換についてのテスト
	it('should convert images to webp format', async () => {
		const plugin = VitePluginWebpAndPath();
		const imageminMock = require('imagemin');
		const globMock = require('glob');

		// glob.sync が画像ファイルを返すようにモックを設定
		globMock.sync.mockReturnValue(['image1.jpg', 'image2.png']);

		await plugin.writeBundle();

		expect(imageminMock).toHaveBeenCalled();
	});

	// パスの更新についてのテスト
	/* it('should update image paths in HTML and CSS files', async () => {
		const plugin = VitePluginWebpAndPath();
		const fsMock = require('fs');

		fsMock.readFileSync.mockReturnValue('some content with .jpg');

		await plugin.writeBundle();

		expect(fsMock.writeFileSync).toHaveBeenCalledWith(
			expect.any(String),
			'some content with .webp'
		);
	}); */

	/* // ファイルが見つからない場合
	it('should handle file not found gracefully', async () => {
		const plugin = VitePluginWebpAndPath();
		const globMock = require('glob');

		globMock.sync.mockReturnValue([]);

		await expect(plugin.writeBundle()).resolves.not.toThrow();
	});

	// 変換に失敗する場合
	it('should handle image conversion failure gracefully', async () => {
		const plugin = VitePluginWebpAndPath();
		const imageminMock = require('imagemin');

		imageminMock.mockRejectedValue(new Error('Conversion failed'));

		await expect(plugin.writeBundle()).resolves.not.toThrow();
	}); */
});
