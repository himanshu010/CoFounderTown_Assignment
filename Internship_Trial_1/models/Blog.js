 const mongoose=require('mongoose');
const DB = 'mongodb+srv://admin:mansi24jain@cluster0-lylxh.mongodb.net/test?retryWrites=true&w=majority';
mongoose
	.connect(DB, {
		useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
	})
	.then(_conn => {
		console.log('Connected to DB');
    });
    
const schema=mongoose.Schema;
const blogSchema=new schema({
    topic:{
        type: String
    },
    description:{
        type: String
    },
    logID:{
        type: String
    },
    created:{
        type: String
    }
},{timestamps: true})

const Blog=mongoose.model('Blog',blogSchema)
module.exports=Blog