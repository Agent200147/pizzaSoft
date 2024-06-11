export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },

    moduleDirectories: ["node_modules", "src"],
    "rootDir": "./",
    "modulePaths": [
        "<rootDir>"
    ],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "^.+\\.svg$": "jest-transformer-svg",
        "^@/(.*)$": "<rootDir>/src/$1"
    },

    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};