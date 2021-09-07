const { generateFakeData } = require('./data')

const userList = generateFakeData()

const getUserList = args => {
  if (args.offset && args.limit) {
    return userList.slice(args.offset, args.offset + args.limit)
  } else if (args.name) {
    return userList.filter(user => {
      const name = user.name.toLowerCase()
      return name.includes(args.name.toLowerCase())
    })
  } else {
    return userList
  }
}

module.exports = {
  Query: {
    users: (root, args) => getUserList(args),
  },
}
