// import { clients, projects } from "../data/data.js";
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } from "graphql";
// Models mongoose
import Client from "../models/Client.js";
import Project from "../models/Project.js";

// const Clients = clients()
// const Projects = projects()

// client types
const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
})

// project types
const ProjetType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId)
            }
        }
    })
})

// Query actions
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // project query
        projects: {
            type: new GraphQLList(ProjetType),
            resolve(parent, args) {
                return Project.find({})
            }
        },
        project: {
            type: ProjetType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id)
            }
        },

        // client query
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find({})
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id)
            }
        }
    }
})


// Mutations
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // add client
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                
                const client = Client.create({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })

                return client
            }
        },
        // delete a client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {

                // Delete on the cascade
                Project.deleteMany({ clientId: args.id })
                    .then((result) => {
                        console.log(`${result.deletedCount} projects deleted.`);
                    })
                    .catch((error) => {
                        console.error(`Error deleting projects: ${error}`);
                    });

                return Client.findByIdAndRemove(args.id)
            }
        },

        // Add new project mutation
        addProject: {
            type: ProjetType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: { 
                    type: new GraphQLEnumType({
                        name: "ProjectStatus",
                        values: {
                            "new": { value: "Not Started"},
                            "progress": { value: "In progress" },
                            "completed": { value: "Completed"}
                        }
                    }),
                    defaultValue: "Not Started"
                },
                clientId: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const projet = Project.create({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                })
                return projet
            }
        },
        // delete a project
        deleteProject: {
            type: ProjetType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) } 
            },
            resolve(parent, args) {
                return Project.findByIdAndRemove(args.id)
            }
        },
        // update a project
        updateProject: {
            type: ProjetType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: { 
                    type: new GraphQLEnumType({
                        name: "ProjectStatusUpdate",
                        values: {
                            "new": { value: "Not Started"},
                            "progress": { value: "In progress" },
                            "completed": { value: "Completed"}
                        }
                    }),
                },
            },
            resolve(parent, args) {
                const projetUpdate = Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        }
                    },
                    {
                        new: true,
                    }
                )
                return projetUpdate
            }
        }
    }
})



const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

export default schema