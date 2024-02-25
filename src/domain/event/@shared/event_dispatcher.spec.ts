import EventDispatcher from "./event_dispatcher";
import SendEmailWhenProductIsCreatedHandler from "./product/handlers/send_email_when_product_is_created.handler";

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
});