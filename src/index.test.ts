/* import * as fs from 'fs';
import * as glob from 'glob';
import * as imagemin from 'imagemin';
import VitePluginWebpAndPath from './index';

// モックの設定
jest.mock('fs', () => ({
	...jest.requireActual('fs'),
	unlinkSync: jest.fn(),
	readFileSync: jest.fn(),
	writeFileSync: jest.fn(),
}));

jest.mock('glob', () => ({
	sync: jest.fn(),
}));

jest.mock('chalk', () => {
	return {
		// モックの実装
	};
});
jest.mock('imagemin-webp', () => {
	return {
		// モックの実装
	};
});
jest.mock('imagemin', () => {
	return {
		// モックの実装
	};
});

describe('VitePluginWebpAndPath', () => {
	let globSyncMock: jest.Mock;
	let fsUnlinkSyncMock: jest.Mock;
	let fsReadFileSyncMock: jest.Mock;
	let fsWriteFileSyncMock: jest.Mock;
	let imageminMock: jest.Mock;

	beforeEach(() => {
		globSyncMock = jest.fn();
		fsUnlinkSyncMock = jest.fn();
		fsReadFileSyncMock = jest.fn();
		fsWriteFileSyncMock = jest.fn();
		imageminMock = jest.fn();

		(glob as any).sync = globSyncMock;
		(fs as any).unlinkSync = fsUnlinkSyncMock;
		(fs as any).readFileSync = fsReadFileSyncMock;
		(fs as any).writeFileSync = fsWriteFileSyncMock;
		(imagemin as any).default = imageminMock;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should convert images to webp format', async () => {
		globSyncMock.mockReturnValue(['image1.jpg', 'image2.png']);
		const plugin = VitePluginWebpAndPath();
		await plugin.writeBundle();
		expect(imageminMock).toHaveBeenCalled();
	});
});
 */