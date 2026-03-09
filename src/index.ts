// Unosend Node.js SDK
// Official SDK for the Unosend Email API

// ─── Configuration ───────────────────────────────────────────────────────────

export interface UnosendConfig {
  apiKey: string
  baseUrl?: string
}

// ─── Email Types ─────────────────────────────────────────────────────────────

export interface SendEmailOptions {
  from: string
  to: string | string[]
  subject: string
  html?: string
  text?: string
  replyTo?: string
  cc?: string | string[]
  bcc?: string | string[]
  headers?: Record<string, string>
  attachments?: Attachment[]
  tags?: Tag[]
  priority?: 'high' | 'normal' | 'low'
  templateId?: string
  templateData?: Record<string, unknown>
  scheduledFor?: string
}

export interface Attachment {
  filename: string
  content: string | Buffer
  contentType?: string
}

export interface Tag {
  name: string
  value: string
}

export interface Email {
  id: string
  from: string
  to: string[]
  subject: string
  status: 'queued' | 'sent' | 'delivered' | 'bounced' | 'complained' | 'failed'
  createdAt: string
  sentAt?: string
  deliveredAt?: string
}

export interface EmailClickData {
  email: Record<string, unknown>
  links: Array<{ url: string; count: number }>
  recentClicks: Array<Record<string, unknown>>
}

// ─── Domain Types ────────────────────────────────────────────────────────────

export interface Domain {
  id: string
  name: string
  status: 'pending' | 'verified' | 'failed'
  records: DnsRecord[]
  createdAt: string
}

export interface DnsRecord {
  type: string
  name: string
  value: string
  ttl: number
}

// ─── Audience & Contact Types ────────────────────────────────────────────────

export interface Audience {
  id: string
  name: string
  contactCount: number
  createdAt: string
}

export interface Contact {
  id: string
  email: string
  firstName?: string
  lastName?: string
  audienceId?: string
  subscribed?: boolean
  metadata?: Record<string, unknown>
  unsubscribed: boolean
  createdAt: string
}

export interface CreateContactOptions {
  email: string
  firstName?: string
  lastName?: string
  audienceId?: string
  subscribed?: boolean
  metadata?: Record<string, unknown>
}

export interface UpdateContactOptions {
  email?: string
  firstName?: string
  lastName?: string
  audienceId?: string
  subscribed?: boolean
  metadata?: Record<string, unknown>
}

export interface BulkContactOptions {
  contactIds: string[]
  operation: 'delete' | 'subscribe' | 'unsubscribe' | 'move'
  audienceId?: string
}

export interface ValidateEmailResult {
  email: string
  valid: boolean
  score: number
  suppressed: boolean
  reason?: string
  suggestion?: string
  details?: Record<string, unknown>
}

export interface EnrichOptions {
  email?: string
  name?: string
  emails?: string[]
  names?: string[]
  contactIds?: string[]
  audienceId?: string
  updateContacts?: boolean
}

export interface EnrichResult {
  name: string
  gender: string
  confidence: number
}

// ─── Template Types ──────────────────────────────────────────────────────────

export interface Template {
  id: string
  name: string
  subject: string
  html?: string
  text?: string
  variables?: string[]
  status?: string
  createdAt: string
}

export interface CreateTemplateOptions {
  name: string
  subject: string
  html?: string
  text?: string
  variables?: string[]
}

export interface UpdateTemplateOptions {
  name?: string
  subject?: string
  html?: string
  text?: string
  variables?: string[]
  status?: string
}

export interface RenderedTemplate {
  html: string
  text: string
  subject: string
}

// ─── Broadcast Types ─────────────────────────────────────────────────────────

export interface Broadcast {
  id: string
  name: string
  subject: string
  from: string
  replyTo?: string
  html?: string
  text?: string
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'
  audienceId?: string
  scheduledAt?: string
  sentAt?: string
  totalRecipients?: number
  sentCount?: number
  createdAt: string
}

export interface CreateBroadcastOptions {
  name: string
  subject: string
  from: string
  replyTo?: string
  html?: string
  text?: string
  audienceId?: string
  scheduledAt?: string
}

export interface UpdateBroadcastOptions {
  name?: string
  subject?: string
  from?: string
  html?: string
  text?: string
  audienceId?: string
  scheduledAt?: string | null
}

