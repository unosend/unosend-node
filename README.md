# @unosend/node

Official Node.js SDK for [Unosend](https://unosend.co) — Email API for Developers.

## Installation

```bash
npm install @unosend/node
```

## Quick Start

```typescript
import { Unosend } from '@unosend/node';

const unosend = new Unosend('un_your_api_key');

const { data, error } = await unosend.emails.send({
  from: 'hello@yourdomain.com',
  to: 'user@example.com',
  subject: 'Hello from Unosend!',
  html: '<h1>Welcome!</h1><p>Thanks for signing up.</p>'
});

if (error) {
  console.error('Failed to send:', error.message);
} else {
  console.log('Email sent:', data.id);
}
```

## Features

- **Emails** — Send, batch, resend, cancel, export, track clicks
- **Domains** — Add, verify, and manage sending domains
- **Audiences** — Create and manage contact lists
- **Contacts** — CRUD, bulk operations, validate, enrich, import/export
- **Templates** — Create, render, duplicate email templates
- **Broadcasts** — Create and send email campaigns
- **Webhooks** — Manage delivery event webhooks
- **Inbound** — Receive and reply to incoming emails
- **Suppressions** — Manage email suppression list
- **Events & Logs** — Query delivery events and email logs
- **Metrics** — Email analytics and link tracking
- **API Keys** — Create and revoke API keys
- **Workspaces** — Multi-workspace management
- **Usage & Billing** — Query usage and billing info

## API Reference

### Emails

```typescript
// Send an email
const { data, error } = await unosend.emails.send({
  from: 'you@yourdomain.com',
  to: ['user1@example.com', 'user2@example.com'],
  subject: 'Hello!',
  html: '<h1>Hello World</h1>',
  text: 'Hello World',
  replyTo: 'support@yourdomain.com',
  cc: ['cc@example.com'],
  bcc: ['bcc@example.com'],
  headers: { 'X-Custom-Header': 'value' },
  tags: [{ name: 'campaign', value: 'welcome' }],
  priority: 'high',
  scheduledFor: '2026-01-01T00:00:00Z',
  attachments: [{
    filename: 'invoice.pdf',
    content: base64String,
    contentType: 'application/pdf'
  }]
});

// Send with a template
const { data, error } = await unosend.emails.send({
  from: 'you@yourdomain.com',
  to: 'user@example.com',
  subject: 'Welcome!',
  templateId: 'tmpl_abc123',
  templateData: { name: 'John', company: 'Acme' }
});

// Batch send (up to 100 emails)
const { data, error } = await unosend.emails.batch([
  { from: 'you@yourdomain.com', to: 'a@example.com', subject: 'Hi A', html: '<p>Hello A</p>' },
  { from: 'you@yourdomain.com', to: 'b@example.com', subject: 'Hi B', html: '<p>Hello B</p>' },
]);
// data.success_count, data.error_count

// Get email by ID
const { data, error } = await unosend.emails.get('email_id');

// List emails
const { data, error } = await unosend.emails.list({ limit: 50, offset: 0 });

// Cancel a scheduled email
const { data, error } = await unosend.emails.cancel('email_id');

// Resend an email
const { data, error } = await unosend.emails.resend('email_id');

// Get click tracking data
const { data, error } = await unosend.emails.clicks('email_id');
// data.links, data.recentClicks

// Export emails
const { data, error } = await unosend.emails.export({
  status: 'delivered',
  startDate: '2026-01-01',
  endDate: '2026-01-31',
  format: 'json'
});

// Get email statuses (polling)
const { data, error } = await unosend.emails.status({
  ids: ['id1', 'id2'],
  since: '2026-01-01T00:00:00Z'
});
```

### Domains

```typescript
// Add a domain
const { data, error } = await unosend.domains.create('yourdomain.com');

// Verify domain DNS records
const { data, error } = await unosend.domains.verify('domain_id');

// Check DNS status
const { data, error } = await unosend.domains.dnsStatus('domain_id');

// List domains
const { data, error } = await unosend.domains.list();

// Delete domain
const { data, error } = await unosend.domains.delete('domain_id');
```

### Audiences

```typescript
// Create an audience
const { data, error } = await unosend.audiences.create('Newsletter Subscribers');

// List audiences
const { data, error } = await unosend.audiences.list();

// Get audience
const { data, error } = await unosend.audiences.get('audience_id');

// Delete audience
const { data, error } = await unosend.audiences.delete('audience_id');
```

### Contacts

```typescript
// Add a contact
const { data, error } = await unosend.contacts.create({
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  audienceId: 'aud_abc123',
  metadata: { plan: 'pro' }
});

// List contacts in an audience
const { data, error } = await unosend.contacts.list('audience_id');

// Get a contact
const { data, error } = await unosend.contacts.get('contact_id');

// Update a contact
const { data, error } = await unosend.contacts.update('contact_id', {
  firstName: 'Jane',
  subscribed: false
});

// Delete a contact
const { data, error } = await unosend.contacts.delete('contact_id');

// Bulk operations (delete, subscribe, unsubscribe, move)
const { data, error } = await unosend.contacts.bulk({
  contactIds: ['id1', 'id2', 'id3'],
  operation: 'unsubscribe'
});

// Move contacts to another audience
const { data, error } = await unosend.contacts.bulk({
  contactIds: ['id1', 'id2'],
  operation: 'move',
  audienceId: 'new_audience_id'
});

// Validate a single email
const { data, error } = await unosend.contacts.validate('user@example.com');
// data.valid, data.score, data.suppressed, data.suggestion

// Validate emails in batch (up to 1,000)
const { data, error } = await unosend.contacts.validateBatch([
  'user1@example.com',
  'user2@example.com'
]);

// Enrich contacts with gender data
const { data, error } = await unosend.contacts.enrich({
  email: 'john@example.com',
  updateContacts: true
});

// Batch enrich
const { data, error } = await unosend.contacts.enrich({
  emails: ['john@example.com', 'jane@example.com']
});

// Enrich entire audience
const { data, error } = await unosend.contacts.enrich({
  audienceId: 'aud_abc123',
  updateContacts: true
});

// Export contacts
const { data, error } = await unosend.contacts.export({
  audienceId: 'aud_abc123',
  format: 'json'
});
```

### Templates

```typescript
// Create a template
const { data, error } = await unosend.templates.create({
  name: 'Welcome Email',
  subject: 'Welcome, {{name}}!',
  html: '<h1>Hello {{name}}</h1><p>Welcome to {{company}}.</p>',
  variables: ['name', 'company']
});

// Get a template
const { data, error } = await unosend.templates.get('template_id');

// Update a template
const { data, error } = await unosend.templates.update('template_id', {
  subject: 'Updated Subject',
  html: '<h1>Updated content</h1>'
});

// Render a template with data
const { data, error } = await unosend.templates.render('template_id', {
  name: 'John',
  company: 'Acme'
});
// data.html, data.text, data.subject

// Duplicate a template
const { data, error } = await unosend.templates.duplicate('template_id', 'Welcome Email v2');
```

### Broadcasts

```typescript
// Create a broadcast
const { data, error } = await unosend.broadcasts.create({
  name: 'January Newsletter',
  subject: 'Our January Update',
  from: 'newsletter@yourdomain.com',
  html: '<h1>Newsletter</h1>',
  audienceId: 'aud_abc123',
  scheduledAt: '2026-01-15T09:00:00Z'
});

// Get broadcast details
const { data, error } = await unosend.broadcasts.get('broadcast_id');

// Update a broadcast
const { data, error } = await unosend.broadcasts.update('broadcast_id', {
  subject: 'Updated Subject'
});

// Send a broadcast
const { data, error } = await unosend.broadcasts.send('broadcast_id');
```

### Webhooks

```typescript
// Create a webhook
const { data, error } = await unosend.webhooks.create({
  url: 'https://yourapp.com/webhooks/email',
  events: ['email.delivered', 'email.bounced', 'email.complained']
});
// data.secret — save this for signature verification

// Get webhook details
const { data, error } = await unosend.webhooks.get('webhook_id');

// Update a webhook
const { data, error } = await unosend.webhooks.update('webhook_id', {
  events: ['email.delivered', 'email.bounced'],
  enabled: false
});
```

### Inbound Emails

```typescript
// List received emails
const { data, error } = await unosend.inbound.list({ limit: 20 });

// Get a specific inbound email
const { data, error } = await unosend.inbound.get('inbound_id');
// data.from, data.subject, data.html, data.text

// Reply to an inbound email
const { data, error } = await unosend.inbound.reply('inbound_id', {
  html: '<p>Thanks for reaching out!</p>'
});

// List replies to an inbound email
const { data, error } = await unosend.inbound.replies('inbound_id');

// List attachments
const { data, error } = await unosend.inbound.attachments('inbound_id');

// Delete an inbound email
const { data, error } = await unosend.inbound.delete('inbound_id');
```

### Suppressions

```typescript
// Add to suppression list
const { data, error } = await unosend.suppressions.create('bad@example.com', 'manual');

// List suppressions
const { data, error } = await unosend.suppressions.list({ limit: 50 });

// Get suppression details
const { data, error } = await unosend.suppressions.get('suppression_id');

// Remove from suppression list
const { data, error } = await unosend.suppressions.delete('suppression_id');
```

### Events

```typescript
// List delivery events
const { data, error } = await unosend.events.list({
  emailId: 'email_id',
  eventType: 'delivered',
  days: 7,
  limit: 100
});
```

### Logs

```typescript
// Search email logs
const { data, error } = await unosend.logs.list({
  status: 'bounced',
  days: 30,
  limit: 50,
  search: 'user@example.com'
});
```

### Metrics

```typescript
// Get email metrics
const { data, error } = await unosend.metrics.get({ days: 30 });
// data.total, data.delivered, data.bounced, data.opens, data.clicks

// Get link click metrics
const { data, error } = await unosend.metrics.links({ days: 7, limit: 20 });
// data.links, data.totalClicks
```

### API Keys

```typescript
// Create an API key
const { data, error } = await unosend.apiKeys.create('Production Key');
// data.key — full key, shown only once

// Revoke an API key
const { data, error } = await unosend.apiKeys.delete('key_id');
```

### Workspaces

```typescript
// Create a workspace
const { data, error } = await unosend.workspaces.create('My Workspace');

// List workspaces
const { data, error } = await unosend.workspaces.list();

// Get workspace
const { data, error } = await unosend.workspaces.get('workspace_id');

// Update workspace
const { data, error } = await unosend.workspaces.update('workspace_id', {
  name: 'Renamed Workspace'
});
```

### Usage & Billing

```typescript
// Get current usage
const { data, error } = await unosend.usage.get();

// Get usage for a specific period
const { data, error } = await unosend.usage.get('2026-01');

// Get billing info
const { data, error } = await unosend.billing.get();
```

## Error Handling

All methods return `{ data, error }`. Check for errors before using data:

```typescript
const { data, error } = await unosend.emails.send({...});

if (error) {
  console.error(`Error ${error.code}: ${error.message}`);
  // error.statusCode — HTTP status (429, 401, etc.)
  return;
}

console.log('Success:', data);
```

The SDK automatically retries on `429 Too Many Requests` with exponential backoff (up to 3 retries), respecting the `Retry-After` header.

## Configuration

```typescript
// Custom base URL
const unosend = new Unosend('un_your_api_key', {
  baseUrl: 'https://your-instance.com/api/v1'
});
```

## TypeScript Support

Full type definitions are included:

```typescript
import {
  Unosend,
  SendEmailOptions,
  Email,
  Domain,
  Contact,
  Template,
  Broadcast,
  Webhook,
  InboundEmail,
  Suppression,
  Metrics,
  UnosendError
} from '@unosend/node';
```

## Requirements

- Node.js 18+ (uses native `fetch`)

## License

MIT
