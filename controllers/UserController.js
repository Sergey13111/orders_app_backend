import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
	try {
		const password = req.body.password;
		const salt = await bcrypt.genSalt(8);
		const hash = await bcrypt.hash(password, salt);

		const doc = new UserModel({
			email: req.body.email,
			passwordHash: hash,
		});

		const user = await doc.save();

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '24h',
			}
		);

		const { passwordHash, ...userData } = user._doc;
		res.json({
			...userData,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Failed to register',
		});
	}
};

export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email });

		if (!user) {
			return res.status(404).json({
				message: 'Failed to login',
			});
		}

		const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

		if (!isValidPassword) {
			return res.status(400).json({
				message: 'Incorrect login or password',
			});
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '24h',
			}
		);

		const { passwordHash, ...userData } = user._doc;
		res.json({
			...userData,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Failed to login',
		});
	}
};

export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);

		if (!user) {
			return res.status(404).json({
				message: 'Failed to login',
			});
		}

		const { passwordHash, ...userData } = user._doc;
		res.json(userData);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'No access',
		});
	}
};