// ─── Webhook Types ───────────────────────────────────────────────────────────

export interface Webhook {
  id: string
  url: string
  events: string[]
  enabled: boolean
  secret?: string
  createdAt: string
}

export interface CreateWebhookOptions {
  url: string
  events: string[]
}

export interface UpdateWebhookOptions {
  url?: string
  events?: string[]
  enabled?: boolean
}

// ─── Inbound Email Types ─────────────────────────────────────────────────────

export interface InboundEmail {
  id: string
  from: string
  fromName?: string
  to: string
  cc?: string
  subject: string
  hasHtml?: boolean
  hasText?: boolean
  html?: string
  text?: string
  attachmentCount?: number
  attachments?: InboundAttachment[]
  receivedAt: string
}

export interface InboundAttachment {
  id: string
  filename: string
  contentType: string
  contentDisposition?: string
  contentId?: string
  size: number
  downloadUrl: string
  expiresAt?: string
}

export interface InboundReply {
  id: string
  fromEmail: string
  toEmails: string[]
  subject: string
  htmlContent?: string
  textContent?: string
  sentAt: string
  createdAt: string
  metadata?: Record<string, unknown>
}

// ─── Suppression Types ───────────────────────────────────────────────────────

export interface Suppression {
  id: string
  email: string
  reason: string
  sourceEmailId?: string
  metadata?: Record<string, unknown>
  createdAt: string
}

// ─── Event & Log Types ───────────────────────────────────────────────────────

export interface EmailEvent {
  id: string
  emailId: string
  eventType: string
  metadata?: Record<string, unknown>
  createdAt: string
}

export interface EmailLog {
  id: string
  fromEmail: string
  toEmails: string[]
  subject: string
  status: string
  createdAt: string
  sentAt?: string
  deliveredAt?: string
  scheduledFor?: string
  metadata?: Record<string, unknown>
}

// ─── Metrics Types ───────────────────────────────────────────────────────────

export interface Metrics {
  total: number
  sent: number
  delivered: number
  bounced: number
  failed: number
  queued: number
  scheduled: number
  opens: number
  uniqueOpens: number
  clicks: number
  uniqueClicks: number
}

export interface LinkMetrics {
  period: { days: number; start: string; end: string }
  links: Array<{ url: string; count: number }>
  totalClicks: number
}

// ─── Workspace Types ─────────────────────────────────────────────────────────

export interface Workspace {
  id: string
  name: string
  slug: string
  iconUrl?: string
  ownerId: string
  role: string
  createdAt: string
}

// ─── API Key Types ───────────────────────────────────────────────────────────

export interface ApiKeyInfo {
  id: string
  name: string
  key?: string
  keyPrefix: string
  createdAt: string
}

// ─── Common Types ────────────────────────────────────────────────────────────

export interface UnosendError {
  message: string
  code: number
  statusCode?: number
}

export interface Pagination {
  total?: number
  limit: number
  offset?: number
  cursor?: string
  hasMore: boolean
}

type ApiResponse<T> = { data: T | null; error: UnosendError | null }

// ─── Resource Classes ────────────────────────────────────────────────────────

class Emails {
  constructor(private client: Unosend) {}

  async send(options: SendEmailOptions): Promise<ApiResponse<Email>> {
    const payload: Record<string, unknown> = {
      from: options.from,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
    }

    if (options.html) payload.html = options.html
    if (options.text) payload.text = options.text
    if (options.replyTo) payload.reply_to = options.replyTo
    if (options.cc) payload.cc = Array.isArray(options.cc) ? options.cc : [options.cc]
    if (options.bcc) payload.bcc = Array.isArray(options.bcc) ? options.bcc : [options.bcc]
    if (options.headers) payload.headers = options.headers
    if (options.tags) payload.tags = options.tags
    if (options.priority) payload.priority = options.priority
    if (options.templateId) payload.template_id = options.templateId
    if (options.templateData) payload.template_data = options.templateData
    if (options.scheduledFor) payload.scheduled_for = options.scheduledFor
    if (options.attachments) {
      payload.attachments = options.attachments.map(att => ({
        filename: att.filename,
        content: typeof att.content === 'string' ? att.content : att.content.toString('base64'),
        content_type: att.contentType,
      }))
    }

    return this.client['_request']<Email>('POST', '/emails', payload)
  }

