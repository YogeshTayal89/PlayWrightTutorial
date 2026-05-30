import {test as setup } from '@playwright/test'

setup('Global Setup', async()=>{
console.log("This is Global Set up");


})

// Project Dependencies for Global Set Up/Tear Down

// Create following files under tests directory: global.setup.ts and
// global.teardown.ts.
// v Add the following code respectively
// tests/global.setup.ts

// import { test as setup } from '@playwright/test';

// setup('create new database', async ({ }) -> {
// console.log('creating new database ... ');
// // Initialize the database

// tests/global.teardown.ts

// import { test as teardown } from '@playwright/test';

// teardown('delete database', async ({ }) -> {
// console.log('deleting test database ... ');
// // Delete the database

// v Configure global set up and tear down as projects in
// playwright.config.ts
// v Make sure to add name of setup as dependencies in actual project
// i.e. chromium, firefox