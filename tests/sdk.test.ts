import { expect, it, vi } from 'vitest'
import { Unosend } from '../src/index'

it('returns a clear error when the response body is not json', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () =>
      new Response('not json', { status: 500, headers: { 'Content-Type': 'text/plain' } })
    )
  )

  const client = new Unosend({ apiKey: 'un_test' })
  const { data, error } = await client.emails.list()

  expect(data).toBeNull()
  expect(error?.message).toBe('Response was not valid JSON')
  expect(error?.statusCode).toBe(500)

  vi.unstubAllGlobals()
})

it('does not retry when json parsing fails after a successful fetch', async () => {
  const fetchMock = vi.fn(async () =>
    new Response('<html>error</html>', { status: 502, headers: { 'Content-Type': 'text/html' } })
  )
  vi.stubGlobal('fetch', fetchMock)

  const client = new Unosend({ apiKey: 'un_test' })
  await client.emails.list()

  expect(fetchMock).toHaveBeenCalledTimes(1)

  vi.unstubAllGlobals()
})

it('passes abort signal to fetch when timeout is set', async () => {
  const calls: RequestInit[] = []
  vi.stubGlobal(
    'fetch',
    vi.fn(async (_url, init) => {
      calls.push(init as RequestInit)
      return new Response(JSON.stringify({ data: [] }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    })
  )

  const client = new Unosend({ apiKey: 'un_test', timeout: 5000 })
  await client.domains.list()

  expect(calls.length).toBe(1)
  expect(calls[0]?.signal).toBeDefined()

  vi.unstubAllGlobals()
})

it('deleteByEmail keeps listing pages until a match is found', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url, init) => {
      const u = String(url)
      const method = (init?.method || 'GET').toUpperCase()
      if (method === 'DELETE' && u.endsWith('/suppressions/s2')) {
        return new Response(JSON.stringify({ data: { id: 's2' } }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      return new Response('{}', { status: 404 })
    })
  )

  const client = new Unosend({ apiKey: 'un_test' })
  const listSpy = vi.spyOn(client.suppressions, 'list')
  listSpy
    .mockResolvedValueOnce({
      data: Array.from({ length: 100 }, (_, i) => ({
        id: `s${i}`,
        email: `u${i}@fill.example`,
        reason: 'manual',
        created_at: 't',
      })),
      error: null,
    })
    .mockResolvedValueOnce({
      data: [{ id: 's2', email: 'target@example.com', reason: 'manual', created_at: 't' }],
      error: null,
    })

  const { data, error } = await client.suppressions.deleteByEmail('target@example.com')

  expect(error).toBeNull()
  expect(data?.id).toBe('s2')
  expect(listSpy).toHaveBeenCalledTimes(2)

  vi.unstubAllGlobals()
})
