let handler = async (m, { conn }) => {
  global.prefix = new RegExp(
    '^[' +
      (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(
        /[|\\{}()[\]^$+*?.\-\^]/g,
        '\\$&'
      ) +
      ']'
  )
  await m.reply(`MX-2.0 PREFIX RESET SUCCESS`)
}
handler.help = ['resetprefix']
handler.tags = ['owner']
handler.command = /^(resetprefix)$/i
handler.owner = true

export default handler
