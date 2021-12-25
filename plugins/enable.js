let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let setting = global.db.data.settings[conn.user.jid]
  let type = (args[0] || '').toLowerCase()
  let isAll = false
  let isUser = false
  let gc = [
    'welcome',
    'detect',
    'antilink',
    'antisticker',
  ]
  let ch = [
    'delete',
    'antidelete',
    'autodelvn',
    'getmsg',
    'simi',
    'document',
    'viewonce',
    'autolevelup'
  ]
  let o = [
    'public',
    'mycontact',
    'restrict',
    'nyimak',
    'autoread',
    'anticall',
    'pconly',
    'gconly',
    'jadibot'
  ]
  switch (type) {
    // Grup
    case 'welcome':
      if (!m.isGroup) {
        if (!isOwner) return dfail('group', m, conn)
      } else if (!isAdmin) return dfail('admin', m, conn)
      chat.welcome = isEnable
      break
    case 'detect':
      if (!m.isGroup) {
        if (!isOwner) return dfail('group', m, conn)
      } else if (!isAdmin) return dfail('admin', m, conn)
      chat.detect = isEnable
      break
    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
      chat.antiLink = isEnable
      break
    case 'antisticker':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
      chat.antiSticker = isEnable
      break
    // Chat
    case 'delete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
      chat.delete = isEnable
      break
    case 'antidelete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
      chat.delete = !isEnable
      break
    case 'autodelvn':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
      chat.autodelvn = isEnable
      break
    case 'getmsg':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
      chat.getmsg = isEnable
      break
    case 'simi':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
      chat.simi = isEnable
      break
    case 'document':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
      chat.useDocument = isEnable
      break
    case 'viewonce':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
      }
      chat.viewonce = isEnable
      break
    // Owner
    case 'public':
      isAll = true
      if (!isOwner) return dfail('owner', m, conn)
      setting.self = !isEnable
      break
    case 'mycontact':
    case 'mycontacts':
    case 'whitelistcontact':
    case 'whitelistcontacts':
    case 'whitelistmycontact':
    case 'whitelistmycontacts':
      if (!isOwner) return dfail('owner', m, conn)
      conn.callWhitelistMode = isEnable
      break
    case 'restrict':
      isAll = true
      if (!isOwner) return dfail('owner', m, conn)
      setting.restrict = isEnable
      break
    case 'nyimak':
      isAll = true
      if (!isOwner) return dfail('owner', m, conn)
      setting.nyimak = isEnable
      break
    case 'autoread':
    case 'anticall':
      isAll = true
      if (!isOwner) return dfail('owner', m, conn)
      setting.anticall = isEnable
      break
    case 'pconly':
    case 'privateonly':
      isAll = true
      if (!isOwner) return dfail('owner', m, conn)
      setting.pconly = isEnable
      break
    case 'gconly':
    case 'grouponly':
    case 'jadibot':
      if (!isOwner) return dfail('owner', m, conn)
      setting.jadibot = isEnable
      break

    case 'autolevelup':
      isUser = true
      user.autolevelup = isEnable
      break
    default:
      if (!/[01]/.test(command)) throw `
╭─「 Opsi 」${isOwner ? '\n' + o.map(v => '│ ' + v).join`\n` : ''}${m.isGroup ? '\n' + gc.map(v => '│ ' + v).join`\n` : ''}
${ch.map(v => '│ ' + v).join`\n`}
╰────

Contoh:
${usedPrefix}enable welcome
${usedPrefix}disable welcome
`.trim()
      throw false
  }
  m.reply(`
*${type}* berhasil *di${isEnable ? 'nyala' : 'mati'}kan* ${isAll ? 'untuk bot ini' : isUser ? '' : 'untuk chat ini'}
`.trim())
}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

module.exports = handler