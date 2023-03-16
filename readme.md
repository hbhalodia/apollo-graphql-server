## Apollo Server Docs

1. To start with need to import `Apollo Server` and `startStandaloneServer`.
2. Passing an ApolloServer instance to the `startStandaloneServer` function:
   1. creates an Express app
   2. installs your ApolloServer instance as middleware
   3. prepares your app to handle incoming requests
3. Add typedefs, these are the schemas which we need to add for our server to work on with.
4. Define the resolver
   1. Resolvers tell apollo server how to fetch data associated with particular type. Here we have to connect with main source which fetches the data.
5. To create an Apollo server, new ApolloServer and pass typedefs and resolvers.


## Graphql Schema basics

1. It describes the shape of our data.
2. Schema is heirarchy of types and fields that are populated from back-end data stores.
3. GraphQl uses `SDL` - `Schema Defination Language` as an example,
   1. The below schema has 2 types, `Book` and `Author`.
   2. `Book` type has 2 fields, `title` with type `string` and `author` with type `Authot Object`
	```
	type Book {
		title: String
		author: Author
	}

	type Author {
		name: String! - Cannot be null or cannot return null
		books: [Book] - A list of books.
	}
	```
4. To make it non nullable we can use `!` which ensures that field value cannot be null.
5. There are multiple supported types
   1. Scalar Types - Similar to primitive data types
      1. Int, Float, String, Boolean, ID(string but not human readable.)
   2. Object Types - Collections of fields, each with own type.
   3. Query Type - This is special type which defines all top-level entries for read operations.
   4. Mutation Type - Similar to Query type, but it defines the entry point for write operations.
   5. Enum Types - Useful when user must pick a value from defined values.
6. Design your schema based on how data is used, not based on how it's stored.
7. Naming Conventions -
   1. Field names should use camelCase.
   2. Type names should use PascalCase.
   3. Enum names should use PascalCase Enum values should use ALL_CAPS, because they are similar to constants.

## Union and Interfaces.

1. These are abstract GraphQl types and enable a schema to return one of its types.
2. `union Media = Book | Movie`
```
	type Query {
		allMedia: [Media] # This list can include both Book and Movie objects
	}
```
3. All unions types must be of object types.
4. Interface type specifies list of fields that multiple object types can include.

## Custom Scalars
1. We can add custom scalar as `scalar MyCustomScalar` to graphql.
2. We need to define the custom scalar logic for this type and we can use instance of `GraphQLScalarType` class.
3. Custom Scalar has 3 main methods to look on,
   1. serialize - it converts scalar's backend representation to JSON-compatible.
   2. parseValue - The parseValue method converts the scalar's JSON value to its back-end representation before it's added to a resolver's args.
   3. parseLiteral - When query string includes as hard-coded argument value, that value is part of document's abstract syntax tree.

## Directives

1. It decorates the part of graphql schema and types, can read this directives and can do operation based on custom logics or conditions.
2. `Directives` can be added to schema using `@` character.
3. Default directives available in GraphQl are,
   1. `@depreacted(reason: String)` - Schema defination field, argument or enum value as deprectaed.
   2. `@skip(if: Boolean)` - If true, `decorated` field or fragment would not be resolved by graphql server.
   3. `@include(if: Boolean) - If true, `decorated` field or fragment would be resolved by graphql server.
4. Custom Directives - We can define custom directive that can decorate other parts of the schema such as,
   1. `directive @uppercase on FIELD_DEFINATION` - This would be added on the fileds.

## Resolvers

1. A resolver is a function that's responsible for populating the data for a single field in your schema.
2. It can populate data by fetching from back-end dB or apis.
3. Resolver can optinally takes 4 arguments,
   1. parent - The return value of the resolver of this fileds parent.
   2. args - An object contain all arguments provided for this fields
   3. contextValue - An object shared across all resolvers that are executing for a particular operation.
   4. info - Contains information about the operation's execution state, including the field name, the path to the field from the root, and more.

## Resolver Chains

1. Whenever query ask for a field that return the object type, the query then further asks for at least one field of that object type.
2. A query always bottoms Out on the fields that return a scalar or enum.
3. Because of this rule, apollo server might resolve objects field and in turn it also returns object then again for that object it resolves based on the schema we have created, object-field pattern may continue to a arbitary depth, called resolver chain.

## Context and Context Value

1. The context function should always be asynchronus and return an object.
2. Our server call context function once for every request enable us to customize our context value.
3. Context is something we get in resolver as the optional 3rd argument while resolving the types.

## Error Handling.

1. To help debugging apollo server provides `ApolloServerErrorCode` enum, which we can use to check the error type.
2. Apollo server have variety of error codes enabled and also we can create own custom errors and there codes.
3. We can create the custom errors using `graphql` and `GraphQLError` Class.

## Masking and Logging errors

1. `formatError` Hooks run on each error before it get's passed to the client. It has 2 argument, formattedError and OriginalError.