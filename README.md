# Node.js delivery demo

This small HTTP application demonstrates a shared Node pipeline. Run `npm ci`,
`npm run lint`, `npm test`, `npm run build`, and `npm start` locally.

On a pull request or manual dispatch, the delivery workflow builds and runs
simulated vendor and delivery gates, then progresses through the GitHub
environments `dev`, `test`, and `prod`. Production requires the configured
environment reviewer. Nothing is actually deployed or sent to external vendors.
CodeQL is a separate real GitHub code-scanning workflow and requires the
appropriate repository entitlement and configuration.

See [governance-docs](https://github.com/cicd-demo-org/governance-docs) for
setup, limits, and troubleshooting.
