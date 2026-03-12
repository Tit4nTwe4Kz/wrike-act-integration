# Integration Architecture
Wrike ↔ Act CRM Integration

Last Updated: 2026-03-12

---

# System Overview

This service synchronizes data between:

Wrike  
Act CRM  
Kixie  

The integration server acts as a middleware layer that handles authentication, mapping, and API communication.

---

# High-Level Architecture

Wrike Webhooks  
Kixie Webhooks  
↓  
Integration Server (Node.js + Express)  
↓  
Mapping Layer  
↓  
Act API Client  
↓  
Act CRM

---

# Component Breakdown

## Wrike

Source of project and task data.

Events:

Task created  
Task updated  
Status changed  

These events trigger the integration.

---

## Kixie

Source of phone call events.

Events include:

Call started  
Call ended  
Call disposition  

These events generate history records in Act.

---

## Integration Server

Location:

src/server.js

Responsibilities:

Receive webhooks  
Validate payloads  
Log events  
Route to appropriate services  

---

## Logging System

Location:

src/utils/logger.js

All system events are logged using structured JSON.

Example:

{
  "timestamp": "2026-03-12T04:44:50.754Z",
  "level": "INFO",
  "message": "server_started"
}

---

## Authentication Service

Location:

src/services/actAuth.js

Responsibilities:

Generate Act JWT tokens  
Cache tokens in memory  
Refresh tokens when expired  

---

## Act API Client

Location:

src/services/actClient.js

Responsibilities:

Send authenticated API requests to Act.

Supported entities:

Contacts  
Companies  
Opportunities  
History  

---

# Data Flows

---

## Wrike → Act Opportunity

Wrike Task Created  
↓  
Webhook received  
↓  
Integration mapping engine  
↓  
Act Opportunity created  

Fields mapped include:

Wrike Task Title → Opportunity Name  
Wrike Created Date → Opportunity OpenDate  
Wrike Due Date → Opportunity EstimatedCloseDate  

---

## Kixie → Act History

Call occurs  
↓  
Kixie webhook  
↓  
Integration receives event  
↓  
createActHistory()  
↓  
POST /api/history  

History fields:

Result → call disposition  
Recording_URL  
Sentiment  
Conversation_Strength  
CI_Summary  
Keywords  

---

# Data Storage in Act

## Opportunities

Used to track sales pipeline progress.

Important fields:

name  
openDate  
estimatedCloseDate  
stage  
probability  

---

## History

Used to record completed actions.

Used for:

Call logs  
Meeting logs  
Email tracking  

Kixie calls are written here.

---

# Duplicate Protection (Planned)

Each Kixie call contains a unique:

Kixie_Call_ID

Future logic will prevent duplicate history entries by checking this ID before creating a record.

---

# Configuration Layer (Planned)

Mappings will be stored in configuration instead of code.

Examples:

Wrike Status → Act Stage  
Wrike User → Act Record Owner  

This allows the pipeline to change without modifying the integration code.

---

# Security Rules

Credentials must only exist in:

.env

Never commit:

API tokens  
CRM credentials  

---

# Future Architecture Enhancements

Webhook authentication  
Retry queue for failed API calls  
Rate limiting  
Dead-letter queue for failed events  
Monitoring dashboard  

---

# Repository Structure

wrike-act-integration
│
├── docs
│   └── architecture.md
│
├── src
│   ├── server.js
│   ├── services
│   │   ├── actAuth.js
│   │   └── actClient.js
│   │
│   ├── utils
│   │   └── logger.js
│
├── CONTRIBUTING.md
├── integration-contract.yaml
├── PROJECT_STATE.md
└── package.json

---

# System Status

Act API integration confirmed working.

Next development steps:

Wrike API client  
Wrike webhook listener  
Task → Opportunity mapping  
Call duplicate protection

