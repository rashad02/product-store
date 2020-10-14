
const Category = require('../models/category');
const Product = require('../models/product');

const {
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLFloat, 
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema} = require('graphql');
const category = require('../models/category');
const { connection } = require('mongoose');


const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
    })
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        productName: {
            type: GraphQLString
        },
        brandName: {
            type: GraphQLString
        },
        productDetails: {
            type: GraphQLString
        },
        productImage: {
            type: GraphQLString
        },
        productPrice: {
            type: GraphQLFloat
        },
        productCategory: {
            type:CategoryType,
            resolve(parent, args) {
                return Category.findById(
                   parent.productCategory
                )
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        category: {
            type: CategoryType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Category.findById(args.id);
            }
        },
        product: {
            type: ProductType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Product.findById(args.id);
            }
        },
        category: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args) {
                return Category.find({});
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCategory: {
            type: CategoryType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve(parent, args) {
                let category = new Category({
                    name: args.name,
                });
                return category.save();
            }
        },
        updateCategory: {
            type: CategoryType,
            args: {
                id:{
                    type: GraphQLID
                }, 
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve(parent, args) {
                const {id, ...otherProps} = args;
        
                return Category.findByIdAndUpdate(id, {$set: otherProps}, {new: true}).catch(error => console.error(error));
            
            }
        },
        deleteCategory: {
            type: CategoryType,
            args: {
                id:{
                    type: GraphQLID
                },
            },
            resolve(parent, args) {
                const {id} = args;

                return Category.findByIdAndDelete(id).then(res => res.remove()).then(() => `${id} Successfully deleted!`)
                .catch(error => console.error(error));
            }
        },
        addProduct: {
            type: ProductType,
            args: {
                productName: {
                    type: GraphQLString
                },
                brandName: {
                    type: GraphQLString
                },
                productDetails: {
                    type: GraphQLString
                },
                productImage: {
                    type: GraphQLString
                },
                productPrice: {
                    type: GraphQLFloat
                },
                productCategory: {
                    type: GraphQLString
                },
            },
            resolve(parent, args) {
                let product = new Product({
                    productName: args.productName,
                    brandName: args.brandName,
                    productDetails: args.productDetails,
                    productImage: args.productImage,
                    productPrice: args.productPrice,
                    productCategory: args.productCategory
                });
                return product.save();
            }
        },
        updateProduct: {
            type: ProductType,
            args: {
                id: {
                    type: GraphQLID
                },
                productName: {
                    type: GraphQLString
                },
                brandName: {
                    type: GraphQLString
                },
                productDetails: {
                    type: GraphQLString
                },
                productImage: {
                    type: GraphQLString
                },
                productPrice: {
                    type: GraphQLFloat
                },
                productCategory: {
                    type: GraphQLString
                },
            },
            resolve(parent, args) {
                const {id, ...otherProps} = args;
        
                return Product.findByIdAndUpdate(id, {$set: otherProps}, {new: true}).catch(error => console.error(error));
            }
        },
        deleteProduct: {
            type: ProductType,
            args: {
                id: {
                    type: GraphQLID
                },
            },
            resolve(parent, args) {
                let {id} = args;

                return Product.findByIdAndDelete(id).then(res => res.remove()).then(() => `${id} Successfully deleted!`)
                    .catch(error => console.error(error));
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});