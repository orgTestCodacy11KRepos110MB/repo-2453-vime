import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const FROM_PKG_PATH = resolve(__dirname, '../package.json');
const fromPkgContents = readFileSync(FROM_PKG_PATH);
const fromPkg = JSON.parse(fromPkgContents.toString());
const version = fromPkg.version;

const TO_PKG_PATH = resolve(__dirname, '../dist/package.json');
const toPkgContents = readFileSync(TO_PKG_PATH);
const toPkg = JSON.parse(toPkgContents.toString());
toPkg.version = version;
toPkg.files.push('.scripts/');
(toPkg.scripts ??= {}).postinstall = 'node ./.scripts/validate.cjs';
writeFileSync(TO_PKG_PATH, JSON.stringify(toPkg, undefined, 2));

const scriptsDir = resolve(__dirname, '../dist/.scripts');
const validateScriptContents = readFileSync(
  resolve(__dirname, '../.scripts/validate.cjs'),
).toString();
mkdirSync(scriptsDir);
writeFileSync(resolve(scriptsDir, 'validate.cjs'), validateScriptContents);
