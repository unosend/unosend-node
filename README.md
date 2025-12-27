# @unosend/node

Official Node.js SDK for [Unosend](https://unosend.co) - Email API Service.

## Installation

```bash
npm install @unosend/node
```

## Quick Start

```typescript
import { Unosend } from '@unosend/node';

const unosend = new Unosend('un_your_api_key');

// Send an email
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

- 📧 **Emails** - Send transactional emails with HTML/text content
- 🌐 **Domains** - Manage and verify sending domains
- 👥 **Audiences** - Create and manage contact lists
- 📇 **Contacts** - Add, update, and remove contacts

## API Reference

### Emails

```typescript
// Send an email
const { data, error } = await unosend.emails.send({
  from: 'you@yourdomain.com',
  to: ['user1@example.com', 'user2@example.com'],
  subject: 'Hello!',
  html: '<h1>Hello World</h1>',
  text: 'Hello World', // Optional plain text version
  replyTo: 'support@yourdomain.com',
  cc: ['cc@example.com'],
  bcc: ['bcc@example.com'],
  headers: {
    'X-Custom-Header': 'value'
  },
  tags: [
    { name: 'campaign', value: 'welcome' }
  ]
});

// Get email by ID
const { data, error } = await unosend.emails.get('email_id');

// List emails
const { data, error } = await unosend.emails.list({ limit: 10, offset: 0 });
```

### Domains

```typescript
// Add a domain
const { data, error } = await unosend.domains.create('yourdomain.com');

// Verify domain DNS records
const { data, error } = await unosend.domains.verify('domain_id');

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
const { data, error } = await unosend.contacts.create('audience_id', {
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe'
});

// List contacts in an audience
const { data, error } = await unosend.contacts.list('audience_id');

// Update a contact
const { data, error } = await unosend.contacts.update('contact_id', {
  firstName: 'Jane',
  unsubscribed: false
});

// Delete a contact
const { data, error } = await unosend.contacts.delete('contact_id');
```

## Error Handling

All methods return `{ data, error }`. Check for errors before using data:

```typescript
const { data, error } = await unosend.emails.send({...});

if (error) {
  console.error(`Error ${error.code}: ${error.message}`);
  return;
}

console.log('Success:', data);
```

## Configuration

```typescript
// Custom base URL (for self-hosted instances)
const unosend = new Unosend('un_your_api_key', {
  baseUrl: 'https://your-instance.com/api/v1'
});
```

## TypeScript Support

This SDK is written in TypeScript and includes full type definitions.

```typescript
import { Unosend, SendEmailOptions, Email, UnosendError } from '@unosend/node';
```

## License

MIT
