var GraphQLSchema = require("graphql").GraphQLSchema;
// var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
//reuired field like in mongoose
var GraphQLNonNull = require("graphql").GraphQLNonNull;
//objectId
var GraphQLID = require("graphql").GraphQLID;
//string
var GraphQLString = require("graphql").GraphQLString;
//int
var GraphQLInt = require("graphql").GraphQLInt;
//date
var GraphQLDate = require("graphql-date");
var ProjectModel = require("../mongoosemodel/Project");

//schema similar to mongoose
var projectType = new GraphQLObjectType({
  name: "project",
  fields: function() {
    return {
      _id: {
        type: GraphQLString
      },
      gitUrl: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      author: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      published_year: {
        type: GraphQLInt
      },
      publisher: {
        type: GraphQLString
      },
      updated_date: {
        type: GraphQLDate
      }
    };
  }
});
//

//query to get any values
var queryType = new GraphQLObjectType({
  name: "Query",
  fields: function() {
    return {
      projects: {
        type: new GraphQLList(projectType),
        //resolvers same as method() in vue js were we write queries
        resolve: function() {
          console.log("am here in query ");
          const projects = ProjectModel.find().exec();
          if (!projects) {
            throw new Error("Error");
          }
          return projects;
        }
      },
      project: {
        type: projectType,
        args: {
          id: {
            name: "_id",
            type: GraphQLString
          }
        },
        resolve: function(root, params) {
          const projectDetails = ProjectModel.findById(params.id).exec();
          if (!projectDetails) {
            throw new Error("Error");
          }
          return projectDetails;
        }
      }
    };
  }
});

//mutation is like were we update or perform any operations on table
var mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function() {
    return {
      //addProject like name of our function
      addProject: {
        type: projectType,
        args: {
          author: {
            type: new GraphQLNonNull(GraphQLString)
          },
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          gitUrl: {
            type: new GraphQLNonNull(GraphQLString)
          },
          description: {
            type: new GraphQLNonNull(GraphQLString)
          },
          published_year: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          publisher: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function(root, params) {
          const projectModel = new ProjectModel(params);
          const newProject = projectModel.save();
          if (!newProject) {
            throw new Error("Error");
          }
          return newProject;
        }
      },
      //updateProject like name of our function
      updateProject: {
        type: projectType, //name of graphQl schema
        args: {
          id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLString)
          },
          author: {
            type: GraphQLString
          },
          name: {
            type: GraphQLString
          },
          gitUrl: {
            type: GraphQLString
          },
          description: {
            type: GraphQLString
          },
          published_year: {
            type: GraphQLInt
          },
          publisher: {
            type: GraphQLString
          }
        },
        resolve(root, params) {
          ProjectModel.updateOne(
            { _id: params.id },
            params
          ).exec((err,data)=>{
            if(err){
              return err
            }else{
              return data
            }
          });          
        }
      },
      removeProject: {
        type: projectType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          const remProject = ProjectModel.findByIdAndRemove(params.id).exec();
          if (!remProject) {
            throw new Error("Error");
          }
          return remProject;
        }
      }
    };
  }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
