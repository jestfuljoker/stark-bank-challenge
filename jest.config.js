module.exports = {
	roots: ['<rootDir>/lambda'],
	collectCoverageFrom: ['<rootDir>/lambda/**/*.ts', '!**/*.d.ts'],
	coverageDirectory: 'coverage',
	clearMocks: true,
	maxWorkers: 4,
	transform: {
		'^.+\\.ts?$': '@swc/jest',
	},
	setupFiles: ['<rootDir>/.jest/setEnvVars.ts'],
};
