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
const userSchema=new schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    username:{
        type: String
    },
    age:{
        type: Number
    },
    password:{
        type: String,
        //required: true,
    },
    createdby:{
        type: String
    }
},{timestamps: true})

const User=mongoose.model('User',userSchema)
module.exports=User