  async batch(emails: SendEmailOptions[]): Promise<ApiResponse<{
    data: Array<{ id: string; from: string; to: string[]; created_at: string } | { error: string; index: number }>
    success_count: number
    error_count: number
  }>> {
    if (emails.length === 0 || emails.length > 100) {
      return {
        data: null,
        error: { message: 'Batch must contain 1-100 emails', code: 400 }
      }
    }

    const payload = emails.map(options => {
      const email: Record<string, unknown> = {
        from: options.from,
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
      }

      if (options.html) email.html = options.html
      if (options.text) email.text = options.text
      if (options.replyTo) email.reply_to = options.replyTo
      if (options.cc) email.cc = Array.isArray(options.cc) ? options.cc : [options.cc]
      if (options.bcc) email.bcc = Array.isArray(options.bcc) ? options.bcc : [options.bcc]
      if (options.headers) email.headers = options.headers
      if (options.tags) email.tags = options.tags
      if (options.attachments) {
        email.attachments = options.attachments.map(att => ({
          filename: att.filename,
          content: typeof att.content === 'string' ? att.content : att.content.toString('base64'),
          content_type: att.contentType,
        }))
      }

      return email
    })

    return this.client['_request']('POST', '/emails/batch', payload)
  }

  async get(id: string): Promise<ApiResponse<Email>> {
    return this.client['_request']<Email>('GET', `/emails/${encodeURIComponent(id)}`)
  }

  async list(options?: { limit?: number; offset?: number }): Promise<ApiResponse<Email[]>> {
    const params = new URLSearchParams()
    if (options?.limit) params.set('limit', options.limit.toString())
    if (options?.offset) params.set('offset', options.offset.toString())
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']<Email[]>('GET', `/emails${query}`)
  }

  async cancel(id: string): Promise<ApiResponse<Email>> {
    return this.client['_request']<Email>('POST', `/emails/${encodeURIComponent(id)}/cancel`)
  }

  async resend(id: string): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client['_request']('POST', `/emails/${encodeURIComponent(id)}/resend`)
  }

  async clicks(id: string): Promise<ApiResponse<EmailClickData>> {
    return this.client['_request']<EmailClickData>('GET', `/emails/${encodeURIComponent(id)}/clicks`)
  }

  async export(options?: {
    status?: string
    startDate?: string
    endDate?: string
    format?: 'csv' | 'json'
  }): Promise<ApiResponse<unknown>> {
    const params = new URLSearchParams()
    if (options?.status) params.set('status', options.status)
    if (options?.startDate) params.set('start_date', options.startDate)
    if (options?.endDate) params.set('end_date', options.endDate)
    if (options?.format) params.set('format', options.format)
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']('GET', `/emails/export${query}`)
  }

  async status(options?: {
    since?: string
    ids?: string[]
    broadcastId?: string
    limit?: number
  }): Promise<ApiResponse<Array<Record<string, unknown>>>> {
    const params = new URLSearchParams()
    if (options?.since) params.set('since', options.since)
    if (options?.ids) params.set('ids', options.ids.join(','))
    if (options?.broadcastId) params.set('broadcast_id', options.broadcastId)
    if (options?.limit) params.set('limit', options.limit.toString())
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']('GET', `/emails/status${query}`)
  }
}

class Domains {
  constructor(private client: Unosend) {}

  async create(name: string): Promise<ApiResponse<Domain>> {
    return this.client['_request']<Domain>('POST', '/domains', { name })
  }

  async get(id: string): Promise<ApiResponse<Domain>> {
    return this.client['_request']<Domain>('GET', `/domains/${encodeURIComponent(id)}`)
  }

  async list(): Promise<ApiResponse<Domain[]>> {
    return this.client['_request']<Domain[]>('GET', '/domains')
  }

  async verify(id: string): Promise<ApiResponse<Domain>> {
    return this.client['_request']<Domain>('POST', `/domains/${encodeURIComponent(id)}/verify`)
  }

  async delete(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return this.client['_request']('DELETE', `/domains/${encodeURIComponent(id)}`)
  }

  async dnsStatus(id: string): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client['_request']('GET', `/domains/${encodeURIComponent(id)}/dns-status`)
  }
}

