import EventInterface from "./event.interface";
import EventDispatcherInterface from "./event_dispatcher.interface";
import EventHandlerInterface from "./event_handler.interface";

export default class EventDispatcher implements EventDispatcherInterface {
	private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

	get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
		return this.eventHandlers;
	}

	notify(event: EventInterface): void {
	}

	register(eventName: string, handler: EventHandlerInterface<EventInterface>): void {
		if (!this.eventHandlers[eventName]) {
			this.eventHandlers[eventName] = [];
		}

		this.eventHandlers[eventName].push(handler);
	}

	unregister(eventName: string, handler: EventHandlerInterface<EventInterface>): void {
	}

	unregisterAll(): void {
	}
}