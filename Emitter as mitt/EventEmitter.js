
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    emit(eventName, data) {
        const eventHandlers = this.events[eventName] || [];
        const allEventHandlers = this.events['*'] || [];

        [...eventHandlers, ...allEventHandlers].forEach(handler => {
            handler(data);
        });
    }

    off(eventName, callback) {
        const eventHandlers = this.events[eventName];
        if (eventHandlers) {
            this.events[eventName] = eventHandlers.filter(handler => handler !== callback);
        }
    }
}

// Example usage:
const emitter = new EventEmitter();

// Subscribe to "*" event
emitter.on('*', data => {
    console.log('Event emitted with data:', data);
});

// Subscribe to a specific event
emitter.on('exampleEvent', data => {
    console.log('Event emitted with data:', data);
});

// Emit the specific event
emitter.emit('exampleEvent', { message: 'Hello, world!' });

// Emit the "*" event
emitter.emit('*', { message: 'This is a general event.' });
