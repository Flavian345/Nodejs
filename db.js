const mongoose = require('mongoose')



const lidhuMeDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex:true
        })
        console.log("Database u lidh");



    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}




module.exports = lidhuMeDb