class Audiences {
  constructor(private client: Unosend) {}

  async create(name: string): Promise<ApiResponse<Audience>> {
    return this.client['_request']<Audience>('POST', '/audiences', { name })
  }

  async get(id: string): Promise<ApiResponse<Audience>> {
    return this.client['_request']<Audience>('GET', `/audiences/${encodeURIComponent(id)}`)
  }

  async list(): Promise<ApiResponse<Audience[]>> {
    return this.client['_request']<Audience[]>('GET', '/audiences')
  }

  async delete(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return this.client['_request']('DELETE', `/audiences/${encodeURIComponent(id)}`)
  }
}

class Contacts {
  constructor(private client: Unosend) {}

  async create(options: CreateContactOptions): Promise<ApiResponse<Contact>> {
    const payload: Record<string, unknown> = { email: options.email }
    if (options.firstName) payload.first_name = options.firstName
    if (options.lastName) payload.last_name = options.lastName
    if (options.audienceId) payload.audience_id = options.audienceId
    if (options.subscribed !== undefined) payload.subscribed = options.subscribed
    if (options.metadata) payload.metadata = options.metadata
    return this.client['_request']<Contact>('POST', '/contacts', payload)
  }

  async get(id: string): Promise<ApiResponse<Contact>> {
    return this.client['_request']<Contact>('GET', `/contacts/${encodeURIComponent(id)}`)
  }

  async list(audienceId: string): Promise<ApiResponse<Contact[]>> {
    return this.client['_request']<Contact[]>('GET', `/contacts?audienceId=${encodeURIComponent(audienceId)}`)
  }

  async update(id: string, data: UpdateContactOptions): Promise<ApiResponse<Contact>> {
    const payload: Record<string, unknown> = {}
    if (data.email) payload.email = data.email
    if (data.firstName) payload.first_name = data.firstName
    if (data.lastName) payload.last_name = data.lastName
    if (data.audienceId) payload.audience_id = data.audienceId
    if (data.subscribed !== undefined) payload.subscribed = data.subscribed
    if (data.metadata) payload.metadata = data.metadata
    return this.client['_request']<Contact>('PATCH', `/contacts/${encodeURIComponent(id)}`, payload)
  }

  async delete(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return this.client['_request']('DELETE', `/contacts/${encodeURIComponent(id)}`)
  }

  async bulk(options: BulkContactOptions): Promise<ApiResponse<{ affectedCount: number; invalidCount: number }>> {
    const payload: Record<string, unknown> = {
      contact_ids: options.contactIds,
      operation: options.operation,
    }
    if (options.audienceId) payload.audience_id = options.audienceId
    return this.client['_request']('POST', '/contacts/bulk', payload)
  }

  async validate(email: string): Promise<ApiResponse<ValidateEmailResult>> {
    return this.client['_request']<ValidateEmailResult>('GET', `/contacts/validate?email=${encodeURIComponent(email)}`)
  }

  async validateBatch(emails: string[]): Promise<ApiResponse<ValidateEmailResult[]>> {
    return this.client['_request']<ValidateEmailResult[]>('POST', '/contacts/validate', { emails })
  }

  async enrich(options: EnrichOptions): Promise<ApiResponse<EnrichResult | EnrichResult[]>> {
    const payload: Record<string, unknown> = {}
    if (options.email) payload.email = options.email
    if (options.name) payload.name = options.name
    if (options.emails) payload.emails = options.emails
    if (options.names) payload.names = options.names
    if (options.contactIds) payload.contactIds = options.contactIds
    if (options.audienceId) payload.audienceId = options.audienceId
    if (options.updateContacts !== undefined) payload.updateContacts = options.updateContacts
    return this.client['_request']('POST', '/contacts/enrich', payload)
  }

  async export(options?: {
    audienceId?: string
    format?: 'csv' | 'json'
  }): Promise<ApiResponse<unknown>> {
    const params = new URLSearchParams()
    if (options?.audienceId) params.set('audience_id', options.audienceId)
    if (options?.format) params.set('format', options.format)
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']('GET', `/contacts/export${query}`)
  }
}

class Templates {
  constructor(private client: Unosend) {}

