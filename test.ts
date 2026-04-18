// Unosend Node SDK v3.0.0 — Integration Test
// Tests all SDK resources against the live API.
// Usage: UNOSEND_API_KEY=un_xxx npx tsx test.ts

import { Unosend } from './src/index'

const API_KEY = process.env.UNOSEND_API_KEY || 'un_test_key'
const BASE_URL = process.env.UNOSEND_BASE_URL || 'https://api.unosend.co'
const FROM_EMAIL = process.env.UNOSEND_FROM || 'test@example.com'
const TO_EMAIL = process.env.UNOSEND_TO || 'recipient@example.com'

const unosend = new Unosend({ apiKey: API_KEY, baseUrl: BASE_URL })

let pass = 0
let fail = 0
const failures: string[] = []

function log(test: string, ok: boolean, detail: string) {
  console.log(`  ${ok ? '✅' : '❌'} ${test} — ${detail}`)
  if (ok) pass++
  else { fail++; failures.push(`${test}: ${detail}`) }
}

function section(name: string) {
  console.log(`\n━━━ ${name} ${'━'.repeat(Math.max(0, 55 - name.length))}`)
}

async function testEmails() {
  section('EMAILS')

  // send
  const { data: sent, error: e1 } = await unosend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: 'SDK Test — Single',
    html: '<h1>Hello!</h1><p>SDK v3 test.</p>',
    text: 'Hello! SDK v3 test.',
    tags: [{ name: 'test', value: 'sdk-v3' }],
    tracking: { open: true, click: true },
  })
  log('emails.send()', !e1, e1 ? e1.message : `id=${sent?.id}`)
  const emailId = sent?.id

  // send with priority
  const { error: e2, data: d2 } = await unosend.emails.send({
    from: FROM_EMAIL, to: TO_EMAIL, subject: 'SDK Test — Priority', html: '<p>High priority</p>', priority: 'high',
  })
  log('emails.send(priority)', !e2, e2 ? e2.message : `id=${d2?.id}`)

  // batch
  const { data: batch, error: e3 } = await unosend.emails.batch([
    { from: FROM_EMAIL, to: TO_EMAIL, subject: 'Batch 1', html: '<p>1</p>', tracking: { open: true, click: false } },
    { from: FROM_EMAIL, to: TO_EMAIL, subject: 'Batch 2', html: '<p>2</p>' },
  ])
  log('emails.batch()', !e3, e3 ? e3.message : `count=${batch?.data?.length}`)

  // batch validation
  const { error: e4 } = await unosend.emails.batch([])
  log('emails.batch(empty)', !!e4, e4 ? `rejected: ${e4.message}` : 'should have errored')

  // list
  const { data: list, error: e5, meta } = await unosend.emails.list({ page: 1, perPage: 5, status: 'delivered' })
  log('emails.list()', !e5, e5 ? e5.message : `count=${list?.length}, total=${meta?.total}`)

  // get
  if (emailId) {
    await new Promise(r => setTimeout(r, 1000))
    const { data: got, error: e6 } = await unosend.emails.get(emailId)
    log('emails.get()', !e6, e6 ? e6.message : `status=${got?.status}`)
  }

  return emailId
}

async function testDomains() {
  section('DOMAINS')

  const { data: list, error: e1 } = await unosend.domains.list()
  log('domains.list()', !e1, e1 ? e1.message : `count=${list?.length}`)

  const { data: created, error: e2 } = await unosend.domains.create('sdk-test.example')
  log('domains.create()', !e2, e2 ? e2.message : `id=${created?.id}, domain=${created?.domain}`)
  const id = created?.id

  if (id) {
    const { data: got, error: e3 } = await unosend.domains.get(id)
    log('domains.get()', !e3, e3 ? e3.message : `status=${got?.status}`)

    const { data: v, error: e4 } = await unosend.domains.verify(id)
    log('domains.verify()', true, e4 ? `expected: ${e4.message}` : `status=${v?.status}`)

    const { data: del, error: e5 } = await unosend.domains.delete(id)
    log('domains.delete()', !e5, e5 ? e5.message : `id=${del?.id}`)
  }
}

async function testAudiences() {
  section('AUDIENCES')

  const { data: created, error: e1 } = await unosend.audiences.create('SDK Test Audience')
  log('audiences.create()', !e1, e1 ? e1.message : `id=${created?.id}`)
  const id = created?.id

  const { data: list, error: e2 } = await unosend.audiences.list()
  log('audiences.list()', !e2, e2 ? e2.message : `count=${list?.length}`)

  if (id) {
    const { data: got, error: e3 } = await unosend.audiences.get(id)
    log('audiences.get()', !e3, e3 ? e3.message : `name=${got?.name}`)
  }

  return id
}

