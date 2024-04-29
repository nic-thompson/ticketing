import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@nicolas.thompson/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
