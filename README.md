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

## Configuration

```typescript
const unosend = new Unosend('un_your_api_key', {
  baseUrl: 'https://api.unosend.co/v1'  // default
});
```

## Features

- **Emails** — Send, batch, resend, cancel, export, track clicks
- **Domains** — Add, verify, and manage sending domains
- **Audiences** — Create and manage contact lists
- **Contacts** — CRUD, bulk create, validate, enrich, import/export
- **Templates** — Create, render, duplicate email templates
- **Broadcasts** — Create and send email campaigns
- **Webhooks** — Manage delivery event webhooks
- **Inbound** — Receive and reply to incoming emails
- **Suppressions** — Manage email suppression list
- **Events & Logs** — Query delivery events and email logs
- **Metrics** — Email analytics and link tracking
- **API Keys** — Create and revoke API keys
- **Workspaces** — Multi-workspace management
- **Wallet** — Check balance, add funds, view transactions
- **Subscription** — View current subscription
- **Usage** — Query usage stats

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
});

// Batch send (up to 100 emails)
const { data, error } = await unosend.emails.batch([
  { from: 'you@yourdomain.com', to: 'a@example.com', subject: 'Hi A', html: '<p>Hello A</p>' },
  { from: 'you@yourdomain.com', to: 'b@example.com', subject: 'Hi B', html: '<p>Hello B</p>' },
]);

// Get email by ID
const { data, error } = await unosend.emails.get('email_id');

// List emails (paginated)
const { data, error } = await unosend.emails.list({ page: 1, perPage: 50 });

// Cancel a scheduled email
const { data, error } = await unosend.emails.cancel('email_id');

// Resend an email
const { data, error } = await unosend.emails.resend('email_id');

// Get click data
const { data, error } = await unosend.emails.clicks('email_id');

// Export emails
const { data, error } = await unosend.emails.export({ status: 'delivered', format: 'csv' });

// Check email delivery status
const { data, error } = await unosend.emails.status({ since: '2026-01-01' });
```

### Domains

```typescript
// Add a domain
const { data, error } = await unosend.domains.create('yourdomain.com');

// List domains
const { data, error } = await unosend.domains.list();

// Get domain details
const { data, error } = await unosend.domains.get('domain_id');

// Verify DNS records
const { data, error } = await unosend.domains.verify('domain_id');

// Check DNS status
const { data, error } = await unosend.domains.dnsStatus('domain_id');

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

// Update audience
const { data, error } = await unosend.audiences.update('audience_id', { name: 'New Name' });

// Delete audience
const { data, error } = await unosend.audiences.delete('audience_id');
```

### Contacts

```typescript
// Create a contact
const { data, error } = await unosend.contacts.create({
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  audienceId: 'audience_id',
});

// List contacts (paginated)
const { data, error } = await unosend.contacts.list({ page: 1, perPage: 50 });

// Get contact
const { data, error } = await unosend.contacts.get('contact_id');

// Update contact
const { data, error } = await unosend.contacts.update('contact_id', {
  firstName: 'Jane',
  metadata: { plan: 'pro' },
});

// Delete contact
const { data, error } = await unosend.contacts.delete('contact_id');

// Bulk create contacts
const { data, error } = await unosend.contacts.bulkCreate({
  audienceId: 'audience_id',
  contacts: [
    { email: 'a@example.com', firstName: 'Alice' },
    { email: 'b@example.com', firstName: 'Bob' },
  ],
});

// Validate email (POST)
const { data, error } = await unosend.contacts.validate('user@example.com');
// data.valid, data.score, data.suppressed

// Enrich contacts (gender detection)
const { data, error } = await unosend.contacts.enrich({ email: 'john@example.com' });

// Export contacts
const { data, error } = await unosend.contacts.export({ audienceId: 'aud_id', format: 'csv' });

// Import contacts
const { data, error } = await unosend.contacts.import({
  audienceId: 'audience_id',
  file: base64CsvContent,
  format: 'csv',
});
```

### Templates

```typescript
// Create template
const { data, error } = await unosend.templates.create({
  name: 'Welcome Email',
  subject: 'Welcome {{name}}!',
  html: '<h1>Hello {{name}}</h1>',
});

// List templates
const { data, error } = await unosend.templates.list();

// Get template
const { data, error } = await unosend.templates.get('template_id');

// Update template
const { data, error } = await unosend.templates.update('template_id', { subject: 'New Subject' });

// Delete template
const { data, error } = await unosend.templates.delete('template_id');

