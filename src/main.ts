import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("1", "João");
const address = new Address("Rua 1", 123, "12345-678", "São Paulo");

customer.address = address;
customer.activate();

const item1 = new OrderItem("o1", "p1", "Item 1", 10, 1);
const item2 = new OrderItem("02", "p2", "Item 2", 15, 1);
const order = new Order("1", customer.id, [item1, item2]);

console.log(order);