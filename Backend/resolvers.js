import { users } from './fakedb.js'
import { randomBytes } from 'crypto'

const resolvers = {
    Query: {
        users: () => users,
        user: (_, { id }) => users.find(user => user.id == id),
    },
    Mutation: {
        signupUser: (_, { userNew }) => {
            const id = randomBytes(5).toString("hex")
            users.push({
                id,
                ...userNew
            })
            return users.find(user => user.id == id)
        }
    }
}

export default resolvers