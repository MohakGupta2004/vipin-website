# Site switches (`feature-flags.json`)

This file turns parts of the website on and off and sets the banner text at the top of every page. You can edit it in any text editor. After you save, the change shows on the next site update (or straight away on your local copy).

## Rules for editing

- Use `true` or `false` in lower case, with no quotes.
- Keep the quote marks around text, and the commas at the end of lines.
- Do not add a comma after the last item in a group.
- If you make a typo, the site does not break. It falls back to safe settings (the banner hides, other features stay on), and your developer sees a warning.

## The banner at the top of the site (`announcementBar`)

| Setting | What it does |
|---|---|
| `enabled` | `true` shows the banner, `false` hides it. |
| `id` | A label for this message, for example `cfa-launch-2026-11`. **Change the `id` whenever you write a new message.** Visitors who closed the old banner will then see the new one. If you keep the same `id`, people who closed it do not see it again. |
| `message` | The text in the banner. Keep it to one short sentence. |
| `linkLabel` | The words on the link, for example `Join the waitlist`. |
| `linkHref` | Where the link goes. Use a page on this site, like `/upcoming`, or a full address starting with `https://`. |
| `dismissible` | `true` lets visitors close the banner. `false` keeps it on screen. |

If `enabled` is `true` but `id` or `message` is empty, the banner stays hidden.

## The "create an account" prompt (`appSignupPrompt`)

The website's main job is to send visitors to the learning app. This prompt asks them to create a free account or log in.

| Setting | What it does |
|---|---|
| `enabled` | `true` turns the prompt on, `false` turns it off. |
| `delaySeconds` | How long a visitor is on a page before the prompt appears (0 to 600). |
| `cooldownMinutes` | After a visitor closes it, how long before it can appear again on a later page (0 to 10080). |
| `maxDismissals` | How many times a visitor can close it (1 to 20). After that it can no longer be closed. |
| `afterMaxDismissals` | What happens after that. `"sticky-bar"` shows a slim bar along the bottom of the screen with the signup and login buttons. The rest of the page still works. `"block"` shows a pop-up in the middle that stays until the visitor signs up or logs in. It covers the page, so use it with care. |
| `excludePaths` | Pages where the prompt never shows, for example `"/contact"`. End a path with `/*` to include everything below it. |

Once a visitor clicks sign up or log in, the prompt stops for 30 days. If the visitor's browser blocks saved settings, the prompt acts as if it is their first visit and never blocks the page.
If `appSignupPrompt` is missing, the prompt is off. A mistyped `afterMaxDismissals` falls back to `"sticky-bar"`.

## Feature switches

Each one looks like `{ "enabled": true }`. Set it to `false` to remove that feature. The space it used to take disappears.

| Switch | What it controls |
|---|---|
| `homeCourseSearch` | The course search box and area filters on the home page. |
| `examFinder` | The "Find my course" questions, on its own page and wherever it appears. |
| `exitIntentPopup` | The pop-up offering a masterclass seat when a visitor on a computer moves to leave the page. |
| `diagnosticSlideIn` | The small box that slides in on course pages about the free diagnostic. |
| `masterclassSignup` | The masterclass sign-up forms. |

A switch that is missing counts as on.
