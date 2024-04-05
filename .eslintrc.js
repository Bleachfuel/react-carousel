module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "files": ["*.d.ts"],
            "parserOptions": {
                "sourceType": "module"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": 12, // or "latest" if you prefer
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": "off"
    }

}
