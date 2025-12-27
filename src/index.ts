// Unosend Node.js SDK
// Official SDK for the Unosend Email API

export interface UnosendConfig {
  apiKey: string
  baseUrl?: string
}

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
}

export interface EmailResponse {
  data: Email | null
  error: UnosendError | null
}

export interface EmailListResponse {
  data: Email[] | null
  error: UnosendError | null
}

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

export interface DomainResponse {
  data: Domain | null
  error: UnosendError | null
}

export interface DomainListResponse {
  data: Domain[] | null
  error: UnosendError | null
}

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
  unsubscribed: boolean
  createdAt: string
}

export interface AudienceResponse {
  data: Audience | null
  error: UnosendError | null
}

export interface AudienceListResponse {
  data: Audience[] | null
  error: UnosendError | null
}

export interface ContactResponse {
  data: Contact | null
  error: UnosendError | null
}

export interface ContactListResponse {
  data: Contact[] | null
  error: UnosendError | null
}

export interface UnosendError {
  message: string
  code: number
  statusCode?: number
}

export interface ApiKeyInfo {
  id: string
  name: string
  prefix: string
  lastUsedAt: string | null
  createdAt: string
}

class Emails {
  constructor(private client: Unosend) {}

  async send(options: SendEmailOptions): Promise<EmailResponse> {
    // Transform SDK parameter names to API parameter names
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

    return this.client.request<Email>('POST', '/emails', payload)
  }

  /**
   * Send up to 100 emails in a single batch request
   * @param emails Array of email options (1-100 items)
   * @returns Batch response with success/error counts
   */
  async batch(emails: SendEmailOptions[]): Promise<{
    data: {
      data: Array<{ id: string; from: string; to: string[]; created_at: string } | { error: string; index: number }>
      success_count: number
      error_count: number
    } | null
    error: UnosendError | null
  }> {
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

    return this.client.request('POST', '/emails/batch', payload)
  }

  async get(id: string): Promise<EmailResponse> {
    return this.client.request<Email>('GET', `/emails/${id}`)
  }

  async list(options?: { limit?: number; offset?: number }): Promise<EmailListResponse> {
    const params = new URLSearchParams()
    if (options?.limit) params.set('limit', options.limit.toString())
    if (options?.offset) params.set('offset', options.offset.toString())
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.client.request<Email[]>('GET', `/emails${query}`)
  }

  async cancel(id: string): Promise<EmailResponse> {
    return this.client.request<Email>('POST', `/emails/${id}/cancel`)
  }
}

class Domains {
  constructor(private client: Unosend) {}

  async create(name: string): Promise<DomainResponse> {
    return this.client.request<Domain>('POST', '/domains', { name })
  }

  async get(id: string): Promise<DomainResponse> {
    return this.client.request<Domain>('GET', `/domains/${id}`)
  }

  async list(): Promise<DomainListResponse> {
    return this.client.request<Domain[]>('GET', '/domains')
  }

  async verify(id: string): Promise<DomainResponse> {
    return this.client.request<Domain>('POST', `/domains/${id}/verify`)
  }

  async delete(id: string): Promise<{ data: { deleted: boolean } | null; error: UnosendError | null }> {
    return this.client.request('DELETE', `/domains/${id}`)
  }
}

class Audiences {
  constructor(private client: Unosend) {}

  async create(name: string): Promise<AudienceResponse> {
    return this.client.request<Audience>('POST', '/audiences', { name })
  }

  async get(id: string): Promise<AudienceResponse> {
    return this.client.request<Audience>('GET', `/audiences/${id}`)
  }

  async list(): Promise<AudienceListResponse> {
    return this.client.request<Audience[]>('GET', '/audiences')
  }

  async delete(id: string): Promise<{ data: { deleted: boolean } | null; error: UnosendError | null }> {
    return this.client.request('DELETE', `/audiences/${id}`)
  }
}

class Contacts {
  constructor(private client: Unosend) {}

  async create(audienceId: string, contact: { email: string; firstName?: string; lastName?: string }): Promise<ContactResponse> {
    return this.client.request<Contact>('POST', '/contacts', { audienceId, ...contact })
  }

  async get(id: string): Promise<ContactResponse> {
    return this.client.request<Contact>('GET', `/contacts/${id}`)
  }

  async list(audienceId: string): Promise<ContactListResponse> {
    return this.client.request<Contact[]>('GET', `/contacts?audienceId=${audienceId}`)
  }

  async update(id: string, data: { firstName?: string; lastName?: string; unsubscribed?: boolean }): Promise<ContactResponse> {
    return this.client.request<Contact>('PATCH', `/contacts/${id}`, data)
  }

  async delete(id: string): Promise<{ data: { deleted: boolean } | null; error: UnosendError | null }> {
    return this.client.request('DELETE', `/contacts/${id}`)
  }
}

export class Unosend {
  private apiKey: string
  private baseUrl: string

  public emails: Emails
  public domains: Domains
  public audiences: Audiences
  public contacts: Contacts

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
  }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    body?: Record<string, unknown> | Record<string, unknown>[]
  ): Promise<{ data: T | null; error: UnosendError | null }> {
    const url = `${this.baseUrl}${path}`

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'unosend-node/1.0.0',
        },
        body: body ? JSON.stringify(body) : undefined,
      })

      const json = await response.json() as { data?: T; error?: { message?: string; code?: number } }

      if (!response.ok) {
        return {
          data: null,
          error: {
            message: json.error?.message || 'Unknown error',
            code: json.error?.code || response.status,
            statusCode: response.status,
          },
        }
      }

      return {
        data: (json.data || json) as T,
        error: null,
      }
    } catch (err) {
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

// Default export
export default Unosend
