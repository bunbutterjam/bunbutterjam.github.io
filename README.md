# samaiya.in

Personal website of Swapnesh Samaiya, built with Jekyll.

## Run locally

    bundle install
    bundle exec jekyll serve

## Deploy

Pushing to `gh-pages` runs `.github/workflows/pages.yml`, which builds the site
with the versions in `Gemfile.lock` and publishes it to GitHub Pages.

## Layout

- `_projects/`, `_posts/`, `_pages/`: site content
- `_layouts/`, `_includes/`, `_sass/`: templates and styles
- `assets/`: images, documents, scripts
