# Blog staging

Articles waiting to be published, staged here by `sync_blog_staging.py`
(see `Engineering/automation/blog-sync-launchd.md` in the Nassgence repo)
once their row in `SEO_Articles_Grades.xlsx` is marked `Status != Live` and
`Validation == OK`.

Nothing in the site reads this folder, so nothing here is live. A scheduled
routine drains it twice a week into `content/articles/`, always via a pull
request, never a direct push to `main`.
