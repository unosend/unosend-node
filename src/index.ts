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
  tags?: Tag[]
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
  html_content?: string
  text_content?: string
  status: string
  created_at: string
  sent_at?: string
  delivered_at?: string
  opened_at?: string
  bounced_at?: string
}

export interface EmailClickData {
  email: Record<string, unknown>
  links: Array<{ url: string; count: number }>
  recentClicks: Array<Record<string, unknown>>
}

export interface BatchSendResult {
  data: Array<{ id: string }>
  errors?: Array<{ index: number; message: string }>
}

// ─── Domain Types ────────────────────────────────────────────────────────────

export interface Domain {
  id: string
  name: string
  status: string
  records?: DnsRecord[]
  created_at: string
}

export interface DnsRecord {
  type: string
  name: string
  value: string
  ttl?: number
}

// ─── Audience Types ──────────────────────────────────────────────────────────

export interface Audience {
  id: string
  name: string
  description?: string
  created_at: string
}

// ─── Contact Types ───────────────────────────────────────────────────────────

export interface Contact {
  id: string
  email: string
  first_name?: string
  last_name?: string
  subscribed: boolean
  status: string
  metadata?: Record<string, string>
  created_at: string
  updated_at: string
}

export interface CreateContactOptions {
  email: string
  audienceId: string
  firstName?: string
  lastName?: string
  subscribed?: boolean
  metadata?: Record<string, string>
}

export interface UpdateContactOptions {
  email?: string
  firstName?: string
  lastName?: string
  subscribed?: boolean
  metadata?: Record<string, string>
}

export interface BulkCreateContactsOptions {
  audienceId: string
  contacts: Array<{
    email: string
    firstName?: string
    lastName?: string
  }>
}

export interface ValidateEmailResponse {
  email: string
  valid: boolean
  reason?: string
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
  subject?: string
  html_content?: string
  text_content?: string
  type: string
  category: string
  status: string
  is_public: boolean
  thumbnail?: string
  created_at: string
  updated_at: string
}

export interface CreateTemplateOptions {
  name: string
  subject?: string
  htmlContent?: string
  textContent?: string
  type?: string
  category?: string
}

export interface UpdateTemplateOptions {
  name?: string
  subject?: string
  htmlContent?: string
  textContent?: string
  type?: string
  category?: string
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
  from_email: string
  from_name?: string
  reply_to?: string
  audience_id?: string
  html_content?: string
  text_content?: string
  preview_text?: string
  status: string
  total_recipients: number
  sent_count: number
  failed_count: number
  scheduled_at?: string
  sent_at?: string
  created_at: string
}

export interface CreateBroadcastOptions {
  name: string
  subject: string
  fromEmail: string
  fromName?: string
  audienceId: string
  htmlContent?: string
  textContent?: string
  previewText?: string
  replyTo?: string
  scheduledAt?: string
}

export interface UpdateBroadcastOptions {
  name?: string
  subject?: string
  fromEmail?: string
  fromName?: string
  audienceId?: string
  htmlContent?: string
  textContent?: string
  previewText?: string
  replyTo?: string
  scheduledAt?: string | null
  status?: string
}

// ─── Webhook Types ───────────────────────────────────────────────────────────

export interface Webhook {
  id: string
  url: string
  events: string[]
  enabled: boolean
  created_at: string
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
  from_name?: string
  to: string
  cc?: string
  subject: string
  has_html?: boolean
  has_text?: boolean
  html?: string
  text?: string
  attachment_count?: number
  attachments?: InboundAttachment[]
  received_at: string
}

export interface InboundAttachment {
  id: string
  filename: string
  content_type: string
  content_disposition?: string
  content_id?: string
  size: number
  download_url: string
  expires_at?: string
}

export interface InboundReply {
  id: string
  from_email: string
  to_emails: string[]
  subject: string
  html_content?: string
  text_content?: string
  sent_at: string
  created_at: string
}

// ─── Suppression Types ───────────────────────────────────────────────────────

