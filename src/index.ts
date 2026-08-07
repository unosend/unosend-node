// Unosend Node.js SDK
// Official SDK for the Unosend Email API

// ─── Configuration ───────────────────────────────────────────────────────────

export interface UnosendConfig {
  apiKey: string
  baseUrl?: string
  /**
   * Optional `AbortSignal` for all requests (e.g. cancellation). If set, `timeout` is ignored.
   */
  signal?: AbortSignal
  /**
   * Per-request timeout in milliseconds. Uses `AbortSignal.timeout` when supported.
   * Ignored when `signal` is provided.
   */
  timeout?: number
}

// ─── Email Types ─────────────────────────────────────────────────────────────

export interface SendEmailOptions {
  from: string
  to: string | string[]
  subject: string
  html?: string
  text?: string
  templateId?: string
  templateData?: Record<string, string>
  cc?: string | string[]
  bcc?: string | string[]
  replyTo?: string
  priority?: 'high' | 'normal' | 'low'
  attachments?: Attachment[]
  headers?: Record<string, string>
  tags?: Tag[]
  scheduledFor?: string
  tracking?: TrackingOptions
}

export interface Attachment {
  filename: string
  content: string
  content_type: string
}

export interface Tag {
  name: string
  value: string
}

export interface TrackingOptions {
  open?: boolean
  click?: boolean
}

export interface Email {
  id: string
  from: string
  to: string[]
  subject: string
  html?: string
  status: string
  created_at: string
  delivered_at?: string
}

export interface BatchSendResult {
  data: Array<{ id: string }>
}

// ─── Domain Types ────────────────────────────────────────────────────────────

export interface Domain {
  id: string
  domain: string
  status: string
  dns_records?: DnsRecord[]
  created_at: string
  verified_at?: string
}

export interface DnsRecord {
  type: string
  name: string
  value: string
  purpose?: string
  verified?: boolean
}

// ─── Audience Types ──────────────────────────────────────────────────────────

export interface Audience {
  id: string
  name: string
  contact_count?: number
  created_at: string
}

// ─── Contact Types ───────────────────────────────────────────────────────────

export interface Contact {
  id: string
  email: string
  first_name?: string
  last_name?: string
  subscribed: boolean
  created_at: string
}

export interface CreateContactOptions {
  email: string
  audienceId: string
  firstName?: string
  lastName?: string
  unsubscribed?: boolean
}

export interface UpdateContactOptions {
  firstName?: string
  lastName?: string
  unsubscribed?: boolean
}

export interface ValidateEmailOptions {
  email: string
  checkSmtp?: boolean
  checkCatchAll?: boolean
}

export interface ValidateEmailResponse {
  email: string
  valid: boolean
  score?: number
  reason?: string
  checks?: {
    syntax: boolean
    mx_records: boolean
    disposable: boolean
    role_based: boolean
    free_provider: boolean
    catch_all: boolean
    smtp_valid: boolean | null
  }
  details?: {
    local_part: string
    domain: string
    mx_hosts: string[]
    suggestion: string | null
  }
}

// ─── Template Types ──────────────────────────────────────────────────────────

export interface Template {
  id: string
  name: string
  subject?: string
  html?: string
  text?: string
  created_at: string
}

export interface CreateTemplateOptions {
  name: string
  subject: string
  html?: string
  text?: string
}

export interface UpdateTemplateOptions {
  name?: string
  subject?: string
  html?: string
  text?: string
}

// ─── Broadcast Types ─────────────────────────────────────────────────────────

export interface Broadcast {
  id: string
  name: string
  subject: string
  from_email: string
  from_name?: string
  audience_id: string
  html_content?: string
  text_content?: string
  status: string
  scheduled_at?: string
  created_at: string
}

export interface CreateBroadcastOptions {
  name: string
  subject: string
  fromEmail: string
  fromName?: string
  audienceId: string
  htmlContent: string
  textContent?: string
  scheduledAt?: string
}

// ─── Webhook Types ───────────────────────────────────────────────────────────

export interface Webhook {
  id: string
  url: string
  events: string[]
  signing_secret?: string
  created_at: string
}

