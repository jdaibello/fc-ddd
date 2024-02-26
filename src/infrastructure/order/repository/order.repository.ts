import Order from "../../../domain/checkout/entity/order";
import OrderItem from "../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../domain/checkout/repository/order.repository.interface";
import OrderModel from "../model/order.model";
import OrderItemModel from "../model/order_item.model";

export default class OrderRepository implements OrderRepositoryInterface {
	async create(entity: Order): Promise<void> {
		await OrderModel.create(
			{
				id: entity.id,
				customer_id: entity.customerId,
				total: entity.total(),
				items: entity.items.map((item) => ({
					id: item.id,
					product_id: item.productId,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
				})),
			},
			{
				include: [{ model: OrderItemModel }],
			}
		);
	}

	async update(entity: Order): Promise<void> {
		const order = await OrderModel.findByPk(entity.id, {
			include: ["items"],
		});

		await order
			.update({
				customer_id: entity.customerId,
				total: entity.total(),
			})
			.then(() => {
				OrderItemModel.bulkCreate(
					entity.items.map((item) => ({
						id: item.id,
						order_id: entity.id,
						product_id: item.productId,
						name: item.name,
						price: item.price,
						quantity: item.quantity,
					})),
					{
						updateOnDuplicate: ["name", "price", "quantity", "product_id"],
					}
				);
			});
	}

	async findById(id: string): Promise<Order> {
		let orderModel;

		try {
			orderModel = await OrderModel.findOne({ where: { id }, include: ["items"], rejectOnEmpty: true });

			return new Order(
				orderModel.id,
				orderModel.customer_id,
				orderModel.items.map((item) =>
					new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity)
				)
			);
		} catch (error) {
			throw new Error("Order not found");
		}
	}

	async findAll(): Promise<Order[]> {
		const orderModels = await OrderModel.findAll({
			include: ["items"],
		});

		return orderModels.map(
			(order) =>
				new Order(
					order.id,
					order.customer_id,
					order.items.map(
						(item) =>
							new OrderItem(
								item.id,
								item.product_id,
								item.name,
								item.price,
								item.quantity
							)
					)
				)
		);
	}
}