export interface Suppression {
  id: string
  email: string
  reason: string
  source_email_id?: string
  metadata?: Record<string, unknown>
  created_at: string
}

// ─── Event & Log Types ───────────────────────────────────────────────────────

export interface EmailEvent {
  id: string
  email_id: string
  event_type: string
  metadata?: Record<string, unknown>
  created_at: string
}

export interface EmailLog {
  id: string
  from_email: string
  to_emails: string[]
  subject: string
  status: string
  created_at: string
  sent_at?: string
  delivered_at?: string
}

// ─── Metrics Types ───────────────────────────────────────────────────────────

export interface Metrics {
  total: number
  sent: number
  delivered: number
  bounced: number
  failed: number
  queued: number
  opens: number
  unique_opens: number
  clicks: number
  unique_clicks: number
}

export interface LinkMetrics {
  period: { days: number; start: string; end: string }
  links: Array<{ url: string; count: number }>
  total_clicks: number
}

// ─── Workspace Types ─────────────────────────────────────────────────────────

export interface Workspace {
  id: string
  name: string
  slug: string
  icon_url?: string
  owner_id: string
  role: string
  created_at: string
}

// ─── API Key Types ───────────────────────────────────────────────────────────

export interface ApiKeyInfo {
  id: string
  name: string
  key?: string
  key_prefix: string
  created_at: string
}

// ─── Wallet & Subscription Types ─────────────────────────────────────────────

export interface WalletInfo {
  balance: number
  auto_recharge: boolean
  auto_recharge_amount?: number
  auto_recharge_threshold?: number
}

export interface WalletTransaction {
  id: string
  type: string
  amount: number
  balance_before: number
  balance_after: number
  description: string
  reference_id?: string
  created_at: string
}

export interface SubscriptionInfo {
  tier_id: string
  status: string
  email_limit: number
  current_period_start?: string
  current_period_end?: string
}

// ─── Common Types ────────────────────────────────────────────────────────────

export interface PaginationMeta {
  total: number
  page: number
  page_size: number
  pages: number
}

export interface UnosendError {
  message: string
  code: number
  statusCode?: number
}

type ApiResponse<T> = { data: T | null; error: UnosendError | null }

type PaginatedResponse<T> = ApiResponse<T> & { meta?: PaginationMeta }

// ─── Resource Classes ────────────────────────────────────────────────────────

class Emails {
  constructor(private client: Unosend) {}

  async send(options: SendEmailOptions): Promise<ApiResponse<{ id: string }>> {
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

    return this.client['_request']('POST', '/emails', payload)
  }

  async batch(emails: SendEmailOptions[]): Promise<ApiResponse<BatchSendResult>> {
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

      return email
    })

    return this.client['_request']('POST', '/emails/batch', { emails: payload })
  }

  async get(id: string): Promise<ApiResponse<Email>> {
    return this.client['_request']<Email>('GET', `/emails/${encodeURIComponent(id)}`)
  }

  async list(options?: { page?: number; perPage?: number; status?: string }): Promise<PaginatedResponse<Email[]>> {
    const params = new URLSearchParams()
    if (options?.page) params.set('page', options.page.toString())
    if (options?.perPage) params.set('per_page', options.perPage.toString())
    if (options?.status) params.set('status', options.status)
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

  async create(name: string, description?: string): Promise<ApiResponse<Audience>> {
    const payload: Record<string, unknown> = { name }
    if (description) payload.description = description
    return this.client['_request']<Audience>('POST', '/audiences', payload)
  }

  async get(id: string): Promise<ApiResponse<Audience>> {
    return this.client['_request']<Audience>('GET', `/audiences/${encodeURIComponent(id)}`)
  }

  async list(): Promise<ApiResponse<Audience[]>> {
    return this.client['_request']<Audience[]>('GET', '/audiences')
  }

  async update(id: string, data: { name?: string; description?: string }): Promise<ApiResponse<Audience>> {
    return this.client['_request']<Audience>('PATCH', `/audiences/${encodeURIComponent(id)}`, data)
  }

  async delete(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return this.client['_request']('DELETE', `/audiences/${encodeURIComponent(id)}`)
  }
}

