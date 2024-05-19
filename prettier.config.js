/** @type {import("prettier").Config} */
const config ={
  useTabs: true,
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,

  overrides: [
    {
      files: "*.md",
      options: {
        proseWrap: "always",
        useTabs: false,
        printWidth: 80,
      }
    },
  ]
}

module.exports = config;