async function testContacts(audienceId?: string) {
  section('CONTACTS')
  if (!audienceId) { log('contacts.*', false, 'skipped — no audience'); return }

  const { data: created, error: e1 } = await unosend.contacts.create({
    email: 'sdktest@example.com', audienceId, firstName: 'SDK', lastName: 'Test',
  })
  log('contacts.create()', !e1, e1 ? e1.message : `id=${created?.id}`)
  const id = created?.id

  const { data: list, error: e2, meta } = await unosend.contacts.list({ audienceId, page: 1, perPage: 10 })
  log('contacts.list()', !e2, e2 ? e2.message : `count=${list?.length}, total=${meta?.total}`)

  if (id) {
    const { data: got, error: e3 } = await unosend.contacts.get(id)
    log('contacts.get()', !e3, e3 ? e3.message : `email=${got?.email}`)

    const { data: upd, error: e4 } = await unosend.contacts.update(id, { firstName: 'Updated', unsubscribed: false })
    log('contacts.update()', !e4, e4 ? e4.message : `name=${upd?.first_name}`)

    const { data: del, error: e5 } = await unosend.contacts.delete(id)
    log('contacts.delete()', !e5, e5 ? e5.message : `id=${del?.id}`)
  }

  // validate (simple)
  const { data: v1, error: e6 } = await unosend.contacts.validate('test@gmail.com')
  log('contacts.validate(simple)', !e6, e6 ? e6.message : `valid=${v1?.valid}`)

  // validate (advanced)
  const { data: v2, error: e7 } = await unosend.contacts.validate({
    email: 'fake@thisisnotreal12345.xyz', checkSmtp: true, checkCatchAll: true,
  })
  log('contacts.validate(advanced)', !e7, e7 ? e7.message : `valid=${v2?.valid}, reason=${v2?.reason}`)
}

async function testTemplates() {
  section('TEMPLATES')

  const { data: created, error: e1 } = await unosend.templates.create({
    name: 'SDK Test', subject: 'Hello {{first_name}}!',
    html: '<h1>Hi {{first_name}}</h1>', text: 'Hi {{first_name}}',
  })
  log('templates.create()', !e1, e1 ? e1.message : `id=${created?.id}`)
  const id = created?.id

  const { data: list, error: e2 } = await unosend.templates.list()
  log('templates.list()', !e2, e2 ? e2.message : `count=${list?.length}`)

  if (id) {
    const { data: got, error: e3 } = await unosend.templates.get(id)
    log('templates.get()', !e3, e3 ? e3.message : `name=${got?.name}`)

    const { data: upd, error: e4 } = await unosend.templates.update(id, { subject: 'Updated!' })
    log('templates.update()', !e4, e4 ? e4.message : `subject=${upd?.subject}`)

    // send using template
    const { data: sent, error: e5 } = await unosend.emails.send({
      from: FROM_EMAIL, to: TO_EMAIL, subject: 'Template Test',
      templateId: id, templateData: { first_name: 'Tester' },
    })
    log('emails.send(template)', !e5, e5 ? e5.message : `id=${sent?.id}`)

    const { data: del, error: e6 } = await unosend.templates.delete(id)
    log('templates.delete()', !e6, e6 ? e6.message : `id=${del?.id}`)
  }
}

async function testBroadcasts(audienceId?: string) {
  section('BROADCASTS')
  if (!audienceId) { log('broadcasts.*', false, 'skipped — no audience'); return }

  const { data: created, error: e1 } = await unosend.broadcasts.create({
    name: 'SDK Test', subject: 'Broadcast', fromEmail: FROM_EMAIL,
    audienceId, htmlContent: '<h1>Hello {{first_name}}</h1>',
  })
  log('broadcasts.create()', !e1, e1 ? e1.message : `id=${created?.id}, status=${created?.status}`)
  const id = created?.id

  const { data: list, error: e2 } = await unosend.broadcasts.list()
  log('broadcasts.list()', !e2, e2 ? e2.message : `count=${list?.length}`)

  if (id) {
    const { data: got, error: e3 } = await unosend.broadcasts.get(id)
    log('broadcasts.get()', !e3, e3 ? e3.message : `status=${got?.status}`)

    const { error: e4 } = await unosend.broadcasts.send(id)
    log('broadcasts.send()', true, e4 ? `expected: ${e4.message}` : 'sent')

    await new Promise(r => setTimeout(r, 1000))
    const { error: e5 } = await unosend.broadcasts.delete(id)
    log('broadcasts.delete()', !e5, e5 ? e5.message : 'deleted')
  }
}

