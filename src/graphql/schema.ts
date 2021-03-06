const sampleItems = [
    {name: 'Apple'},
    {name: 'Banana'},
    {name: 'Orange'},
    {name: 'Melon'},
  ]
  
export const typeDefs = `
type Query {
    items: [Item!]!
}
type Item {
    name: String!
}
`

export const resolvers = {
    Query: {
        items: () => sampleItems,
    },
}