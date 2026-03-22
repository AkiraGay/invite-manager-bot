const assert = require('node:assert/strict');
const test = require('node:test');

const clientModule = require('../bin/client.js');
const rabbitMqModule = require('../bin/framework/services/RabbitMq.js');

test('client ready bootstrap starts only once while startup is in progress', () => {
	assert.equal(clientModule.__test__.shouldStartReadyBootstrap(false, false), true);
	assert.equal(clientModule.__test__.shouldStartReadyBootstrap(false, true), false);
	assert.equal(clientModule.__test__.shouldStartReadyBootstrap(true, false), false);
});

test('invite sync wait is only reused for an active lease or existing wait promise', () => {
	assert.equal(rabbitMqModule.__test__.shouldReuseInviteSyncWait(false, false, false), false);
	assert.equal(rabbitMqModule.__test__.shouldReuseInviteSyncWait(true, true, false), true);
	assert.equal(rabbitMqModule.__test__.shouldReuseInviteSyncWait(false, false, true), true);
	assert.equal(rabbitMqModule.__test__.shouldReuseInviteSyncWait(true, false, false), false);
});
