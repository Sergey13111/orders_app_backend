import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
	{
		productName: {
			type: String,
			required: true,
		},
		model: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
		// userId: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'User',
		// 	required: true,
		// },
		imageUrl: String,
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Product', ProductSchema);
