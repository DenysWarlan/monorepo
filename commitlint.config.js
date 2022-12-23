module.exports = {
  extends: ["@commitlint/config-angular"],
  rules: {
    'header-max-length': [2, 'always', 150],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert'],
    ],
    'scope-enum': [2, 'always', ['api', 'web', 'libs', 'apps']],
  },
};
