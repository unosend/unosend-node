// Test file to verify SDK works with the Unosend API
import { Unosend } from './src/index'

const API_KEY = process.env.UNOSEND_API_KEY || 'un_test_key'
const BASE_URL = process.env.UNOSEND_BASE_URL || 'https://api.unosend.co/v1'

async function test() {
  console.log('Testing Unosend Node.js SDK v2.1.0...\n')
  console.log(`Base URL: ${BASE_URL}`)
  console.log(`API Key: ${API_KEY.substring(0, 10)}...`)
  console.log('')

  const unosend = new Unosend(API_KEY, { baseUrl: BASE_URL })

  // Test 1: Send an email
  console.log('1. Testing emails.send()...')
  const { data: sent, error: sendError } = await unosend.emails.send({
    from: 'test@example.com',
    to: 'recipient@example.com',
    subject: 'Test Email',
    html: '<h1>Hello!</h1>'
  })

  if (sendError) {
    console.log(`   Error (expected with test key): ${sendError.message}`)
  } else {
    console.log(`   Success! Email ID: ${sent?.id}`)
  }

  // Test 2: List emails
  console.log('\n2. Testing emails.list()...')
  const { data: emails, error: emailsError } = await unosend.emails.list({ page: 1, perPage: 10 })

  if (emailsError) {
    console.log(`   Error: ${emailsError.message}`)
  } else {
    console.log(`   Success! Found ${emails?.length} emails`)
  }

  // Test 3: List domains
  console.log('\n3. Testing domains.list()...')
  const { data: domains, error: domainsError } = await unosend.domains.list()

  if (domainsError) {
    console.log(`   Error: ${domainsError.message}`)
  } else {
    console.log(`   Success! Found ${domains?.length} domains`)
  }

  // Test 4: Validate an email (POST)
  console.log('\n4. Testing contacts.validate()...')
  const { data: validated, error: validateError } = await unosend.contacts.validate('test@gmail.com')

  if (validateError) {
    console.log(`   Error: ${validateError.message}`)
  } else {
    console.log(`   Valid: ${validated?.valid}, Reason: ${validated?.reason || 'none'}`)
  }

  // Test 5: List contacts
  console.log('\n5. Testing contacts.list()...')
  const { data: contacts, error: contactsError } = await unosend.contacts.list({ page: 1 })

  if (contactsError) {
    console.log(`   Error: ${contactsError.message}`)
  } else {
    console.log(`   Success! Found ${contacts?.length} contacts`)
  }

  console.log('\n✅ SDK test complete!')
  console.log('Errors above are expected with a test API key.')
}

test().catch(console.error)
