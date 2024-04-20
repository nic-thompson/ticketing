import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@nicolas.thompson/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
