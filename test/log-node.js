var _ = require('underscore');
var assert = require('chai').assert;
var RED = require('./lib/red-stub')();
var LogBlock = require('../chatbot-log');

describe('Chat log node', function() {

  it('should log the text message', function() {
    var msg = RED.createMessage({
      type: 'message',
      content: 'I am the message'
    });
    RED.node.config({});
    RED.environment.chat(msg.originalMessage.chat.id, {
      firstName: 'Javascript',
      lastName: 'Jedi',
      chatId: 42
    });
    LogBlock(RED);
    RED.node.get().emit('input', msg);
    assert.include(RED.node.message(), '42 [Javascript Jedi] <');
    assert.include(RED.node.message(), '- I am the message');
  });

  it('should log the image message', function() {
    var msg = RED.createMessage({
      type: 'photo',
      content: new Buffer('123')
    });
    RED.node.config({});
    RED.environment.chat(msg.originalMessage.chat.id, {
      firstName: 'Javascript',
      lastName: 'Jedi',
      chatId: 42
    });
    LogBlock(RED);
    RED.node.get().emit('input', msg);
    assert.include(RED.node.message(), '42 [Javascript Jedi] <');
    assert.include(RED.node.message(), 'image: <buffer>');
  });

  it('should log the location message', function() {
    var msg = RED.createMessage({
      type: 'location',
      content: {
        latitude: '123',
        longitude: '456'
      },
      place: 'jedi\'s home'
    });
    RED.node.config({});
    RED.environment.chat(msg.originalMessage.chat.id, {
      firstName: 'Javascript',
      lastName: 'Jedi',
      chatId: 42
    });
    LogBlock(RED);
    RED.node.get().emit('input', msg);
    assert.include(RED.node.message(), '42 [Javascript Jedi] <');
    assert.include(RED.node.message(), '- latitude: 123 longitude: 123');
  });

});

