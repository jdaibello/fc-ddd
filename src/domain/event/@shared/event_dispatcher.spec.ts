import Address from "../../entity/address";
import EventDispatcher from "./event_dispatcher";
import CustomerCreatedEvent from "./product/customer_created.event";
import SendConsoleLog1Handler from "./product/handlers/send_console_log_1.handler";
import SendEmailWhenProductIsCreatedHandler from "./product/handlers/send_email_when_product_is_created.handler";
import SendConsoleLog2Handler from "./product/handlers/send_console_log_2.handler";
import ProductCreatedEvent from "./product/product_created.event";

describe("Domain events tests", () => {
	it("should register an event handler", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", eventHandler);

		expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
		expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
		expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
	});

	it("should unregister an event handler", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", eventHandler);
		expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

		eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
		expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
		expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
	});

	it("should unregister all event handlers", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", eventHandler);
		expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

		eventDispatcher.unregisterAll();
		expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
	});

	it("should notify all event handlers", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();
		const spyEventHandler = jest.spyOn(eventHandler, "handle");

		eventDispatcher.register("ProductCreatedEvent", eventHandler);
		expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

		const productCreatedEvent = new ProductCreatedEvent({
			id: 1,
			name: "Product 1",
			description: "Product 1 Description",
			price: 10.0,
		});

		// Quando o notify é executado, o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
		eventDispatcher.notify(productCreatedEvent);

		expect(spyEventHandler).toHaveBeenCalled();
	});

	it("should notify all customer created event handlers", () => {
		const eventDispatcher = new EventDispatcher();
		const consoleLogOneEventHandler = new SendConsoleLog1Handler();
		const consoleLogTwoEventHandler = new SendConsoleLog2Handler();
		const spyConsoleLogOneEventHandler = jest.spyOn(consoleLogOneEventHandler, "handle");
		const spyConsoleLogTwoEventHandler = jest.spyOn(consoleLogTwoEventHandler, "handle");

		eventDispatcher.register("CustomerCreatedEvent", consoleLogOneEventHandler);
		eventDispatcher.register("CustomerCreatedEvent", consoleLogTwoEventHandler);
		expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(consoleLogOneEventHandler);
		expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(consoleLogTwoEventHandler);

		const customerCreatedEvent = new CustomerCreatedEvent({
			id: 1,
			name: "Customer 1",
			address: new Address("Street 1", 1, "City 1", "12345-678"),
			active: true,
			rewardPoints: 0
		});

		eventDispatcher.notify(customerCreatedEvent);

		expect(spyConsoleLogOneEventHandler).toHaveBeenCalled();
		expect(spyConsoleLogTwoEventHandler).toHaveBeenCalled();
	});
});