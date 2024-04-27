import { TicketUpdatedListener } from '../ticket-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import mongoose from 'mongoose';
import { TicketUpdatedEvent } from '@nicolas.thompson/common';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  // Create an instance of the listener
  const listener = new TicketUpdatedListener(natsWrapper.client);
  // Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();
  // Create a fake data event
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'new concert',
    price: 999,
    userId: '123',
  };
  // Create a fake message object
  const msg: Partial<Message> = {
    ack: jest.fn(),
  };
  // Return all of this stuff
  return { listener, ticket, data, msg };
};

it('finds, updates, and saves a ticket', async () => {
  const { listener, ticket, data, msg } = await setup();
  // Call the onMessage function with the data object + message object
  await listener.onMessage(data, msg as Message);
  // Write assertions to make sure a ticket was updated
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();
  // Call the onMessage function with the data object + message object
  await listener.onMessage(data, msg as Message);
  // Write assertions to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version number', async () => {
  const { listener, ticket, data, msg } = await setup();
  data.version = 10;
  try {
    await listener.onMessage(data, msg as Message);
  } catch (err) {}
  expect(msg.ack).not.toHaveBeenCalled();
});
