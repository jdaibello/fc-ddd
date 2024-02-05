import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import Product from "../entity/product";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
	it("Should calculate the total price of all orders", () => {
		const item1 = new OrderItem("i1", "p1", "Item 1", 100, 1);
		const item2 = new OrderItem("i2", "p2", "Item 2", 200, 2);

		const order1 = new Order("o1", "c1", [item1]);
		const order2 = new Order("o2", "c1", [item2]);

		const total = OrderService.total([order1, order2]);

		expect(total).toBe(500);
	});
});