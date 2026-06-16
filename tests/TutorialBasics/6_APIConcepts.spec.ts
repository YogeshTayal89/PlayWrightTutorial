import { test, expect } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

// This file demonstrates a wide range of Playwright API concepts.
// Each test contains detailed examples and comments to explain the most
// commonly used actions, locators, network handling, browser contexts,
// file upload/download, request API usage, and more.

test.describe('Playwright API Concepts', () => {

  test('Basic page operations and assertions', async ({ page }) => {
    // Navigate to a target website.
    await page.goto('https://the-internet.herokuapp.com/')

    // Click a link using text-based locator.
    await page.getByText('Form Authentication').click()

    // Wait for the login form to appear and assert the URL.
    await expect(page).toHaveURL(/.*login/)

    // Fill text fields and verify values using locators.
    await page.locator('#username').fill('tomsmith')
    await page.locator('#password').fill('SuperSecretPassword!')

    // Submit the form and verify the success message.
    await page.locator('button[type="submit"]').click()
    await expect(page.getByText('You logged into a secure area!')).toBeVisible()
  })

  test('Locators and advanced selector usage', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes')

    // Use locator with XPath for advanced selection.
    const checkboxOne = page.locator('//input[@type="checkbox"]').first()
    const checkboxTwo = page.locator('//input[@type="checkbox"]').nth(1)

    // Use locator filters and assertions.
    await expect(checkboxOne).not.toBeChecked()
    await checkboxOne.check()
    await expect(checkboxOne).toBeChecked()

    await expect(checkboxTwo).toBeChecked()
    await checkboxTwo.uncheck()
    await expect(checkboxTwo).not.toBeChecked()
  })

  test('Network interception and request validation', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/')

    // Intercept a network request and modify the response.
    await page.route('**/api/**', async route => {
      const response = await route.fetch()
      const body = await response.text()
      await route.fulfill({
        status: response.status(),
        headers: response.headers(),
        body,
      })
    })

    // Example navigation that may trigger network requests.
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.status() === 200 && resp.url().includes('/dynamic_loading')),
      page.getByText('Dynamic Loading').click(),
    ])
    await expect(page).toHaveURL(/.*dynamic_loading/)
    expect(response.ok()).toBeTruthy()
  })

  test('File download and upload', async ({ page, context, request }) => {
    // Create a temporary file to upload later.
    const tempFilePath = path.join(process.cwd(), 'tests', 'TutorialBasics', 'temp-upload.txt')
    fs.writeFileSync(tempFilePath, 'Playwright API upload example')

    // Navigate to file upload page.
    await page.goto('https://the-internet.herokuapp.com/upload')
    await page.locator('#file-upload').setInputFiles(tempFilePath)
    await page.locator('#file-submit').click()
    await expect(page.getByText('File Uploaded!')).toBeVisible()
    await expect(page.locator('#uploaded-files')).toHaveText('temp-upload.txt')

    // Use a fresh page for the download step to avoid navigation conflicts.
    const downloadPage = await context.newPage()
    await downloadPage.goto('https://the-internet.herokuapp.com/download', { waitUntil: 'domcontentloaded' })
    expect(await downloadPage.locator('a').count()).toBeGreaterThan(0)

    const link = downloadPage.locator('a').first()
    const href = await link.getAttribute('href')
    if (href) {
      // Download via the request fixture when browser download event isn't emitted
      const fileUrl = new URL(href, downloadPage.url()).toString()
      const fileResp = await request.get(fileUrl)
      expect(fileResp.ok()).toBeTruthy()
      const buffer = await fileResp.body()
      const downloadFilePath = path.join(process.cwd(), 'tests', 'TutorialBasics', 'downloaded-file')
      fs.writeFileSync(downloadFilePath, buffer)
      const stats = fs.statSync(downloadFilePath)
      expect(stats.size).toBeGreaterThan(0)
      fs.unlinkSync(downloadFilePath)
    } else {
      const [download] = await Promise.all([
        downloadPage.waitForEvent('download'),
        link.click(),
      ])
      const downloadPath = await download.path()
      expect(downloadPath).not.toBeNull()
      if (downloadPath) {
        const stats = fs.statSync(downloadPath)
        expect(stats.size).toBeGreaterThan(0)
      }
    }

    await downloadPage.close()
    fs.unlinkSync(tempFilePath)
  })

  test('Browser contexts and multiple pages', async ({ browser }) => {
    // Browser contexts isolate cookies, storage, and permissions.
    const context = await browser.newContext()
    const page1 = await context.newPage()

    await page1.goto('https://playwright.dev/')
    await expect(page1).toHaveTitle(/Playwright/)

    // Open a second page in the same context.
    const page2 = await context.newPage()
    await page2.goto('https://example.com/')

    await expect(page2.locator('h1')).toHaveText('Example Domain')
    await page1.close()
    await page2.close()
    await context.close()
  })

  test('API request and response handling', async ({ request }) => {
    // Use the Playwright request fixture for API-level testing.
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1')
    expect(response.ok()).toBeTruthy()

    const responseBody = await response.json()
    expect(responseBody).toHaveProperty('id', 1)
    expect(responseBody).toHaveProperty('title')
  })

  test('Keyboard, mouse actions, and page screenshot', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login')

    // Fill text input using keyboard type and verify values.
    await page.locator('#username').click()
    await page.keyboard.type('tomsmith')
    await page.locator('#password').click()
    await page.keyboard.type('SuperSecretPassword!')

    // Press Enter to submit the form.
    await page.keyboard.press('Enter')
    await expect(page.getByText('You logged into a secure area!')).toBeVisible()

    // Capture a screenshot and save it to a file within the test folder.
    const screenshotPath = path.join(process.cwd(), 'tests', 'TutorialBasics', 'login-success.png')
    await page.screenshot({ path: screenshotPath, fullPage: true })
  })

  test('Frame handling and JavaScript evaluation', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe')

    // Access the iframe and set its content using JavaScript evaluation.
    const frame = page.frameLocator('#mce_0_ifr')
    const editorBody = frame.locator('body#tinymce')
    await editorBody.evaluate(body => { body.innerHTML = 'This is a Playwright iframe test example' })
    await expect(editorBody).toHaveText('This is a Playwright iframe test example')

    // Evaluate JavaScript inside the page context.
    const pageTitle = await page.evaluate(() => document.title)
    expect(pageTitle).toContain('The Internet')
  })

})
