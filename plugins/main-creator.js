let handler = async (m, { conn, usedPrefix, isOwner }) => {
  let vcard = `BEGIN:VCARD
VERSION:3.0
N:;MX-GΔMΞCØDΞR;;;
FN:MX-GΔMΞCØDΞR
ORG:MX-GΔMΞCØDΞR
TITLE:Owner
item1.TEL;waid=2349021506036:2349021506036
item1.X-ABLabel:Owner
X-WA-BIZ-DESCRIPTION:Developer of the Bot
X-WA-BIZ-NAME:MX-GΔMΞCØDΞR
END:VCARD`;

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: 'MX-GΔMΞCØDΞR',
      contacts: [{ vcard }]
    }
  }, { quoted: m });
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['creator', 'creador', 'dueño'];

export default handler;
