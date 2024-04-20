import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@nicolas.thompson/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
