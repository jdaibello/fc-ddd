import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order_item.model";
import ProductModel from "../db/sequelize/model/product.model";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerRepository from "./customer.repository";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should create a new order", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("1", "Customer 1");
		const address = new Address("Street 1", 1, "12345", "City 1");
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product("1", "Product 1", 10);
		await productRepository.create(product);

		const orderRepository = new OrderRepository();
		const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);
		const order = new Order("1", customer.id, [orderItem]);
		await orderRepository.create(order);

		const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });

		expect(orderModel.toJSON()).toStrictEqual({
			id: "1",
			customer_id: "1",
			total: order.total(),
			items: [
				{
					id: orderItem.id,
					order_id: order.id,
					product_id: orderItem.productId,
					name: orderItem.name,
					price: orderItem.price,
					quantity: orderItem.quantity
				}
			]
		});
	});
});