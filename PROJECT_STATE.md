# PROJECT STATE RECORD
Wrike ↔ Act Integration

Last Updated: 2026-03-12

---

# Purpose

This file captures the full integration status so development can restart without loss of context.

If a new ChatGPT session or developer takes over, this document provides the canonical state of the project.

---

# Repository

wrike-act-integration

Location:

/Users/travisroberts_ja/GitHub/wrike-act-integration

---

# Integration Goal

Synchronize Wrike tasks with Act CRM opportunities and log Kixie calls as Act history records.

Primary integrations:

Wrike
Act CRM
Kixie

---

# Current System Architecture

Wrike / Kixie
      ↓
Integration Server (Node.js + Express)
      ↓
Mapping Layer
      ↓
Act API Client
      ↓
Act CRM

---

# Confirmed Working Components

Act API authentication (JWT token generation)

src/services/actAuth.js

Act API client

src/services/actClient.js

Opportunity retrieval

src/test-act-opportunities.js

Custom field discovery

src/discover-act-custom-fields.js

Integration server

src/server.js

Structured logging

src/utils/logger.js

---

# Logging Format

Structured JSON logging.

Example:

{
  "timestamp": "...",
  "level": "INFO",
  "message": "server_started",
  "port": 3000
}

---

# Act API Configuration

Base URL

https://apius.act.com/act.web.api

Database

JohnsonMaster

Authentication

Basic → JWT via /authorize endpoint

---

# Confirmed Act Entities

Contacts

Companies

Opportunities

History

Activities

Groups

---

# Opportunity Schema (confirmed via API)

Key fields:

id
name
actualCloseDate
estimatedCloseDate
openDate
probability
productTotal
status
statusName
stage
customFields

---

# Opportunity Custom Fields

opportunity_field_1
opportunity_field_2
opportunity_field_3
opportunity_field_4
opportunity_field_5
opportunity_field_6
opportunity_field_7
opportunity_field_8
opportunity_type
product_amount
service_amount
proposal_number
proposal_date
memo
radar

---

# Contact Custom Fields

radar_notes
prospect_score
segmentation
classification
newsletter
email_marketing
lead_score
client_retention_score
mailing_address fields
social fields

---

# History Custom Fields (Kixie Integration)

Kixie_Call_ID
Recording_URL
Sentiment
Conversation_Strength
CI_Summary
Keywords
Call_Direction

These are written when a call is logged.

---

# Call Logging Behavior

Calls are logged using:

POST /api/history

Disposition is stored in:

History.Result

Additional metadata stored in custom fields.

Example:

Result = "Voicemail"

Custom fields:

Recording_URL
Sentiment
CI_Summary
Keywords

---

# Kixie Call Flow

Kixie webhook
      ↓
Integration receives event
      ↓
createActHistory()
      ↓
POST /api/history
      ↓
History record created in Act

---

# Pending Schema Work

14 custom fields still need to be created in Act.

These include fields for Kixie reporting such as:

Last_Kixie_Call_Date
Last_Kixie_Disposition
SMS_Consent_Status
Phone_Duplicate_Flag
Conversation_Strength
Keywords

These will be added later.

---

# Pipeline Stages

Sales pipeline exists in Act but will be redesigned to match the business workflow.

Therefore:

Stage IDs must NOT be hardcoded in the integration.

Stage mapping will be configurable.

---

# Commit Standards

Conventional commits.

Format:

type(scope): summary

Example:

feat(act): implement opportunity creation

Scopes used:

auth
act
wrike
server
config
discovery
tests
repo

---

# Next Development Steps

1. Implement Wrike API client
2. Retrieve Wrike tasks
3. Discover Wrike statuses
4. Discover Wrike custom fields
5. Build mapping layer
6. Implement Wrike webhook listener
7. Implement opportunity creation from tasks
8. Implement duplicate call protection for Kixie call IDs

---

# Important Design Rules

Never hardcode stage IDs.

Never commit credentials.

All API requests must use service modules.

All logs must use the structured logger.

---

# System Health Check

Server endpoint:

GET /

Expected log:

{
  "level": "INFO",
  "message": "health_check"
}

---

# End of Record


