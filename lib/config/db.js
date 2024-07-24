import mongoose from "mongoose"

export const ConnectDB = async () => {
	try {
		await mongoose.connect(`mongodb+srv://anselumjuju:${process.env.MONGODB_PW}@cluster0.u4qyfvg.mongodb.net/todo`)
	} catch (e) {
		console.info('MongoDB connection failed', e)
	}
}