# Verification record

Version 1.0, 2026-10-12.

## Completed

- 21 Node.js automated checks passed: money/date parsing, invalid records, split amount columns, currency and direction isolation, unique matching, duplicate references, date/amount windows, manual uniqueness, record coverage, CSV safety and reproducible model evaluation.
- 11 browser import checks passed. Both authored XLSX files were parsed value-for-value; ISO and numeric Excel dates were checked; CSV BOM/quoting, numeric negative exports and formula injection protection were checked.
- Browser UI verified: load synthetic demo, three exact rule matches, amount-difference confirmation dialog, manual confirmation retaining the 20 CNY discrepancy, and undo returning the pair to review.
- CSV was downloaded through the real browser download flow. It covers all 12 ledger rows and 11 statement rows: 3 matched pairs and 17 unmatched source records, 20 report rows in total.
- Both example workbooks were visually inspected after export.
- Final workspace screenshot captured from the running app.

## Verification limits

The app was browser-tested through a loopback HTTP server. The browser automation policy blocks `file://` navigation, so double-click offline launch was not automated. The app uses local classic scripts and does not depend on module fetches, APIs or external resources, and an offline launcher is included for the user to open locally.

The browser file chooser successfully imported a real XLSX. A date-type compatibility issue was found and repaired; the subsequent 11-check browser fixture verifies the repaired parser on both complete workbooks.

No real financial datasets, enterprise deployment, external user study or GitHub account publication has been performed. The synthetic text baseline obtains 56.25% accuracy on its fixed 16-pair holdout; this limitation is visible in the app and documentation.