// Render template with variables
const { data, error } = await unosend.templates.render('template_id', { name: 'John' });

// Duplicate template
const { data, error } = await unosend.templates.duplicate('template_id', 'Copy of Welcome');
```

### Broadcasts

```typescript
// Create broadcast
const { data, error } = await unosend.broadcasts.create({
  name: 'March Newsletter',
  subject: 'Our March Update',
  from: 'news@yourdomain.com',
  html: '<h1>Newsletter</h1>',
  audienceId: 'audience_id',
});

// List broadcasts
const { data, error } = await unosend.broadcasts.list();

// Get broadcast
const { data, error } = await unosend.broadcasts.get('broadcast_id');

// Update broadcast
const { data, error } = await unosend.broadcasts.update('broadcast_id', { subject: 'Updated' });

// Delete broadcast
const { data, error } = await unosend.broadcasts.delete('broadcast_id');

// Send broadcast
const { data, error } = await unosend.broadcasts.send('broadcast_id');
```

### Webhooks

```typescript
// Create webhook
const { data, error } = await unosend.webhooks.create({
  url: 'https://yourapp.com/webhook',
  events: ['email.delivered', 'email.bounced'],
});

// List webhooks
const { data, error } = await unosend.webhooks.list();

// Get webhook
const { data, error } = await unosend.webhooks.get('webhook_id');

// Update webhook
const { data, error } = await unosend.webhooks.update('webhook_id', { enabled: false });

// Delete webhook
const { data, error } = await unosend.webhooks.delete('webhook_id');
```

### Inbound Emails

```typescript
// List inbound emails
const { data, error } = await unosend.inbound.list({ page: 1 });

// Get inbound email (with HTML content)
const { data, error } = await unosend.inbound.get('inbound_id');

// Reply to inbound email
const { data, error } = await unosend.inbound.reply('inbound_id', {
  html: '<p>Thanks for your message!</p>',
});

// Get replies
const { data, error } = await unosend.inbound.replies('inbound_id');

// Get attachments
const { data, error } = await unosend.inbound.attachments('inbound_id');
```

### Suppressions

```typescript
// Add to suppression list
const { data, error } = await unosend.suppressions.create('bounce@example.com', 'hard_bounce');

// List suppressions
const { data, error } = await unosend.suppressions.list({ page: 1 });

// Get suppression
const { data, error } = await unosend.suppressions.get('suppression_id');

// Remove from suppression list
const { data, error } = await unosend.suppressions.delete('suppression_id');
```

### Events & Logs

```typescript
// List events
const { data, error } = await unosend.events.list({ days: 7, limit: 100 });

// List email logs
const { data, error } = await unosend.logs.list({ status: 'delivered', days: 30 });
```

### Metrics

```typescript
// Get email metrics
const { data, error } = await unosend.metrics.get({ days: 30 });

// Get link click metrics
const { data, error } = await unosend.metrics.links({ days: 7, limit: 10 });
```

### API Keys

```typescript
// Create API key
const { data, error } = await unosend.apiKeys.create('Production Key');

// List API keys
const { data, error } = await unosend.apiKeys.list();

// Delete API key
const { data, error } = await unosend.apiKeys.delete('key_id');
```

### Workspaces

```typescript
// Create workspace
const { data, error } = await unosend.workspaces.create('My Workspace');

// List workspaces
const { data, error } = await unosend.workspaces.list();

// Update workspace
const { data, error } = await unosend.workspaces.update('workspace_id', { name: 'Renamed' });

// Delete workspace
const { data, error } = await unosend.workspaces.delete('workspace_id');
```

### Wallet & Subscription

```typescript
// Get wallet balance
const { data, error } = await unosend.wallet.get();

// Add funds
const { data, error } = await unosend.wallet.addFunds(50);

// View transactions
const { data, error } = await unosend.wallet.transactions();

// Get subscription info
const { data, error } = await unosend.subscription.get();
```

### Usage

```typescript
// Get usage stats
const { data, error } = await unosend.usage.get('2026-03');
```

## Error Handling

All methods return `{ data, error }`. Check `error` before using `data`:

```typescript
const { data, error } = await unosend.emails.send({ ... });

if (error) {
  console.error(`Error ${error.code}: ${error.message}`);
  // error.statusCode — HTTP status code
  // error.code — error code from API
  // error.message — human-readable message
} else {
  console.log('Success:', data);
}
```

The SDK automatically retries requests on 429 (rate limited) with exponential backoff.

## License

MIT
