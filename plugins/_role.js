const roles = {
  /*
  'Role Name': <Minimal Level To Obtain this Role>
  */
  'Beginner': 0,
  'Kitten Town': 10,
  'Black Woods': 20,
  'Farmount': 30,
  'Rosenvale': 40,
  'Amberhill': 50,
  'Master Fap': 60,
  'Master Woods': 80,
  'Legend': 90
}

module.exports = {
  before(m) {
    let user = global.db.data.users[m.sender]
    let level = user.level
    let role = (Object.entries(roles).sort((a, b) => b[1] - a[1]).find(([,minLevel]) => level >= minLevel) || Object.entries(roles)[0])[0]
    user.role = role
    return true
  }
}