class Contacts {
  constructor(private client: Unosend) {}

  async create(options: CreateContactOptions): Promise<ApiResponse<Contact>> {
    const payload: Record<string, unknown> = {
      email: options.email,
      audience_id: options.audienceId,
    }
    if (options.firstName) payload.first_name = options.firstName
    if (options.lastName) payload.last_name = options.lastName
    if (options.subscribed !== undefined) payload.subscribed = options.subscribed
    if (options.metadata) payload.metadata = options.metadata
    return this.client['_request']<Contact>('POST', '/contacts', payload)
  }

  async get(id: string): Promise<ApiResponse<Contact>> {
    return this.client['_request']<Contact>('GET', `/contacts/${encodeURIComponent(id)}`)
  }

  async list(options?: { page?: number; perPage?: number }): Promise<PaginatedResponse<Contact[]>> {
    const params = new URLSearchParams()
    if (options?.page) params.set('page', options.page.toString())
    if (options?.perPage) params.set('per_page', options.perPage.toString())
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']<Contact[]>('GET', `/contacts${query}`)
  }

  async update(id: string, data: UpdateContactOptions): Promise<ApiResponse<Contact>> {
    const payload: Record<string, unknown> = {}
    if (data.email) payload.email = data.email
    if (data.firstName) payload.first_name = data.firstName
    if (data.lastName) payload.last_name = data.lastName
    if (data.subscribed !== undefined) payload.subscribed = data.subscribed
    if (data.metadata) payload.metadata = data.metadata
    return this.client['_request']<Contact>('PATCH', `/contacts/${encodeURIComponent(id)}`, payload)
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.client['_request']('DELETE', `/contacts/${encodeURIComponent(id)}`)
  }

  async bulkCreate(options: BulkCreateContactsOptions): Promise<ApiResponse<Record<string, unknown>>> {
    const payload = {
      audience_id: options.audienceId,
      contacts: options.contacts.map(c => {
        const entry: Record<string, unknown> = { email: c.email }
        if (c.firstName) entry.first_name = c.firstName
        if (c.lastName) entry.last_name = c.lastName
        return entry
      }),
    }
    return this.client['_request']('POST', '/contacts/bulk', payload)
  }

  async validate(email: string): Promise<ApiResponse<ValidateEmailResponse>> {
    return this.client['_request']<ValidateEmailResponse>('POST', '/contacts/validate', { email })
  }

  async enrich(options: EnrichOptions): Promise<ApiResponse<EnrichResult | EnrichResult[]>> {
    const payload: Record<string, unknown> = {}
    if (options.email) payload.email = options.email
    if (options.name) payload.name = options.name
    if (options.emails) payload.emails = options.emails
    if (options.names) payload.names = options.names
    if (options.contactIds) payload.contact_ids = options.contactIds
    if (options.audienceId) payload.audience_id = options.audienceId
    if (options.updateContacts !== undefined) payload.update_contacts = options.updateContacts
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

  async import(options: {
    audienceId: string
    file: string
    format?: string
  }): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client['_request']('POST', '/contacts/import', {
      audience_id: options.audienceId,
      file: options.file,
      format: options.format || 'csv',
    })
  }
}

class Templates {
  constructor(private client: Unosend) {}

  async create(options: CreateTemplateOptions): Promise<ApiResponse<Template>> {
    const payload: Record<string, unknown> = { name: options.name }
    if (options.subject) payload.subject = options.subject
    if (options.htmlContent) payload.html_content = options.htmlContent
    if (options.textContent) payload.text_content = options.textContent
    if (options.type) payload.type = options.type
    if (options.category) payload.category = options.category
    return this.client['_request']<Template>('POST', '/templates', payload)
  }

