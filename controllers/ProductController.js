import ProductModel from '../models/Product.js';

export const getAll = async (req, res) => {
	try {
		const products = await ProductModel.find();
		res.json(products);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Failed to receive goods',
		});
	}
};

export const removeProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		ProductModel.findOneAndDelete(
			{
				_id: productId,
			},
			(error, doc) => {
				if (error) {
					console.log(error);
					res.status(500).json({
						message: 'Failed to delete item',
					});
				}

				if (!doc) {
					return res.status(404).json({
						message: 'product not found',
					});
				}

				res.json({
					success: true,
				});
			}
		);
	} catch (error) {}
};

export const createProduct = async (req, res) => {
	try {
		const doc = new ProductModel({
			productName: req.body.productName,
			model: req.body.model,
			description: req.body.description,
			price: req.body.price,
			userId: req.userId,
			imageUrl: req.body.imageUrl,
		});

		const product = await doc.save();

		res.json(product);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Failed to create product',
		});
	}
};
