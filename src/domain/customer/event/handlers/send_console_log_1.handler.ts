import EventHandlerInterface from "../../../@shared/event/event_handler.interface";
import CustomerCreatedEvent from "../customer_created.event";

export default class SendConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
	handle(event: CustomerCreatedEvent): void {
		console.log(`Esse é o primeiro console.log do evento: ${event.constructor.name}`);
	}
}