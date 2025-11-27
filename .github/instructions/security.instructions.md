---
applyTo: "{src/server/**/*.ts,src/features/**/interactors/*.ts}"
---

# Security Instructions

## Context
These instructions apply to **Backend Server** code and **Feature Interactors** where business logic resides.

## Checklist
- [ ] **Input Validation**: Validate all inputs using Zod.
- [ ] **Authorization**: Check user permissions before executing actions.
- [ ] **Sanitization**: Sanitize outputs to prevent XSS.
- [ ] **Authenticated Configuration**: First load the user from the session.
- [ ] **Secrets**: Access secrets via mobile secure enclave or keystore only.
