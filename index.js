import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// // A schema is a collection of type definitions (hence "typeDefs")
// // that together define the "shape" of queries that are executed against
// // your data.
// const typeDefs = `#graphql
// 	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

// 	# This "Book" type defines the queryable fields for every book in our data source.
// 	type Book {
// 		title: String
// 		author: Author
// 	}

// 	type Author {
// 		name: String
// 		books: [Book]
// 	}

// 	type Mutation {
// 		addBook(title: String, author: String): Book
// 	}

// 	# The "Query" type is special: it lists all of the available queries that
// 	# clients can execute, along with the return type for each. In this
// 	# case, the "books" query returns an array of zero or more Books (defined above).
// 	type Query {
// 		books: [Book]
// 		authors: [Author]
// 	}
// `;

// const books = [
// 	{
// 		title: 'The Awakening',
// 		author: 'Kate Chopin',
// 	},
// 	{
// 		title: 'City of Glass',
// 		author: 'Paul Auster',
// 	},
// ];

// const authors = [
// 	{
// 		name: 'Kate Chopin',
// 		books: [
// 			{
// 				'title': 'The Awakening',
// 			}
// 		]
// 	},
// 	{
// 		name: 'Paul Auster',
// 		books: [
// 			{
// 				'title': 'City of Glass',
// 			}
// 		]
// 	}
// ];

// const dateScalar = new GraphQLScalarType({
// 	name: 'Date',
// 	description: 'Date custom scalar type',
// 	serialize(value) {
// 		if (value instanceof Date) {
// 			return value.getTime(); // Convert outgoing Date to integer for JSON
// 		}
// 		throw Error('GraphQL Date Scalar serializer expected a `Date` object');
// 	},
// 	parseValue(value) {
// 		if (typeof value === 'number') {
// 			return new Date(value); // Convert incoming integer to Date
// 		}
// 		throw new Error('GraphQL Date Scalar parser expected a `number`');
// 	},
// 	parseLiteral(ast) {
// 		if (ast.kind === Kind.INT) {
// 			// Convert hard-coded AST string to integer and then to Date
// 			return new Date(parseInt(ast.value, 10));
// 		}
// 		// Invalid hard-coded value (not an integer)
// 		return null;
// 	},
// });

// const resolvers = {
// 	Query: {
// 		books: () => books,
// 		authors: () => authors
// 	},
// };

// // The ApolloServer constructor requires two parameters: your schema
// // definition and your set of resolvers.
// const server = new ApolloServer({
// 	typeDefs,
// 	resolvers,
// });

// // Passing an ApolloServer instance to the `startStandaloneServer` function:
// //  1. creates an Express app
// //  2. installs your ApolloServer instance as middleware
// //  3. prepares your app to handle incoming requests
// const { url } = await startStandaloneServer(server, {
// 	listen: { port: 4000 },
// });

// console.log(`🚀  Server ready at: ${url}`);

import { GraphQLScalarType, Kind, GraphQLError } from 'graphql';

// Basic schema
// const typeDefs = `#graphql
// 	scalar Odd

// 	scalar Even

// 	type Query {
// 		# Echoes the provided odd integer
// 		echoOdd(odd: Odd!): Odd!
// 		# Echoes the provided even integer
// 		echoEven(even: Even!): Even!
// 	}
// `;

// // Validation function for checking "oddness"
// function oddValue(value) {
// 	if (typeof value === 'number' && Number.isInteger(value) && value % 2 !== 0) {
// 		return value;
// 	}
// 	throw new GraphQLError('Provided value is not an odd integer', {
// 		extensions: { code: 'BAD_USER_INPUT' },
// 	});
// }

// // Validation function for checking "eveness"
// function evenValue(value) {
// 	if (typeof value === 'number' && Number.isInteger(value) && value % 2 === 0) {
// 		return value;
// 	}
// 	throw new GraphQLError('Provided value is not an integer', {
// 		extensions: { code: 'BAD_USER_INPUT' },
// 	});
// }

// const resolvers = {
// 	Odd: new GraphQLScalarType({
// 		name: 'Odd',
// 		description: 'Odd custom scalar type',
// 		parseValue: oddValue,
// 		serialize: oddValue,
// 		parseLiteral(ast) {
// 			if (ast.kind === Kind.INT) {
// 				return oddValue(parseInt(ast.value, 10));
// 			}
// 			throw new GraphQLError('Provided value is not an odd integer', {
// 				extensions: { code: 'BAD_USER_INPUT' },
// 			});
// 		},
// 	}),
// 	Even: new GraphQLScalarType({
// 		name: 'Even',
// 		description: 'Even custom scalar type',
// 		parseValue: evenValue,
// 		serialize: evenValue,
// 		parseLiteral(ast) {
// 			if (ast.kind === Kind.INT) {
// 				return evenValue(parseInt(ast.value, 10));
// 			}
// 			throw new GraphQLError('Provided value is not an even integer', {
// 				extensions: { code: 'BAD_USER_INPUT' },
// 			});
// 		}
// 	}),
// 	Query: {
// 		echoOdd(_, { odd }) {
// 			return odd;
// 		},
// 		echoEven(_, { even }) {
// 			return even;
// 		}
// 	},
// };

// const typeDefs = `#graphql
// 	type Query {
// 		numberSix: Int!
// 		numberSeven: Int!
// 	}
// `;

// const resolvers = {
// 	Query: {
// 		numberSix: () => {
// 			return 6;
// 		},
// 		numberSeven: () => {
// 			return 7;
// 		}
// 	}
// }

// const users = [
// 	{
// 		id: '1',
// 		name: 'Hit Bhalodia',
// 	},
// 	{
// 		id: '2',
// 		name: 'Manan Bhalodia',
// 	},
// ];

// const typeDefs = `#graphql
// 	type User {
// 		id: ID!
// 		name: String
// 	}

// 	type Query {
// 		user(id: ID!): User
// 	}
// `;

// const resolvers = {
// 	Query: {
// 		user(parent, args, contextValue, info) {
// 			return users.find((user) => user.id === args.id);
// 		}
// 	}
// }

// Example of resolver chains.

const typeDefs = `
	#graphql

	type Library {
		branch: String!
		books: [Book!]
	}

	# A book has a title and author
	type Book {
		title: String!
		author: Author!
	}

	# An author has a name
	type Author {
		name: String!
	}

	type Query {
		libraries: [Library]
	}
`;

const libraries = [
	{
		branch: 'downtown',
	},
	{
		branch: 'riverside',
	},
];

const books = [
	{
		title: 'The Awakening',
		author: 'Kate Chopin',
		branch: 'riverside',
	},
	{
		title: 'City of Glass',
		author: 'Paul Auster',
		branch: 'downtown',
	},
];

// Resolver map.
const resolvers = {
	Query: {
		libraries() {
			return libraries;
		},
	},
	Library: {
		books(parent) {
			return books.filter((book) => book.branch === parent.branch);
		},
	},
	Book: {
		author(parent) {
			return { name: parent.author };
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const { url } = await startStandaloneServer(server, {
	listen: { port: 4001 },
});

console.log(`🚀 Server listening at: ${url}`);
