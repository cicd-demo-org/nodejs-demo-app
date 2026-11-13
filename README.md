# Node.js delivery demo

This small HTTP application demonstrates a shared Node pipeline. Run `npm ci`,
`npm run lint`, `npm test`, `npm run build`, and `npm start` locally.

After starting the app, `GET /health` returns `{"status":"ok"}`.

On a pull request or manual dispatch, the delivery workflow builds and runs
simulated vendor and delivery gates, then progresses through the GitHub
environments `dev`, `test`, and `prod`. Production requires the configured
environment reviewer. Nothing is actually deployed or sent to external vendors.
CodeQL is a separate real GitHub code-scanning workflow and requires the
appropriate repository entitlement and configuration.

Two separate, manually triggered workflows provide an **opt-in example** of
publishing an attested GHCR image and deploying a verified digest to a dedicated
self-hosted Docker runner. They require explicit configuration and are not
connected to the simulated gates. They are not production authorization.
See the deployment guide before enabling them.

Pull requests demonstrate the organization-required checks and the protected
production approval before merge.

See [governance-docs](https://github.com/cicd-demo-org/governance-docs) for
setup, limits, and troubleshooting.
