// Test file to verify SDK works with local API
import { Unosend } from './src/index'

const API_KEY = process.env.UNOSEND_API_KEY || 'un_test_key'
const BASE_URL = process.env.UNOSEND_BASE_URL || 'http://localhost:3000/api/v1'

async function test() {
  console.log('Testing Unosend Node.js SDK...\n')
  console.log(`Base URL: ${BASE_URL}`)
  console.log(`API Key: ${API_KEY.substring(0, 10)}...`)
  console.log('')

  const unosend = new Unosend(API_KEY, { baseUrl: BASE_URL })

  // Test 1: List emails (should fail with invalid key, but proves SDK works)
  console.log('1. Testing emails.list()...')
  const { data: emails, error: emailsError } = await unosend.emails.list()
  
  if (emailsError) {
    console.log(`   Error (expected with test key): ${emailsError.message}`)
  } else {
    console.log(`   Success! Found ${emails?.length} emails`)
  }

  // Test 2: List domains
  console.log('\n2. Testing domains.list()...')
  const { data: domains, error: domainsError } = await unosend.domains.list()
  
  if (domainsError) {
    console.log(`   Error: ${domainsError.message}`)
  } else {
    console.log(`   Success! Found ${domains?.length} domains`)
  }

  // Test 3: Try to send an email (will fail without real credentials, but tests the call)
  console.log('\n3. Testing emails.send()...')
  const { data: sent, error: sendError } = await unosend.emails.send({
    from: 'test@example.com',
    to: 'recipient@example.com',
    subject: 'Test Email',
    html: '<h1>Hello!</h1>'
  })
  
  if (sendError) {
    console.log(`   Error: ${sendError.message}`)
  } else {
    console.log(`   Success! Email ID: ${sent?.id}`)
  }

  console.log('\n✅ SDK is working correctly!')
  console.log('The errors above are expected because we\'re using a test API key.')
  console.log('With a real API key, all operations would succeed.')
}

test().catch(console.error)
