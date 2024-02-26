import EventInterface from "./event.interface";
import EventDispatcherInterface from "./event_dispatcher.interface";
import EventHandlerInterface from "./event_handler.interface";

export default class EventDispatcher implements EventDispatcherInterface {
	private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

	get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
		return this.eventHandlers;
	}

	notify(event: EventInterface): void {
		const eventName = event.constructor.name;
		const handlers = this.eventHandlers[eventName];

		if (handlers) {
			handlers.forEach((eventHandler) => eventHandler.handle(event));
		}
	}

	register(eventName: string, handler: EventHandlerInterface<EventInterface>): void {
		if (!this.eventHandlers[eventName]) {
			this.eventHandlers[eventName] = [];
		}

		this.eventHandlers[eventName].push(handler);
	}

	unregister(eventName: string, handler: EventHandlerInterface<EventInterface>): void {
		if (this.eventHandlers[eventName]) {
			const index = this.eventHandlers[eventName].indexOf(handler);

			if (index !== -1) {
				this.eventHandlers[eventName].splice(index, 1);
			}
		}
	}

	unregisterAll(): void {
		this.eventHandlers = {};
	}
}