let handler = m => m

handler.before = function (m) {
  let user = global.db.data.users[m.sender]
        let role = (user.level <= 10) ? 'Beginner'
          : ((user.level >= 10) && (user.level <= 20)) ? 'Kittel Town'
          : ((user.level >= 20) && (user.level <= 30)) ? 'Black Woods'
          : ((user.level >= 30) && (user.level <= 40)) ? 'Farmount'
          : ((user.level >= 40) && (user.level <= 50)) ? 'Rosenvale'
          : ((user.level >= 50) && (user.level <= 60)) ? 'Amberhill'
          : ((user.level >= 60) && (user.level <= 70)) ? 'Master Fap'
          : ((user.level >= 70) && (user.level <= 80)) ? 'Master Woods'
          : 'Legend'
  user.role = role
  return true
}

module.exports = handler
