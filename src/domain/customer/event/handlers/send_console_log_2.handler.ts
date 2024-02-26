import EventHandlerInterface from "../../../@shared/event/event_handler.interface";
import CustomerCreatedEvent from "../customer_created.event";

export default class SendConsoleLog2Handler implements EventHandlerInterface<CustomerCreatedEvent> {
	handle(event: CustomerCreatedEvent): void {
		console.log(`Esse é o segundo console.log do evento: ${event.constructor.name}`);
	}
}