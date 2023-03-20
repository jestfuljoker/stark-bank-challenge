module.exports = {
	roots: ['<rootDir>/lambda'],
	collectCoverageFrom: ['<rootDir>/lambda/**/*.ts', '!**/*.d.ts'],
	coverageDirectory: 'coverage',
	clearMocks: true,
	transform: {
		'^.+\\.ts?$': '@swc/jest',
	},
	setupFiles: ['<rootDir>/.jest/setEnvVars.ts'],
};
