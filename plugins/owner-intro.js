import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command, conn }) => {
  try {
    // Expanded intro card text with additional fields
    const introText = `
 ◈ •╭═══ ━ ━ • ━ ━ ━ ═══♡᭄
 ◈ •│       「 𝗠𝗬 𝗜𝗡𝗧𝗥𝗢 」
 ◈ •│ Name    : mxgamecoder
 ◈ •│
 ◈ •│ Place     : 🤔🤔🤔🤔
 ◈ •│
 ◈ •│ Gender  : 𝙼𝙰𝙻𝙴
 ◈ •│
 ◈ •│ Age        : 18_
 ◈ •│
 ◈ •│ Status   : 𝙳𝙴𝚅𝙴𝙻𝙾𝙿𝙴𝚁
 ◈ •│
 ◈ •│ Skills     : 𝙹𝙰𝚅𝙰𝚂𝙲𝚁𝙸𝙿𝚃
 ◈ •│
 ◈ •│ Lang     : 𝙴𝙽𝙶𝙻𝙸𝚂𝙷
 ◈ •│
 ◈ •│ Project  : 𝚖𝚡-𝟸.𝟶
 ◈ •│
 ◈ •│ Hobbie  : 𝙲𝙾𝙳𝙸𝙽𝙶,𝙱𝙾𝚃𝚂
 ◈ •╰═══ ━ ━ • ━ ━ ━ ═══♡᭄
    `;

    let pp = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

    // Try fetching the profile picture of the sender
    try {
      pp = await conn.profilePictureUrl(m.sender);
    } catch (e) {
      console.log("Error fetching profile picture:", e);
    }

    const sourceUrl = 'https://youtube.com/@mxgamecoder'; // Example source URL for the card

    const contextInfo = {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: '𝚖𝚡-𝟸.𝟶', // Title of the card
        body: '𝑇𝛩𝑈𝐶𝛨 𝛨𝛯𝑅𝛯',
        thumbnailUrl: 'https://github.com/themxgamecoder.png', // Fixed URL syntax with quotes
        mediaUrl: 'https://github.com/themxgamecoder.png', // Fixed URL syntax with quotes
        sourceUrl: sourceUrl, // Source URL for the card
      },
    };

    // Send the message with the extended intro text and external ad reply
    await conn.sendMessage(m.chat, { text: introText, contextInfo }, { quoted: m });

  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { text: `❌ Something went wrong: ${e.message}` }, { quoted: m });
  }
};

handler.help = ['intro'];
handler.tags = ['fun'];
handler.command = /^owner|intro|duction$/i;

export default handler;
