import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
	it("should throw error when ID is empty", () => {
		expect(() => new Customer("", "João")).toThrow("ID is required");
	});

	it("should throw error when name is empty", () => {
		expect(() => new Customer("123", "")).toThrow("Name is required");
	});

	it("should change name", () => {
		// Arrange
		const customer = new Customer("123", "John");

		// Act
		customer.changeName("João");

		// Assert
		expect(customer.name).toBe("João");
	});

	it("should activate customer", () => {
		const customer = new Customer("123", "Customer 1");
		const address = new Address("Street 1", 123, "12345-678", "São Paulo");
		customer.address = address;

		customer.activate();

		expect(customer.isActive()).toBe(true);
	});

	it("should throw error when address is undefined", () => {
		expect(() => {
			const customer = new Customer("123", "Customer 1");
			customer.activate();
		}).toThrow("Address is mandatory to activate a customer");
	});

	it("should dectivate customer", () => {
		const customer = new Customer("123", "Customer 1");

		customer.deactivate();

		expect(customer.isActive()).toBe(false);
	});

	it("should add reward points", () => {
		const customer = new Customer("123", "Customer 1");
		expect(customer.rewardPoints).toBe(0);

		customer.addRewardPoints(10);
		expect(customer.rewardPoints).toBe(10);

		customer.addRewardPoints(10);
		expect(customer.rewardPoints).toBe(20);
	});
});