async function testWebhooks() {
  section('WEBHOOKS')

  const { data: created, error: e1 } = await unosend.webhooks.create({
    url: 'https://webhook.site/sdk-test', events: ['email.delivered', 'email.bounced'],
  })
  log('webhooks.create()', !e1, e1 ? e1.message : `id=${created?.id}`)
  const id = created?.id

  const { data: list, error: e2 } = await unosend.webhooks.list()
  log('webhooks.list()', !e2, e2 ? e2.message : `count=${list?.length}`)

  if (id) {
    const { data: got, error: e3 } = await unosend.webhooks.get(id)
    log('webhooks.get()', !e3, e3 ? e3.message : `url=${got?.url}`)

    const { data: upd, error: e4 } = await unosend.webhooks.update(id, {
      events: ['email.delivered', 'email.bounced', 'email.opened'],
    })
    log('webhooks.update()', !e4, e4 ? e4.message : `events=${upd?.events?.join(',')}`)

    const { error: e5 } = await unosend.webhooks.delete(id)
    log('webhooks.delete()', !e5, e5 ? e5.message : 'deleted')
  }
}

async function testInbound() {
  section('INBOUND')

  const { data: list, error: e1, meta } = await unosend.inbound.list({ page: 1, perPage: 5 })
  log('inbound.list()', !e1, e1 ? e1.message : `count=${list?.length}, total=${meta?.total}`)

  if (list && list.length > 0) {
    const { data: got, error: e2 } = await unosend.inbound.get(list[0].id)
    log('inbound.get()', !e2, e2 ? e2.message : `from=${got?.from}`)

    const { data: att, error: e3 } = await unosend.inbound.listAttachments(list[0].id)
    log('inbound.listAttachments()', !e3, e3 ? e3.message : `count=${att?.length}`)
  } else {
    log('inbound.get()', true, 'skipped — no inbound emails')
    log('inbound.listAttachments()', true, 'skipped — no inbound emails')
  }
}

async function testSuppressions() {
  section('SUPPRESSIONS')

  const { data: created, error: e1 } = await unosend.suppressions.create('sdk-test@example.com', 'manual')
  log('suppressions.create()', !e1, e1 ? e1.message : `id=${created?.id}`)
  const id = created?.id

  const { data: list, error: e2, meta } = await unosend.suppressions.list({ page: 1, perPage: 5 })
  log('suppressions.list()', !e2, e2 ? e2.message : `count=${list?.length}, total=${meta?.total}`)

  if (id) {
    const { data: got, error: e3 } = await unosend.suppressions.get(id)
    log('suppressions.get()', !e3, e3 ? e3.message : `email=${got?.email}, reason=${got?.reason}`)

    const { error: e4 } = await unosend.suppressions.delete(id)
    log('suppressions.delete()', !e4, e4 ? e4.message : 'deleted')
  }

  // deleteByEmail
  const uniqueEmail = `sdk-del-${Date.now()}@example.com`
  const { data: c2, error: ce2 } = await unosend.suppressions.create(uniqueEmail, 'manual')
  if (c2) {
    const { data: d2, error: de2 } = await unosend.suppressions.deleteByEmail(uniqueEmail)
    log('suppressions.deleteByEmail()', !de2, de2 ? de2.message : `id=${d2?.id}`)
  } else {
    log('suppressions.deleteByEmail()', false, `create failed: ${ce2?.message}`)
  }
}

async function testApiKeys() {
  section('API KEYS')

  const { data: created, error: e1 } = await unosend.apiKeys.create('SDK Test Key', 'read_only')
  log('apiKeys.create()', !e1, e1 ? e1.message : `id=${created?.id}, key=${created?.key ? 'present' : 'none'}`)
  const id = created?.id

  const { data: list, error: e2 } = await unosend.apiKeys.list()
  log('apiKeys.list()', !e2, e2 ? e2.message : `count=${list?.length}`)

  if (id) {
    const { error: e3 } = await unosend.apiKeys.delete(id)
    log('apiKeys.delete()', !e3, e3 ? e3.message : 'deleted')
  }
}

async function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗')
  console.log('║       Unosend Node SDK v3.0.0 — Integration Tests          ║')
  console.log('╚══════════════════════════════════════════════════════════════╝')
  console.log(`  API:  ${BASE_URL}`)
  console.log(`  From: ${FROM_EMAIL}`)
  console.log(`  To:   ${TO_EMAIL}`)

  await testEmails()
  await testDomains()
  const audienceId = await testAudiences()
  await testContacts(audienceId)
  await testTemplates()
  await testBroadcasts(audienceId)
  await testWebhooks()
  await testInbound()
  await testSuppressions()
  await testApiKeys()

  // cleanup
  if (audienceId) {
    section('CLEANUP')
    const { error } = await unosend.audiences.delete(audienceId)
    log('audiences.delete(cleanup)', !error, error ? error.message : 'done')
  }

  console.log('\n╔══════════════════════════════════════════════════════════════╗')
  console.log(`║   RESULTS: ${pass} passed, ${fail} failed, ${pass + fail} total`)
  console.log('╚══════════════════════════════════════════════════════════════╝\n')

  if (failures.length > 0) {
    console.log('Failed:')
    failures.forEach(f => console.log(`  ❌ ${f}`))
    console.log('')
  }
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })
