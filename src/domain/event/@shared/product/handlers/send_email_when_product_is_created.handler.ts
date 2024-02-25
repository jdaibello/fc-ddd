import EventHandlerInterface from "../../event_handler.interface";
import ProductCreatedEvent from "../product_created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
	handle(event: ProductCreatedEvent): void {
		console.log('Sending email to...');
	}
}