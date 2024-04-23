import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from '@nicolas.thompson/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
