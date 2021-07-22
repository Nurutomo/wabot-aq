let handler = m => m

handler.before = function (m) {
  let user = global.db.data.users[m.sender]
        let role = (user.level <= 10) ? 'Beginner'
          : ((user.level >= 10) && (user.level <= 20)) ? 'Commander Elite'
          : ((user.level >= 20) && (user.level <= 30)) ? 'The Commander Hero'
          : ((user.level >= 30) && (user.level <= 40)) ? 'The Commander Elite Hero'
          : ((user.level >= 40) && (user.level <= 50)) ? 'The Commander Elite Super Strong Hero'
          : ((user.level >= 50) && (user.level <= 60)) ? 'The Commander Elite Super Strong Shadow Hero'
          : ((user.level >= 60) && (user.level <= 70)) ? 'The Commander Legends Shadow Hero'
          : ((user.level >= 70) && (user.level <= 80)) ? 'The Commander Legends Shadow Hero'
          : 'Legends'
  user.role = role
  return true
}

module.exports = handler
