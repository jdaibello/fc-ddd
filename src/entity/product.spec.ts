import Product from "./product";

describe("Product unit tests", () => {
	it("should throw error when ID is empty", () => {
		expect(() => new Product("", "Product 1", 100)).toThrow("ID is required");
	});

	it("should throw error when name is empty", () => {
		expect(() => new Product("123", "", 100)).toThrow("Name is required");
	});

	it("should throw error when price is less than 0", () => {
		expect(() => new Product("123", "Name", -1)).toThrow(
			"Price must be greater than 0"
		);
	});

	it("should change name", () => {
		const product = new Product("123", "Product 1", 100);

		product.changeName("Product 2");

		expect(product.name).toBe("Product 2");
	});

	it("should change price", () => {
		const product = new Product("123", "Product 1", 100);

		product.changePrice(150);

		expect(product.price).toBe(150);
	});
});
