# CONTRIBUTING

This repository contains the integration service connecting **Wrike** and **Act! CRM**.

The goal is to maintain a stable, deterministic integration layer that can be safely extended without breaking production workflows.

---

# Commit Standards

All commits must follow the **Conventional Commits format**.

Format:

type(scope): short summary

Example:

feat(act): add opportunity creation endpoint

---

# Allowed Commit Types

feat  
A new feature

fix  
Bug fix

refactor  
Code restructuring without changing behavior

test  
Testing utilities or validation scripts

docs  
Documentation updates

chore  
Repository maintenance tasks

---

# Allowed Scopes

auth  
Authentication logic

act  
Act CRM integration

wrike  
Wrike integration

server  
Express API server

config  
Environment or configuration

discovery  
Schema discovery utilities

tests  
Testing scripts

repo  
Repository setup or structure

---

# Example Commit Messages

feat(auth): implement Act token caching service

feat(act): add opportunity retrieval client

test(discovery): add script for custom field enumeration

fix(act): correct opportunity date formatting

---

# Branch Strategy

main  
Stable integration code

feature/*  
New development work

fix/*  
Bug fixes

---

# Security Rules

The following must **never be committed**:

.env  
API tokens  
CRM credentials  
OAuth secrets

These must always remain in environment variables.

---

# Code Guidelines

1. All external API calls must go through service modules
2. Authentication must use the shared token service
3. Do not hardcode Act stage IDs or Wrike IDs
4. Use configuration mappings for field relationships
5. Discovery scripts should remain in the repo for debugging

---

# Integration Philosophy

The integration must remain:

Deterministic  
Observable  
Auditable  

All CRM writes must be traceable through logs and structured payloads.

