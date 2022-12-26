import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		items: [
			{
				productName: { type: String, required: true },
				model: { type: String, required: true },
				price: { type: String, required: true },
				count: { type: Number, required: true },
			},
		],
		totalPrice: { type: Number, required: true },
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
