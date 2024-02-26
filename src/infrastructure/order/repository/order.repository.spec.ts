import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../customer/model/customer.model";
import OrderModel from "../model/order.model";
import OrderItemModel from "../model/order_item.model";
import ProductModel from "../../product/model/product.model";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../customer/repository/customer.repository";
import ProductRepository from "../../product/repository/product.repository";
import Product from "../../../domain/product/entity/product";
import OrderItem from "../../../domain/checkout/entity/order_item";
import Order from "../../../domain/checkout/entity/order";
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

	it("should update an order", async () => {
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

		orderItem.changeQuantity(3);
		await orderRepository.update(order);
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

	it("should find an order by ID", async () => {
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

		const orderResult = await orderRepository.findById(order.id);

		expect(order).toStrictEqual(orderResult);
	});

	it("should find all orders", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("1", "Customer 1");
		const address = new Address("Street 1", 1, "12345", "City 1");
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product1 = new Product("1", "Product 1", 10);
		const product2 = new Product("2", "Product 2", 15);
		await productRepository.create(product1);
		await productRepository.create(product2);

		const orderRepository = new OrderRepository();
		const orderItem1 = new OrderItem("1", product1.id, product1.name, product1.price, 2);
		const orderItem2 = new OrderItem("2", product2.id, product2.name, product2.price, 1);
		const order1 = new Order("1", customer.id, [orderItem1]);
		const order2 = new Order("2", customer.id, [orderItem2]);
		await orderRepository.create(order1);
		await orderRepository.create(order2);

		const orders = await orderRepository.findAll();

		expect(orders).toHaveLength(2);
		expect(orders).toContainEqual(order1);
		expect(orders).toContainEqual(order2);
	});
});