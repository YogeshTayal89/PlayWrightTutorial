# Test Plan: SauceDemo login

**Target:** https://www.saucedemo.com
**Seed:** tests/seed.spec.ts
**Date:** 2026-08-08

## Overview
Validate the Sauce Demo login experience for a successful standard_user login and the expected error handling for locked_out_user, empty credentials, and invalid credential submissions.

## Preconditions
- Browser is on https://www.saucedemo.com
- No authenticated session exists
- The page is reachable and login form fields are visible
- All passwords use `secret_sauce`

## Scenarios

### Scenario 1.1 — Standard user login succeeds
- **Priority:** P0
- **Tags:** @smoke @regression
- **Preconditions:** Login page is displayed
- **Steps:**
  1. Enter `standard_user` into Username
  2. Enter `secret_sauce` into Password
  3. Click Login — expected: redirected to inventory page
- **Assertions:**
  - Inventory page header or product list is visible
  - Page URL contains `/inventory`
  - No error banner is shown
- **Edge cases considered:**
  - Successful login should not leave the user on the login page
  - Fields should clear or no longer be visible after redirect

### Scenario 1.2 — Locked out user shows locked error
- **Priority:** P0
- **Tags:** @regression
- **Preconditions:** Login page is displayed
- **Steps:**
  1. Enter `locked_out_user` into Username
  2. Enter `secret_sauce` into Password
  3. Click Login — expected: locked out error message appears
- **Assertions:**
  - Error banner text includes `Sorry, this user has been locked out.`
  - User remains on the login page
  - Login button is still visible
- **Edge cases considered:**
  - No inventory page is reached
  - Error banner is dismissible or remains visible until corrected

### Scenario 1.3 — Empty username submission
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Login page is displayed
- **Steps:**
  1. Leave Username blank
  2. Enter `secret_sauce` into Password
  3. Click Login — expected: username required error appears
- **Assertions:**
  - Error banner text includes `Username is required`
  - User remains on the login page
- **Edge cases considered:**
  - Password value should remain entered after the error
  - The login form should not submit successfully

### Scenario 1.4 — Empty password submission
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Login page is displayed
- **Steps:**
  1. Enter `standard_user` into Username
  2. Leave Password blank
  3. Click Login — expected: password required error appears
- **Assertions:**
  - Error banner text includes `Password is required`
  - User remains on the login page
- **Edge cases considered:**
  - Username value should remain entered after the error
  - The login attempt must not proceed to inventory

### Scenario 1.5 — Invalid credentials show mismatch error
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Login page is displayed
- **Steps:**
  1. Enter `invalid_user` into Username
  2. Enter `secret_sauce` into Password
  3. Click Login — expected: invalid credentials error appears
- **Assertions:**
  - Error banner text includes `Username and password do not match any user in this service`
  - User remains on the login page
- **Edge cases considered:**
  - No successful login for invalid user
  - Error state clears only after new valid input or refresh

## Not covered (and why)
- Password recovery or forgotten password flows — outside login validation scope
- Other valid usernames such as `problem_user` or `performance_glitch_user` — prompt specifically requested only standard and locked out flows
- Post-login inventory interactions and checkout flows — focus is on authentication only
