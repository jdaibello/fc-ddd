import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {
	it("should create a product type A", () => {
		const product = ProductFactory.create("A", "Product A", 1);

		expect(product.id).toBeDefined();
		expect(product.name).toBe("Product A");
		expect(product.price).toBe(1);
		expect(product.constructor.name).toBe("Product");
	});

	it("should create a product type A", () => {
		const product = ProductFactory.create("B", "Product B", 1);

		expect(product.id).toBeDefined();
		expect(product.name).toBe("Product B");
		expect(product.price).toBe(2);
		expect(product.constructor.name).toBe("ProductB");
	});

	it("should throw an error when creating an invalid product type", () => {
		expect(() => ProductFactory.create("C", "Product C", 1)).toThrow("Invalid product type");
	});
});