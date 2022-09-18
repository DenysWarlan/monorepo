// Load node modules
const dotenv = require('dotenv');
const { existsSync, writeFile } = require('fs');
const path = require('path');

const dirname = path.resolve();

const dotEnvFile = path.join(dirname, '/.env');
// Configure Angular `environment.ts` file path
const targetPath = path.join(dirname, '/apps/library-web/src/environments/environment.ts');

// Check that .env file exists
if (!existsSync(dotEnvFile)) {
  throw console.error('ERROR! .env file not found. Try to create it basing on .env.example file.');
}

dotenv.config();

// `environment.ts` file structure
const envConfigFile = `
/**
 * DO NOT MODIFY THIS FILE!
 *
 * This file is generated dynamically by set-env.ts script.
 * The content of this file is defined by CI/CD env variables during CI/CD process or by .env file locally
 * If you want to modify some of the values you need to change them in .env file or Gitlab CI/CD variables
 *
 * REMEMBER! You have to restart dev server (npm run start) after every .env change
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const environment: any = {
  production: ${process.env.PRODUCTION || true},
  apiUrl: '${process.env.API_URL}',
};
`;

console.log(`The file environment.ts will be written with the following content: \n`);
console.log(envConfigFile);

try {
  writeFile(targetPath, envConfigFile, function (err: any) {
    if (err) {
      throw console.error(err);
    } else {
      console.log(`Angular environment.ts file generated correctly at ${targetPath} \n\n`);
    }
  });
} catch (error) {
  console.error(error);
}
