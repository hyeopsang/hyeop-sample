// commitlint.config.js
const messages = {
  "type-empty":
    "커밋 타입이 비어있습니다. (feat, fix 등의 타입을 입력해주세요)",
  "subject-empty": "커밋 메시지가 비어있습니다. (변경 내용을 입력해주세요)",
};

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore"],
    ],
  },
  plugins: [
    {
      rules: {
        "type-empty": (parsed) => {
          const { type } = parsed;
          if (type) return [true];

          return [false, messages["type-empty"]];
        },
        "subject-empty": (parsed) => {
          const { subject } = parsed;
          if (subject) return [true];

          return [false, messages["subject-empty"]];
        },
      },
    },
  ],
};