  async get(id: string): Promise<ApiResponse<Template>> {
    return this.client['_request']<Template>('GET', `/templates/${encodeURIComponent(id)}`)
  }

  async list(): Promise<ApiResponse<Template[]>> {
    return this.client['_request']<Template[]>('GET', '/templates')
  }

  async update(id: string, data: UpdateTemplateOptions): Promise<ApiResponse<Template>> {
    const payload: Record<string, unknown> = {}
    if (data.name !== undefined) payload.name = data.name
    if (data.subject !== undefined) payload.subject = data.subject
    if (data.htmlContent !== undefined) payload.html_content = data.htmlContent
    if (data.textContent !== undefined) payload.text_content = data.textContent
    if (data.type !== undefined) payload.type = data.type
    if (data.category !== undefined) payload.category = data.category
    return this.client['_request']<Template>('PATCH', `/templates/${encodeURIComponent(id)}`, payload)
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.client['_request']('DELETE', `/templates/${encodeURIComponent(id)}`)
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
      from_email: options.fromEmail,
      audience_id: options.audienceId,
    }
    if (options.fromName) payload.from_name = options.fromName
    if (options.replyTo) payload.reply_to = options.replyTo
    if (options.htmlContent) payload.html_content = options.htmlContent
    if (options.textContent) payload.text_content = options.textContent
    if (options.previewText) payload.preview_text = options.previewText
    if (options.scheduledAt) payload.scheduled_at = options.scheduledAt
    return this.client['_request']<Broadcast>('POST', '/broadcasts', payload)
  }

  async get(id: string): Promise<ApiResponse<Broadcast>> {
    return this.client['_request']<Broadcast>('GET', `/broadcasts/${encodeURIComponent(id)}`)
  }

  async list(): Promise<ApiResponse<Broadcast[]>> {
    return this.client['_request']<Broadcast[]>('GET', '/broadcasts')
  }

  async update(id: string, data: UpdateBroadcastOptions): Promise<ApiResponse<Broadcast>> {
    const payload: Record<string, unknown> = {}
    if (data.name !== undefined) payload.name = data.name
    if (data.subject !== undefined) payload.subject = data.subject
    if (data.fromEmail !== undefined) payload.from_email = data.fromEmail
    if (data.fromName !== undefined) payload.from_name = data.fromName
    if (data.replyTo !== undefined) payload.reply_to = data.replyTo
    if (data.audienceId !== undefined) payload.audience_id = data.audienceId
    if (data.htmlContent !== undefined) payload.html_content = data.htmlContent
    if (data.textContent !== undefined) payload.text_content = data.textContent
    if (data.previewText !== undefined) payload.preview_text = data.previewText
    if (data.scheduledAt !== undefined) payload.scheduled_at = data.scheduledAt
    if (data.status !== undefined) payload.status = data.status
    return this.client['_request']<Broadcast>('PATCH', `/broadcasts/${encodeURIComponent(id)}`, payload)
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.client['_request']('DELETE', `/broadcasts/${encodeURIComponent(id)}`)
  }

  async send(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.client['_request']('POST', `/broadcasts/${encodeURIComponent(id)}/send`)
  }
}

class Webhooks {
  constructor(private client: Unosend) {}

  async create(options: CreateWebhookOptions): Promise<ApiResponse<Webhook>> {
    return this.client['_request']<Webhook>('POST', '/webhooks', { ...options })
  }

  async get(id: string): Promise<ApiResponse<Webhook>> {
    return this.client['_request']<Webhook>('GET', `/webhooks/${encodeURIComponent(id)}`)
  }

  async list(): Promise<ApiResponse<Webhook[]>> {
    return this.client['_request']<Webhook[]>('GET', '/webhooks')
  }

  async update(id: string, data: UpdateWebhookOptions): Promise<ApiResponse<Webhook>> {
    return this.client['_request']<Webhook>('PATCH', `/webhooks/${encodeURIComponent(id)}`, { ...data })
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.client['_request']('DELETE', `/webhooks/${encodeURIComponent(id)}`)
  }
}

