/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transformIgnorePatterns: ['/node_modules/(?!imagemin).+\\.js$'],
};
