
import fetch from 'node-fetch'

let handler = m => m
handler.all = async function (m) {
	
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
	let pp = await this.profilePictureUrl(who, 'image').catch(_ => 'https://i.ibb.co/WtpYwmX/C.jpg')
	
	//reply link wa
   global.rpgc = { contextInfo: { externalAdReply: { mediaUrl: 'https://i.ibb.co/WtpYwmX/C.jpg', mediaType: 'VIDEO', description: 'support group', title: 'JOIN GROUP', body: 'support group', thumbnailUrl: 'https://i.ibb.co/WtpYwmX/C.jpg', sourceUrl: 'https://chat.whatsapp.com/CB3O8v4T6ho14mDO9TpBYZ' }}} 
	
	//reply link Instagram 
    global.rpig = { contextInfo: { externalAdReply: { mediaUrl: 'https://i.ibb.co/WtpYwmX/C.jpg', mediaType: 'VIDEO', description: 'FOLLOW DEVELOPER', title: 'INSTAGRAM', body: 'Keep bot alive', thumbnailUrl: 'https://i.ibb.co/WtpYwmX/C.jpg', sourceUrl: 'https://instagram.com/themxgamecoder' }}}
	
	//reply link yt
    global.rpyt = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: 'https://i.ibb.co/WtpYwmX/C.jpg', mediaType: 'VIDEO', description: 'SUBSCRIBE : YT CHANNEL', title: 'YouTube', body: 'learn to create your own bots', thumbnailUrl: 'https://i.ibb.co/WtpYwmX/C.jpg', sourceUrl: 'https://youtube.com/@mxgamecoder' }}}

//reply link WhatsApp Channel
    global.rpwp = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: 'https://i.ibb.co/WtpYwmX/C.jpg', mediaType: 'VIDEO', description: 'Follow Channel', title: 'FOLLOW CHANNEL', body: '© MX-GΔMΞCØDΞR', thumbnailUrl: 'https://i.ibb.co/WtpYwmX/C.jpg', sourceUrl: 'https://whatsapp.com/channel/0029Vavz0e6E50Ugp30Z6z0W' }}}
    
} 
export default handler