class InboundEmails {
  constructor(private client: Unosend) {}

  async list(options?: {
    page?: number
    pageSize?: number
    status?: string
  }): Promise<PaginatedResponse<InboundEmail[]>> {
    const params = new URLSearchParams()
    if (options?.page) params.set('page', options.page.toString())
    if (options?.pageSize) params.set('page_size', options.pageSize.toString())
    if (options?.status) params.set('status', options.status)
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']<InboundEmail[]>('GET', `/inbound${query}`)
  }

  async get(id: string): Promise<ApiResponse<InboundEmail>> {
    return this.client['_request']<InboundEmail>('GET', `/inbound/${encodeURIComponent(id)}`)
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
    page?: number
    perPage?: number
    reason?: string
  }): Promise<PaginatedResponse<Suppression[]>> {
    const params = new URLSearchParams()
    if (options?.page) params.set('page', options.page.toString())
    if (options?.perPage) params.set('per_page', options.perPage.toString())
    if (options?.reason) params.set('reason', options.reason)
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']('GET', `/suppressions${query}`)
  }

  async delete(id: string): Promise<ApiResponse<void>> {
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
  }): Promise<ApiResponse<EmailEvent[]>> {
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
  }): Promise<ApiResponse<EmailLog[]>> {
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

  async list(): Promise<ApiResponse<ApiKeyInfo[]>> {
    return this.client['_request']<ApiKeyInfo[]>('GET', '/api-keys')
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

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.client['_request']('DELETE', `/workspaces/${encodeURIComponent(id)}`)
  }
}

class Wallet {
  constructor(private client: Unosend) {}

  async get(): Promise<ApiResponse<WalletInfo>> {
    return this.client['_request']<WalletInfo>('GET', '/wallet')
  }

  async addFunds(amount: number): Promise<ApiResponse<Record<string, unknown>>> {
    return this.client['_request']('POST', '/wallet/add-funds', { amount })
  }

  async transactions(): Promise<ApiResponse<WalletTransaction[]>> {
    return this.client['_request']<WalletTransaction[]>('GET', '/wallet/transactions')
  }
}

class Subscription {
  constructor(private client: Unosend) {}

  async get(): Promise<ApiResponse<SubscriptionInfo>> {
    return this.client['_request']<SubscriptionInfo>('GET', '/subscription')
  }
}

class Usage {
  constructor(private client: Unosend) {}

  async get(period?: string): Promise<ApiResponse<Record<string, unknown>>> {
    const query = period ? `?period=${encodeURIComponent(period)}` : ''
    return this.client['_request']('GET', `/usage${query}`)
  }
}

// ─── Main Client ─────────────────────────────────────────────────────────────

const SDK_VERSION = '2.1.0'

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
  public wallet: Wallet
  public subscription: Subscription
  public usage: Usage

  constructor(apiKey: string, options?: { baseUrl?: string }) {
    if (!apiKey) {
      throw new Error('API key is required')
    }

    this.apiKey = apiKey
    this.baseUrl = options?.baseUrl || 'https://api.unosend.co/v1'

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
    this.wallet = new Wallet(this)
    this.subscription = new Subscription(this)
    this.usage = new Usage(this)
  }

  /** @internal */
  private async _request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    body?: Record<string, unknown> | Record<string, unknown>[]
  ): Promise<{ data: T | null; error: UnosendError | null; meta?: PaginationMeta }> {
    const url = `${this.baseUrl}${path}`

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${this.apiKey}`,
      'User-Agent': `unosend-node/${SDK_VERSION}`,
    }

    if (body) {
      headers['Content-Type'] = 'application/json'
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

        // 204 No Content
        if (response.status === 204) {
          return { data: null as T, error: null }
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

        // Extract data and optional pagination meta
        const data = (json.data !== undefined ? json.data : json) as T
        const meta = json.meta as PaginationMeta | undefined
        return { data, error: null, meta }
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