  async create(options: CreateTemplateOptions): Promise<ApiResponse<Template>> {
    return this.client['_request']<Template>('POST', '/templates', { ...options } as Record<string, unknown>)
  }

  async get(id: string): Promise<ApiResponse<Template>> {
    return this.client['_request']<Template>('GET', `/templates/${encodeURIComponent(id)}`)
  }

  async update(id: string, data: UpdateTemplateOptions): Promise<ApiResponse<Template>> {
    return this.client['_request']<Template>('PATCH', `/templates/${encodeURIComponent(id)}`, data as Record<string, unknown>)
  }

  async render(id: string, data?: Record<string, string>): Promise<ApiResponse<RenderedTemplate>> {
    return this.client['_request']<RenderedTemplate>('POST', `/templates/${encodeURIComponent(id)}/render`, { data })
  }

  async duplicate(id: string, name?: string): Promise<ApiResponse<Template>> {
    return this.client['_request']<Template>('POST', `/templates/${encodeURIComponent(id)}/duplicate`, name ? { name } : {})
  }
}

class Broadcasts {
  constructor(private client: Unosend) {}

  async create(options: CreateBroadcastOptions): Promise<ApiResponse<Broadcast>> {
    const payload: Record<string, unknown> = {
      name: options.name,
      subject: options.subject,
      from: options.from,
    }
    if (options.replyTo) payload.reply_to = options.replyTo
    if (options.html) payload.html = options.html
    if (options.text) payload.text = options.text
    if (options.audienceId) payload.audience_id = options.audienceId
    if (options.scheduledAt) payload.scheduled_at = options.scheduledAt
    return this.client['_request']<Broadcast>('POST', '/broadcasts', payload)
  }

  async get(id: string): Promise<ApiResponse<Broadcast>> {
    return this.client['_request']<Broadcast>('GET', `/broadcasts/${encodeURIComponent(id)}`)
  }

  async update(id: string, data: UpdateBroadcastOptions): Promise<ApiResponse<Broadcast>> {
    const payload: Record<string, unknown> = {}
    if (data.name) payload.name = data.name
    if (data.subject) payload.subject = data.subject
    if (data.from) payload.from = data.from
    if (data.html) payload.html = data.html
    if (data.text) payload.text = data.text
    if (data.audienceId) payload.audience_id = data.audienceId
    if (data.scheduledAt !== undefined) payload.scheduled_at = data.scheduledAt
    return this.client['_request']<Broadcast>('PATCH', `/broadcasts/${encodeURIComponent(id)}`, payload)
  }

  async send(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.client['_request']('POST', `/broadcasts/${encodeURIComponent(id)}/send`)
  }
}

class Webhooks {
  constructor(private client: Unosend) {}

  async create(options: CreateWebhookOptions): Promise<ApiResponse<Webhook>> {
    return this.client['_request']<Webhook>('POST', '/webhooks', { ...options } as Record<string, unknown>)
  }

  async get(id: string): Promise<ApiResponse<Webhook>> {
    return this.client['_request']<Webhook>('GET', `/webhooks/${encodeURIComponent(id)}`)
  }

  async update(id: string, data: UpdateWebhookOptions): Promise<ApiResponse<Webhook>> {
    return this.client['_request']<Webhook>('PATCH', `/webhooks/${encodeURIComponent(id)}`, data as Record<string, unknown>)
  }
}

class InboundEmails {
  constructor(private client: Unosend) {}

  async list(options?: {
    limit?: number
    offset?: number
    status?: string
  }): Promise<ApiResponse<InboundEmail[]>> {
    const params = new URLSearchParams()
    if (options?.limit) params.set('limit', options.limit.toString())
    if (options?.offset) params.set('offset', options.offset.toString())
    if (options?.status) params.set('status', options.status)
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']<InboundEmail[]>('GET', `/inbound${query}`)
  }

  async get(id: string): Promise<ApiResponse<InboundEmail>> {
    return this.client['_request']<InboundEmail>('GET', `/inbound/${encodeURIComponent(id)}`)
  }

  async delete(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return this.client['_request']('DELETE', `/inbound/${encodeURIComponent(id)}`)
  }

