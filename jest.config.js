module.exports = {
	roots: ['<rootDir>/lambda'],
	collectCoverageFrom: ['<rootDir>/lambda/**/*.ts', '!**/*.d.ts'],
	coverageDirectory: 'coverage',
	transform: {
		'^.+\\.ts?$': '@swc/jest',
	},
};
