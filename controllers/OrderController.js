import OrderModel from '../models/Order.js';

export const createOrder = async (req, res) => {
	try {
		const doc = new OrderModel({
			items: req.body.items,
			totalPrice: req.body.totalPrice,
			userId: req.userId,
		});

		const order = await doc.save();

		res.json(order);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Failed to create orders',
		});
	}
};

export const getOrdersAll = async (req, res) => {
	try {
		const orders = await OrderModel.find({ userId: req.userId });
		res.json(orders);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Failed to receive orders',
		});
	}
};

export const getOneOrder = async (req, res) => {
	const order = await OrderModel.findById(req.params.id);
	if (order) {
		res.send(order);
	} else {
		res.status(404).send({ message: 'Order Not Found' });
	}
};