  async reply(id: string, options: { html?: string; text?: string }): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client['_request']('POST', `/inbound/${encodeURIComponent(id)}/reply`, options)
  }

  async replies(id: string): Promise<ApiResponse<InboundReply[]>> {
    return this.client['_request']<InboundReply[]>('GET', `/inbound/${encodeURIComponent(id)}/replies`)
  }

  async attachments(id: string): Promise<ApiResponse<InboundAttachment[]>> {
    return this.client['_request']<InboundAttachment[]>('GET', `/inbound/${encodeURIComponent(id)}/attachments`)
  }
}

class Suppressions {
  constructor(private client: Unosend) {}

  async create(email: string, reason?: string): Promise<ApiResponse<Suppression>> {
    const payload: Record<string, unknown> = { email }
    if (reason) payload.reason = reason
    return this.client['_request']<Suppression>('POST', '/suppressions', payload)
  }

  async get(id: string): Promise<ApiResponse<Suppression>> {
    return this.client['_request']<Suppression>('GET', `/suppressions/${encodeURIComponent(id)}`)
  }

  async list(options?: {
    cursor?: string
    limit?: number
    reason?: string
  }): Promise<ApiResponse<Suppression[]> & { pagination?: Pagination }> {
    const params = new URLSearchParams()
    if (options?.cursor) params.set('cursor', options.cursor)
    if (options?.limit) params.set('limit', options.limit.toString())
    if (options?.reason) params.set('reason', options.reason)
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']('GET', `/suppressions${query}`)
  }

  async delete(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return this.client['_request']('DELETE', `/suppressions/${encodeURIComponent(id)}`)
  }
}

class Events {
  constructor(private client: Unosend) {}

  async list(options?: {
    emailId?: string
    eventType?: string
    days?: number
    limit?: number
    offset?: number
  }): Promise<ApiResponse<EmailEvent[]> & { pagination?: Pagination }> {
    const params = new URLSearchParams()
    if (options?.emailId) params.set('email_id', options.emailId)
    if (options?.eventType) params.set('event_type', options.eventType)
    if (options?.days) params.set('days', options.days.toString())
    if (options?.limit) params.set('limit', options.limit.toString())
    if (options?.offset) params.set('offset', options.offset.toString())
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']('GET', `/events${query}`)
  }
}

class Logs {
  constructor(private client: Unosend) {}

  async list(options?: {
    status?: string
    emailId?: string
    days?: number
    limit?: number
    offset?: number
    search?: string
  }): Promise<ApiResponse<EmailLog[]> & { pagination?: Pagination }> {
    const params = new URLSearchParams()
    if (options?.status) params.set('status', options.status)
    if (options?.emailId) params.set('email_id', options.emailId)
    if (options?.days) params.set('days', options.days.toString())
    if (options?.limit) params.set('limit', options.limit.toString())
    if (options?.offset) params.set('offset', options.offset.toString())
    if (options?.search) params.set('search', options.search)
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']('GET', `/logs${query}`)
  }
}

class MetricsApi {
  constructor(private client: Unosend) {}

  async get(options?: {
    days?: number
    groupBy?: string
  }): Promise<ApiResponse<Metrics>> {
    const params = new URLSearchParams()
    if (options?.days) params.set('days', options.days.toString())
    if (options?.groupBy) params.set('group_by', options.groupBy)
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']<Metrics>('GET', `/metrics${query}`)
  }

  async links(options?: {
    days?: number
    limit?: number
  }): Promise<ApiResponse<LinkMetrics>> {
    const params = new URLSearchParams()
    if (options?.days) params.set('days', options.days.toString())
    if (options?.limit) params.set('limit', options.limit.toString())
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']<LinkMetrics>('GET', `/metrics/links${query}`)
  }
}

class ApiKeys {
  constructor(private client: Unosend) {}

  async create(name: string): Promise<ApiResponse<ApiKeyInfo>> {
    return this.client['_request']<ApiKeyInfo>('POST', '/api-keys', { name })
  }

  async delete(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.client['_request']('DELETE', `/api-keys/${encodeURIComponent(id)}`)
  }
}

class Workspaces {
  constructor(private client: Unosend) {}

  async create(name: string, iconUrl?: string): Promise<ApiResponse<Workspace>> {
    const payload: Record<string, unknown> = { name }
    if (iconUrl) payload.icon_url = iconUrl
    return this.client['_request']<Workspace>('POST', '/workspaces', payload)
  }