export interface CreateWebhookOptions {
  url: string
  events: string[]
}

export interface UpdateWebhookOptions {
  url?: string
  events?: string[]
}

// ─── Inbound Email Types ─────────────────────────────────────────────────────

export interface InboundEmail {
  id: string
  from: string
  to: string[]
  subject: string
  html?: string
  text?: string
  attachments?: InboundAttachment[]
  received_at: string
}

export interface InboundAttachment {
  id: string
  filename: string
  content_type: string
  size: number
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

// ─── API Key Types ───────────────────────────────────────────────────────────

export interface ApiKeyInfo {
  id: string
  name: string
  key?: string
  created_at: string
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildEmailPayload(options: SendEmailOptions): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    from: options.from,
    to: Array.isArray(options.to) ? options.to : [options.to],
    subject: options.subject,
  }

  if (options.html) payload.html = options.html
  if (options.text) payload.text = options.text
  if (options.templateId) payload.template_id = options.templateId
  if (options.templateData) payload.template_data = options.templateData
  if (options.replyTo) payload.reply_to = options.replyTo
  if (options.cc) payload.cc = Array.isArray(options.cc) ? options.cc : [options.cc]
  if (options.bcc) payload.bcc = Array.isArray(options.bcc) ? options.bcc : [options.bcc]
  if (options.priority) payload.priority = options.priority
  if (options.attachments) payload.attachments = options.attachments
  if (options.headers) payload.headers = options.headers
  if (options.tags) payload.tags = options.tags
  if (options.scheduledFor) payload.scheduled_for = options.scheduledFor
  if (options.tracking) payload.tracking = options.tracking

  return payload
}

// ─── Resource Classes ────────────────────────────────────────────────────────

class Emails {
  constructor(private client: Unosend) {}

  async send(options: SendEmailOptions): Promise<ApiResponse<{ id: string }>> {
    return this.client['_request']('POST', '/emails', buildEmailPayload(options))
  }

