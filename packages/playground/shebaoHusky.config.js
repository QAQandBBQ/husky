module.exports = {
  'pre-commit': ['npm test 2', 'npm test 3'],
  'post-commit': 'npm test'
}