  async get(id: string): Promise<ApiResponse<Workspace>> {
    return this.client['_request']<Workspace>('GET', `/workspaces/${encodeURIComponent(id)}`)
  }

  async list(): Promise<ApiResponse<Workspace[]>> {
    return this.client['_request']<Workspace[]>('GET', '/workspaces')
  }

  async update(id: string, data: { name?: string; iconUrl?: string }): Promise<ApiResponse<Workspace>> {
    const payload: Record<string, unknown> = {}
    if (data.name) payload.name = data.name
    if (data.iconUrl) payload.icon_url = data.iconUrl
    return this.client['_request']<Workspace>('PATCH', `/workspaces/${encodeURIComponent(id)}`, payload)
  }
}

class Usage {
  constructor(private client: Unosend) {}

  async get(period?: string): Promise<ApiResponse<Record<string, unknown>>> {
    const query = period ? `?period=${encodeURIComponent(period)}` : ''
    return this.client['_request']('GET', `/usage${query}`)
  }
}

class Billing {
  constructor(private client: Unosend) {}

  async get(): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client['_request']('GET', '/billing')
  }
}

// ─── Main Client ─────────────────────────────────────────────────────────────

const SDK_VERSION = '2.0.0'

export class Unosend {
  private apiKey: string
  private baseUrl: string

  public emails: Emails
  public domains: Domains
  public audiences: Audiences
  public contacts: Contacts
  public templates: Templates
  public broadcasts: Broadcasts
  public webhooks: Webhooks
  public inbound: InboundEmails
  public suppressions: Suppressions
  public events: Events
  public logs: Logs
  public metrics: MetricsApi
  public apiKeys: ApiKeys
  public workspaces: Workspaces
  public usage: Usage
  public billing: Billing

  constructor(apiKey: string, options?: { baseUrl?: string }) {
    if (!apiKey) {
      throw new Error('API key is required')
    }

    this.apiKey = apiKey
    this.baseUrl = options?.baseUrl || 'https://www.unosend.co/api/v1'

    this.emails = new Emails(this)
    this.domains = new Domains(this)
    this.audiences = new Audiences(this)
    this.contacts = new Contacts(this)
    this.templates = new Templates(this)
    this.broadcasts = new Broadcasts(this)
    this.webhooks = new Webhooks(this)
    this.inbound = new InboundEmails(this)
    this.suppressions = new Suppressions(this)
    this.events = new Events(this)
    this.logs = new Logs(this)
    this.metrics = new MetricsApi(this)
    this.apiKeys = new ApiKeys(this)
    this.workspaces = new Workspaces(this)
    this.usage = new Usage(this)
    this.billing = new Billing(this)
  }

  /** @internal */
  private async _request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    body?: Record<string, unknown> | Record<string, unknown>[]
  ): Promise<{ data: T | null; error: UnosendError | null }> {
    const url = `${this.baseUrl}${path}`

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': `unosend-node/${SDK_VERSION}`,
    }

    let retries = 0
    const maxRetries = 3

    while (true) {
      try {
        const response = await fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
        })

        // Retry on 429 with exponential backoff
        if (response.status === 429 && retries < maxRetries) {
          const retryAfter = response.headers.get('retry-after')
          const delay = retryAfter
            ? parseInt(retryAfter, 10) * 1000
            : Math.min(1000 * Math.pow(2, retries), 10000)
          await new Promise(resolve => setTimeout(resolve, delay))
          retries++
          continue
        }

        const json = await response.json() as Record<string, unknown>

        if (!response.ok) {
          const errorObj = json.error as { message?: string; code?: number } | undefined
          return {
            data: null,
            error: {
              message: errorObj?.message || (json.message as string) || 'Unknown error',
              code: errorObj?.code || response.status,
              statusCode: response.status,
            },
          }
        }

        // Handle both { data: ... } and direct response shapes
        const data = (json.data !== undefined ? json.data : json) as T
        return { data, error: null }
      } catch (err) {
        if (retries < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, retries), 10000)))
          retries++
          continue
        }

        return {
          data: null,
          error: {
            message: err instanceof Error ? err.message : 'Network error',
            code: 0,
          },
        }
      }
    }
  }
}

export default Unosend
