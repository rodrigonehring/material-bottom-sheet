const ghpages = require('gh-pages')

ghpages.publish(
  'build',
  (error) =>
    error
      ? console.log({ error })
      : console.log(
          '@see https://rodrigonehring.github.io/material-bottom-sheet/',
        ),
)
