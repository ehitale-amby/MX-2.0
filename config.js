import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'

import dotenv from 'dotenv'
dotenv.config()

const defaultOwner = '2349021506036';


// Check for the OWNERS environment variable; if not found, use the default
const ownervb = process.env.OWNERS || process.env.OWNER_NUMBER || '2347045787823';  // put your number here

const ownerlist = ownervb.split(';');

global.owner = [];
for (let i = 0; i < ownerlist.length; i++) {
    global.owner.push([ownerlist[i], true]);
}
//
global.botname = process.env.BOTNAME || 'MX-2.0';
global.pairingNumber = process.env.BOT_NUMBER || '2347045787823';  // put your number here
global.SESSION_ID = process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkJyOWlKUWlpWnFibjhlb2x0NjRUL084d3liWG9MUHNJQ1YzZisxNmhGTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkRqUFhSNXVSZXdOdVUzN1lVUDNzZkFqL1lLRTZhSWozQXl2WFI2TFZsOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3SWU0S2o5MDBYWlkvcDgxbUpKcitmd1A0NXVqU0JoczNXdzNGVkdoaG40PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPOEVtNmxPZEZHTlkrR0RiOXBRNzZXakR6aElIV0pmUjRWOTRkS0xQOUNrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVQRWhmbU8yUWV3bUFzbStjWDVSQ0NrRmZYZHBMc3pJb2JRSm0vbmJUbjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjB4MFVqcjRWS0VMdXZvWnFyb0ZiWmQyckNLTmdQSXhnU1RwalpWWllGSFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUM1WjZNNXVEamlrQTJPT0tkczI5RGRLTW96MVJLTnNHOUVibzhLOTQyUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1B6S0pneE9DOTFKRzVtOFlwZThIZ3ZOOVJHdU9PNEpNczQ3NG1tNncyQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFFZUVLUGFwNENPWFdLSUpVSm9DNlcyUFEvRFpaZVBQZHhWZjFCYU9VeEtsMzBpZVg3WVgwWGdiQmRhb2hxNmNLUW9ySkZlWERrbDB2eVY5a291a0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM1LCJhZHZTZWNyZXRLZXkiOiJJTEFvS3EwbkxHY015MjJ4UXp3ZUFwaUxnNVl1ZTJObzlDQWszQVdlejg0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIxcURlUGl6elMtbThCaTZXVUNtTl9nIiwicGhvbmVJZCI6ImM4ZmNjZWIzLWVmMzAtNGJjZS1hNDg5LTQxOTAyY2RmNDM4NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2T3YrQWd1Rzd5a1h1WStIWGYxSnNLNXhDaTA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVHZmNytpYllrWmlZRHhkZlNaT0dWczJsMEhJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkZDU0g0NTlWIiwibWUiOnsiaWQiOiIyMzQ3MDQ1Nzg3ODIzOjE1QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNbkovSmdERU5PKzJyd0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJjVGlUU3pQYnBvQUd5b29iZzRXZzVLaVA3STdMcXdOVGFUcHQ4V3Q4Q2l3PSIsImFjY291bnRTaWduYXR1cmUiOiJlbnFQMnJjMlRGQUMxcXoyODBLZmJjWHZxSUhEVjNkRHhXVVRiNlJuV21MR1I3a084NS9jMTY5NmZ3NWQ0ZlFHMkRkeDJHa3g4YXhxbGdHZUdDTWdDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaXloTXhNdnNReXJsTjU0c1FPQzlveFhKSFRSUGg4L1NuTkkzOGRpL2l3ZzQzVmc2cHNPc0pPMUY2SjQ2YzAwQ1ZWZ1k1UDB0cGVUOWFqa0NRaXEzQnc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDQ1Nzg3ODIzOjE1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhFNGswc3oyNmFBQnNxS0c0T0ZvT1Nvait5T3k2c0RVMms2YmZGcmZBb3MifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mzc5MjQ0NDh9';  // put your session id here

global.mods = []
global.prems = []
global.allowed = ['2349021506036', '2349021506036']
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = [
  '29d4b59a4aa687ca',
  '5LTV57azwaid7dXfz5fzJu',
  'cb15ed422c71a2fb',
  '5bd33b276d41d6b4',
  'HIRO',
  'kurrxd09',
  'ebb6251cc00f9c63',
]
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['GataDios']

global.canal = 'https://whatsapp.com/channel/0029Vavz0e6E50Ugp30Z6z0W'


global.APIs = {
  // API Prefix
  // name: 'https://website'
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://zenzapis.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api.fgmods.xyz',
}
global.APIKeys = {
  // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
  'https://api.neoxr.my.id': `${keysneoxr}`,
  'https://violetics.pw': 'beta',
  'https://zenzapis.xyz': `${keysxxx}`,
  'https://api.fgmods.xyz': 'm2XBbNvz',
}

// Sticker WM
global.premium = 'true'
global.packname = 'MX-2.0'
global.author = 'MX-GΔMΞCØDΞR'
global.menuvid = 'https://i.ibb.co/WtpYwmX/C.jpg'
global.igfg = ' Follow on Instagram\nhttps://www.instagram.com/themxgamecoder'
global.dygp = 'https://whatsapp.com/channel/0029Vavz0e6E50Ugp30Z6z0W'
global.fgsc = 'https://github.com/themxgamecoder/MX-2.0'
global.fgyt = 'https://youtube.com/@mxgamecoder'
global.fgpyp = 'https://youtube.com/@mxgamecoder'
global.fglog = 'https://i.ibb.co/WtpYwmX/C.jpg'
global.thumb = fs.readFileSync('./assets/mx.jpg')

global.wait = '*🕑 _processing..._*\n*▰▰▰▱▱▱▱▱*'
global.rwait = '⏳'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌'
global.xmoji = '🤩'

global.multiplier = 69
global.maxwarn = '3'

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