  async batch(emails: SendEmailOptions[]): Promise<ApiResponse<BatchSendResult>> {
    if (emails.length === 0 || emails.length > 100) {
      return {
        data: null,
        error: { message: 'Batch must contain 1-100 emails', code: 400 }
      }
    }

    return this.client['_request']('POST', '/emails/batch', {
      emails: emails.map(buildEmailPayload)
    })
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

  async delete(id: string): Promise<ApiResponse<{ id: string }>> {
    return this.client['_request']('DELETE', `/domains/${encodeURIComponent(id)}`)
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

  async delete(id: string): Promise<ApiResponse<{ id: string }>> {
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
    if (options.unsubscribed !== undefined) payload.unsubscribed = options.unsubscribed
    return this.client['_request']<Contact>('POST', '/contacts', payload)
  }

  async get(id: string): Promise<ApiResponse<Contact>> {
    return this.client['_request']<Contact>('GET', `/contacts/${encodeURIComponent(id)}`)
  }

  async list(options?: { audienceId?: string; page?: number; perPage?: number }): Promise<PaginatedResponse<Contact[]>> {
    const params = new URLSearchParams()
    if (options?.audienceId) params.set('audience_id', options.audienceId)
    if (options?.page) params.set('page', options.page.toString())
    if (options?.perPage) params.set('per_page', options.perPage.toString())
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']<Contact[]>('GET', `/contacts${query}`)
  }

  async update(id: string, data: UpdateContactOptions): Promise<ApiResponse<Contact>> {
    const payload: Record<string, unknown> = {}
    if (data.firstName) payload.first_name = data.firstName
    if (data.lastName) payload.last_name = data.lastName
    if (data.unsubscribed !== undefined) payload.unsubscribed = data.unsubscribed
    return this.client['_request']<Contact>('PATCH', `/contacts/${encodeURIComponent(id)}`, payload)
  }

  async delete(id: string): Promise<ApiResponse<{ id: string }>> {
    return this.client['_request']('DELETE', `/contacts/${encodeURIComponent(id)}`)
  }

  async validate(options: string | ValidateEmailOptions): Promise<ApiResponse<ValidateEmailResponse>> {
    const payload: Record<string, unknown> = typeof options === 'string'
      ? { email: options }
      : {
          email: options.email,
          ...(options.checkSmtp !== undefined && { check_smtp: options.checkSmtp }),
          ...(options.checkCatchAll !== undefined && { check_catch_all: options.checkCatchAll }),
        }
    return this.client['_request']<ValidateEmailResponse>('POST', '/contacts/validate', payload)
  }
}

class Templates {
  constructor(private client: Unosend) {}

  async create(options: CreateTemplateOptions): Promise<ApiResponse<Template>> {
    return this.client['_request']<Template>('POST', '/templates', { ...options })
  }

  async get(id: string): Promise<ApiResponse<Template>> {
    return this.client['_request']<Template>('GET', `/templates/${encodeURIComponent(id)}`)
  }

  async list(): Promise<ApiResponse<Template[]>> {
    return this.client['_request']<Template[]>('GET', '/templates')
  }

  async update(id: string, data: UpdateTemplateOptions): Promise<ApiResponse<Template>> {
    return this.client['_request']<Template>('PATCH', `/templates/${encodeURIComponent(id)}`, { ...data })
  }

  async delete(id: string): Promise<ApiResponse<{ id: string }>> {
    return this.client['_request']('DELETE', `/templates/${encodeURIComponent(id)}`)
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
      html_content: options.htmlContent,
    }
    if (options.fromName) payload.from_name = options.fromName
    if (options.textContent) payload.text_content = options.textContent
    if (options.scheduledAt) payload.scheduled_at = options.scheduledAt
    return this.client['_request']<Broadcast>('POST', '/broadcasts', payload)
  }

  async get(id: string): Promise<ApiResponse<Broadcast>> {
    return this.client['_request']<Broadcast>('GET', `/broadcasts/${encodeURIComponent(id)}`)
  }

  async list(options?: { status?: string; limit?: number; offset?: number }): Promise<ApiResponse<Broadcast[]>> {
    const params = new URLSearchParams()
    if (options?.status) params.set('status', options.status)
    if (options?.limit) params.set('limit', options.limit.toString())
    if (options?.offset) params.set('offset', options.offset.toString())
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']<Broadcast[]>('GET', `/broadcasts${query}`)
  }

  async delete(id: string): Promise<ApiResponse<{ id: string }>> {
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

  async delete(id: string): Promise<ApiResponse<{ id: string }>> {
    return this.client['_request']('DELETE', `/webhooks/${encodeURIComponent(id)}`)
  }
}

class InboundEmails {
  constructor(private client: Unosend) {}

  async list(options?: {
    page?: number
    perPage?: number
    to?: string
  }): Promise<PaginatedResponse<InboundEmail[]>> {
    const params = new URLSearchParams()
    if (options?.page) params.set('page', options.page.toString())
    if (options?.perPage) params.set('per_page', options.perPage.toString())
    if (options?.to) params.set('to', options.to)
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client['_request']<InboundEmail[]>('GET', `/inbound${query}`)
  }

  async get(id: string): Promise<ApiResponse<InboundEmail>> {
    return this.client['_request']<InboundEmail>('GET', `/inbound/${encodeURIComponent(id)}`)
  }

  async listAttachments(emailId: string): Promise<ApiResponse<InboundAttachment[]>> {
    return this.client['_request']<InboundAttachment[]>('GET', `/inbound/${encodeURIComponent(emailId)}/attachments`)
  }

  async getAttachment(emailId: string, attachmentId: string): Promise<Response> {
    return this.client['_requestRaw']('GET', `/inbound/${encodeURIComponent(emailId)}/attachments/${encodeURIComponent(attachmentId)}`)
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

  async delete(id: string): Promise<ApiResponse<{ id: string }>> {
    return this.client['_request']('DELETE', `/suppressions/${encodeURIComponent(id)}`)
  }

  async deleteByEmail(email: string): Promise<ApiResponse<{ id: string }>> {
    let page = 1
    const perPage = 100
    while (true) {
      const { data: list, error: listErr } = await this.list({ perPage, page })
      if (listErr) return { data: null, error: listErr }
      const match = list?.find(s => s.email === email)
      if (match) return this.delete(match.id)
      if (!list || list.length < perPage) break
      page++
    }
    return { data: null, error: { message: `No suppression found for ${email}`, code: 404 } }
  }
}

class ApiKeys {
  constructor(private client: Unosend) {}

  async create(name: string, permission?: 'full_access' | 'sending_access' | 'read_only'): Promise<ApiResponse<ApiKeyInfo>> {
    const payload: Record<string, unknown> = { name }
    if (permission) payload.permission = permission
    return this.client['_request']<ApiKeyInfo>('POST', '/api-keys', payload)
  }

  async list(): Promise<ApiResponse<ApiKeyInfo[]>> {
    return this.client['_request']<ApiKeyInfo[]>('GET', '/api-keys')
  }

  async delete(id: string): Promise<ApiResponse<{ id: string }>> {
    return this.client['_request']('DELETE', `/api-keys/${encodeURIComponent(id)}`)
  }
}

// ─── Main Client ─────────────────────────────────────────────────────────────

const SDK_VERSION = '3.0.0'

export class Unosend {
  private apiKey: string
  private baseUrl: string
  private requestSignal?: AbortSignal
  private requestTimeoutMs?: number

  public emails: Emails
  public domains: Domains
  public audiences: Audiences
  public contacts: Contacts
  public templates: Templates
  public broadcasts: Broadcasts
  public webhooks: Webhooks
  public inbound: InboundEmails
  public suppressions: Suppressions
  public apiKeys: ApiKeys

  constructor(config: UnosendConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required')
    }

    this.apiKey = config.apiKey
    this.baseUrl = config.baseUrl || 'https://api.unosend.co'
    if (config.signal) {
      this.requestSignal = config.signal
    } else if (config.timeout !== undefined && config.timeout > 0) {
      this.requestTimeoutMs = config.timeout
    }

    this.emails = new Emails(this)
    this.domains = new Domains(this)
    this.audiences = new Audiences(this)
    this.contacts = new Contacts(this)
    this.templates = new Templates(this)
    this.broadcasts = new Broadcasts(this)
    this.webhooks = new Webhooks(this)
    this.inbound = new InboundEmails(this)
    this.suppressions = new Suppressions(this)
    this.apiKeys = new ApiKeys(this)
  }

  /** @internal */
  private _fetchInit(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    body?: Record<string, unknown> | Record<string, unknown>[]
  ): RequestInit {
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${this.apiKey}`,
      'User-Agent': `unosend-node/${SDK_VERSION}`,
      'Accept': 'application/json',
    }

    if (body) {
      headers['Content-Type'] = 'application/json'
    }

    let signal: AbortSignal | undefined
    if (this.requestSignal) {
      signal = this.requestSignal
    } else if (this.requestTimeoutMs !== undefined && typeof AbortSignal !== 'undefined' && 'timeout' in AbortSignal) {
      signal = AbortSignal.timeout(this.requestTimeoutMs)
    }

    return {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal,
    }
  }

  /** @internal */
  private async _request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    body?: Record<string, unknown> | Record<string, unknown>[]
  ): Promise<{ data: T | null; error: UnosendError | null; meta?: PaginationMeta }> {
    const url = `${this.baseUrl}${path}`

    let retries = 0
    const maxRetries = 3

    while (true) {
      try {
        const response = await fetch(url, this._fetchInit(method, body))

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

        const rawText = await response.text()
        let json: Record<string, unknown>
        try {
          json = rawText ? (JSON.parse(rawText) as Record<string, unknown>) : {}
        } catch {
          return {
            data: null,
            error: {
              message: 'Response was not valid JSON',
              code: 0,
              statusCode: response.status,
            },
          }
        }

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
        const isAbort = err instanceof Error && err.name === 'AbortError'
        if (isAbort || retries >= maxRetries) {
          return {
            data: null,
            error: {
              message: err instanceof Error ? err.message : 'Network error',
              code: 0,
            },
          }
        }
        await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, retries), 10000)))
        retries++
      }
    }
  }

  /** @internal */
  private async _requestRaw(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
  ): Promise<Response> {
    const url = `${this.baseUrl}${path}`
    return fetch(url, this._fetchInit(method))
  }
}

export default Unosend
