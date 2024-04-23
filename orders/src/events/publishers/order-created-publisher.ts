import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@nicolas.thompson/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
