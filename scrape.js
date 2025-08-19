const fs = require('fs')
const { chromium } = require('playwright')

const main = async () => {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto(
    'https://techiekidsclub.com/front-franchise/techie-kids-club/parentlogin'
  )
  await page.getByText('Toggle').click()
  await page.getByRole('textbox', { name: 'Email' }).click()
  await page
    .getByRole('textbox', { name: 'Email' })
    .fill('solutioners9@gmail.com')
  await page.getByRole('textbox', { name: 'Password' }).click()
  await page.getByRole('textbox', { name: 'Password' }).click()
  await page.getByRole('textbox', { name: 'Password' }).fill('cyber@2020')
  await page.locator('input[name="green_box"]').click()
  await page.locator('input[name="green_box"]').fill('Techie Kids Club')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await page.locator('#left-side').getByText('Purchases').click()
  await page.getByText('Purchases Subscriptions').click()

  const rows = await page.$$eval('#subscriptions table tr', (trs) =>
    trs.map((tr) => {
      const cells = Array.from(tr.querySelectorAll('td, th'))
      return cells.map((cell) => cell.textContent.trim())
    })
  )

  console.log('Subscriptions Table:', rows)

  const cleaned = rows.map((r) => r.filter((_, idx) => idx !== 3))

  const csv = cleaned.map((r) => r.join(',')).join('\n')

  fs.writeFileSync('subscriptions.csv', csv)

  await browser.close()
}

main()
