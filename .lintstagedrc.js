export default {
  //모든 TypeScript/JavaScript 파일에 대한 ESLint 설정
  "**/*.{js,jsx,ts,tsx}": (files) => {
    return [`pnpm eslint ${files.join(" ")} --fix`];
  },
  // 공통 Prettier 설정
  "**/*.{ts,tsx,js,jsx,json,md,mdx,css,html,yml,yaml,scss}": [
    "prettier --write",
  ],
};
