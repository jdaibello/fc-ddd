import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
	it("should throw error when ID is empty", () => {
		expect(() => new Order("", "123", [])).toThrow("ID is required");
	});

	it("should throw error when customerID is empty", () => {
		expect(() => new Order("123", "", [])).toThrow("CustomerId is required");
	});

	it("should throw error when items is empty", () => {
		expect(() => new Order("123", "123", [])).toThrow("Items are required");
	});

	it("should calculate total", () => {
		const item1 = new OrderItem("i1", "p1", "Item 1", 100, 2);
		const item2 = new OrderItem("i2", "p2", "Item 2", 200, 2);
		const order1 = new Order("o1", "c1", [item1]);
		const order2 = new Order("o2", "c2", [item1, item2]);

		const totalOrder1 = order1.total();
		const totalOrder2 = order2.total();

		expect(totalOrder1).toBe(200);
		expect(totalOrder2).toBe(600);
	});

	it("should throw error if item quantity is less or equal 0", () => {
		expect(() => {
			const item = new OrderItem("i1", "p1", "Item 1", 100, 0);
			const order = new Order("o1", "c1", [item]);
		}).toThrow("Quantity must be greater than 0");
	});
});
