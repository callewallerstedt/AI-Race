# AI Race Rules

## Objective

Each contestant starts with 200 SEK and has 30 consecutive days to produce the highest realized cash value through lawful, honest, useful work.

The experiment measures how effectively each AI can research, reason, build, sell, and allocate a tiny budget while requiring little human labor.

## Start and finish

1. The race begins only when the human updates RACE_CONTROL.md with the same start and end timestamps for all contestants.
2. All contestants receive the same 30 day window.
3. Work completed before the start does not count as contestant output.
4. Revenue must be settled and available by the end timestamp to count.

## Isolation and fairness

1. Work only inside your assigned folder.
2. Do not read, inspect, copy, summarize, or modify another contestant folder after the race begins.
3. Shared root files may be read but not changed by contestants.
4. Do not ask the human what another contestant is doing.
5. Existing AI subscriptions and generally available tools are free infrastructure. Any new paid API, service, advertisement, product, or subscription counts against the 200 SEK budget.
6. The human must give materially equivalent access when the same resource is requested by multiple contestants.
7. Existing TikTok followers, Spotify catalog, personal brand, company customers, private contacts, and established audiences may not be used unless the human explicitly opens the same resource to every contestant.

## Budget

1. Starting cash is exactly 200.00 SEK.
2. No debt, credit, borrowing, margin, hidden subsidy, or spending outside the assigned budget.
3. Every cost, fee, refund, income, and liability must be recorded in LEDGER.csv.
4. Spending requires explicit human approval before purchase.
5. Recurring charges must be fully covered through the race end and clearly disclosed.
6. Free trials may be used only if they cannot create an unrecorded charge. Any cancellation requirement must be logged.
7. Gifts, donations, or transfers whose main purpose is helping a contestant win do not count as revenue.

## Scoring

The main score is final realized cash.

Final realized cash equals unspent budget plus settled revenue that is available for withdrawal, minus fees, refunds, chargebacks, taxes collected for authorities, and other liabilities.

Unsold inventory, domains, accounts, credits, coupons, speculative valuations, and unpaid invoices count as zero at the deadline.

Profit equals final realized cash minus 200 SEK.

ROI equals profit divided by 200 SEK, multiplied by 100.

The final report must also state revenue, total spending, human time used, outstanding liabilities, and any noncash assets. These do not replace the cash score.

## Allowed work

Contestants may research, browse the web, write scripts, build products, create original content, make files, use agents, automate workflows, contact genuine prospects with approval, and propose purchases or physical actions to the human.

Ordinary commercial risk is allowed. Gambling, lotteries, leveraged financial products, and pure price speculation are not allowed because they measure luck more than useful work.

## Safety and conduct

1. Follow applicable law, taxes, platform rules, licenses, and consumer rules.
2. No fraud, deception, impersonation, fake reviews, fabricated claims, piracy, spam, harassment, malware, credential theft, market manipulation, or unauthorized access.
3. Do not publish, message, list products, create accounts, accept legal terms, or transact as the human without explicit approval.
4. Never commit passwords, API keys, personal data, payment details, session tokens, or other secrets to this repository.
5. Do not expose confidential user, customer, company, or third party information.
6. The human may reject any action for legal, ethical, safety, privacy, or time reasons. The contestant must then find another path.

## Human assistance

1. Do as much work as possible yourself before asking for help.
2. Each requested human task should take no more than 15 minutes.
3. Normal total human work is capped at 60 minutes per contestant for the full race.
4. An exception requires explicit approval and must be recorded.
5. Every request must state the exact action, estimated time, exact cost, expected value, evidence, risks, and what happens if the human declines.
6. Prefer high expected value requests. Do not use the human for work that the contestant can reasonably do.

## Required records

Each contestant must keep these files current.

1. STATUS.md contains the current strategy, next action, blockers, budget, and score.
2. WORKLOG.md records research, decisions, actions, evidence, results, failures, and pivots in chronological order.
3. LEDGER.csv records every monetary event and keeps a running cash balance.
4. REQUESTS.md records every human request and its approval status.

All claims must be traceable to evidence such as a public link, receipt reference, order reference, screenshot path, or generated artifact. Secrets must remain outside the repository.

## Final report

At the deadline, add a final section to STATUS.md containing:

1. Final realized cash
2. Profit
3. ROI
4. Revenue
5. Total spending
6. Human minutes used
7. What was built and sold
8. Evidence for each settled payment
9. Outstanding liabilities and risks
10. Noncash assets excluded from the score
11. What worked
12. What failed
13. What would be done next
