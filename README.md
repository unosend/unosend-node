# @unosend/node

Official Node.js SDK for [Unosend](https://unosend.co) — Email API for Developers.

## Installation

```bash
npm install @unosend/node
```

## Quick Start

```typescript
import { Unosend } from '@unosend/node';

const unosend = new Unosend({ apiKey: 'un_your_api_key' });

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
const unosend = new Unosend({
  apiKey: 'un_your_api_key',
  baseUrl: 'https://api.unosend.co'  // default
});
```

## Features

- **Emails** — Send, batch send, list, and retrieve emails
- **Domains** — Add, verify, and manage sending domains
- **Audiences** — Create and manage contact lists
- **Contacts** — Create, list, update, delete, and validate contacts
- **Templates** — Create, list, update, and delete email templates
- **Broadcasts** — Create and send email campaigns
- **Webhooks** — Manage delivery event webhooks
- **Inbound** — Receive incoming emails and download attachments
- **Suppressions** — Manage email suppression list
- **API Keys** — Create, list, and revoke API keys

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
  priority: 'high',
  headers: { 'X-Custom-Header': 'value' },
  tags: [{ name: 'campaign', value: 'welcome' }],
  tracking: { open: true, click: true },
  scheduledFor: '2026-01-20T10:00:00Z',
});

// Send with a template
const { data, error } = await unosend.emails.send({
  from: 'you@yourdomain.com',
  to: 'user@example.com',
  subject: 'Welcome!',
  templateId: 'tpl_abc123',
  templateData: { first_name: 'John', company: 'Acme' },
});

// Send with attachments
const { data, error } = await unosend.emails.send({
  from: 'you@yourdomain.com',
  to: 'user@example.com',
  subject: 'Your invoice',
  html: '<p>Please find attached.</p>',
  attachments: [{ filename: 'invoice.pdf', content: base64Content, content_type: 'application/pdf' }],
});

// Batch send (up to 100 emails)
const { data, error } = await unosend.emails.batch([
  { from: 'you@yourdomain.com', to: 'a@example.com', subject: 'Hi A', html: '<p>Hello A</p>' },
  { from: 'you@yourdomain.com', to: 'b@example.com', subject: 'Hi B', html: '<p>Hello B</p>' },
]);

// Get email by ID
const { data, error } = await unosend.emails.get('email_id');

// List emails (paginated)
const { data, error, meta } = await unosend.emails.list({ page: 1, perPage: 50, status: 'delivered' });
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
// Create a contact
const { data, error } = await unosend.contacts.create({
  email: 'user@example.com',
  audienceId: 'audience_id',
  firstName: 'John',
  lastName: 'Doe',
});

// List contacts (paginated, with audience filter)
const { data, error, meta } = await unosend.contacts.list({
  audienceId: 'audience_id',
  page: 1,
  perPage: 50,
});

// Get contact
const { data, error } = await unosend.contacts.get('contact_id');

// Update contact
const { data, error } = await unosend.contacts.update('contact_id', {
  firstName: 'Jane',
  unsubscribed: true,
});

// Delete contact
const { data, error } = await unosend.contacts.delete('contact_id');

// Validate email
const { data, error } = await unosend.contacts.validate('user@example.com');

// Validate with advanced options
const { data, error } = await unosend.contacts.validate({
  email: 'user@example.com',
  checkSmtp: true,
  checkCatchAll: true,
});
```

### Templates

```typescript
// Create template
const { data, error } = await unosend.templates.create({
  name: 'Welcome Email',
  subject: 'Welcome {{first_name}}!',
  html: '<h1>Hello {{first_name}}</h1>',
});

// List templates
const { data, error } = await unosend.templates.list();

// Get template
const { data, error } = await unosend.templates.get('template_id');

// Update template
const { data, error } = await unosend.templates.update('template_id', { subject: 'New Subject' });

// Delete template
const { data, error } = await unosend.templates.delete('template_id');
```

### Broadcasts

```typescript
// Create broadcast
const { data, error } = await unosend.broadcasts.create({
  name: 'March Newsletter',
  subject: 'Our March Update',
  fromEmail: 'news@yourdomain.com',
  audienceId: 'audience_id',
  htmlContent: '<h1>Newsletter</h1>',
});

// List broadcasts
const { data, error } = await unosend.broadcasts.list({ status: 'draft' });

// Get broadcast
const { data, error } = await unosend.broadcasts.get('broadcast_id');

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
const { data, error } = await unosend.webhooks.update('webhook_id', {
  events: ['email.delivered', 'email.bounced', 'email.opened'],
});

// Delete webhook
const { data, error } = await unosend.webhooks.delete('webhook_id');
```

### Inbound Emails

```typescript
// List inbound emails
const { data, error, meta } = await unosend.inbound.list({ page: 1, perPage: 10 });

// Get inbound email
const { data, error } = await unosend.inbound.get('inbound_id');

// List attachments
const { data, error } = await unosend.inbound.listAttachments('inbound_id');

// Download attachment (returns raw Response)
const response = await unosend.inbound.getAttachment('inbound_id', 'attachment_id');
```

### Suppressions

```typescript
// Add to suppression list
const { data, error } = await unosend.suppressions.create('bounce@example.com', 'hard_bounce');

// List suppressions
const { data, error, meta } = await unosend.suppressions.list({ page: 1, reason: 'hard_bounce' });

// Get suppression
const { data, error } = await unosend.suppressions.get('suppression_id');

// Remove suppression by ID
const { data, error } = await unosend.suppressions.delete('suppression_id');

// Remove suppression by email
const { data, error } = await unosend.suppressions.deleteByEmail('bounce@example.com');
```

### API Keys

```typescript
// Create API key
const { data, error } = await unosend.apiKeys.create('Production Key');

// Create with permission level
const { data, error } = await unosend.apiKeys.create('Read Only Key', 'read_only');

// List API keys
const { data, error } = await unosend.apiKeys.list();

// Delete API key
const { data, error } = await unosend.apiKeys.delete('key_id');
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
