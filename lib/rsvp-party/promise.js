import RSVP from 'rsvp';
import { o_create } from './utils';

export default class Promise extends RSVP.Promise {
  constructor(resolver, label) {
    super(resolver, label);
  }
}
