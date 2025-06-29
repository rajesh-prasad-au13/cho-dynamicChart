module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: ["plugin:vue/vue3-essential"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module"
  },
  rules: {
    // Disable all ESLint rules
    "no-console": "off",
    "no-debugger": "off",
    "no-unused-vars": "off",
    "vue/no-unused-vars": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-unused-components": "off"
  }
};
