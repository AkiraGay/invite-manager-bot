const assert = require('node:assert/strict');
const test = require('node:test');

const { RabbitMqService, __test__ } = require('../bin/framework/services/RabbitMq');

test('startup done wait is skipped once startup is already satisfied', () => {
	assert.equal(__test__.shouldWaitForStartupDone(false, false), true);
	assert.equal(__test__.shouldWaitForStartupDone(true, false), false);
	assert.equal(__test__.shouldWaitForStartupDone(false, true), false);
});

test('rabbitmq startup done wait does not reopen channel after client started', async () => {
	let createChannelCalls = 0;
	const client = {
		hasStarted: true,
		flags: [],
		type: 'regular',
		config: {},
		instance: 'l'
	};

	const service = new RabbitMqService(client);
	service.conn = {
		createChannel: async () => {
			createChannelCalls++;
			throw new Error('createChannel should not be called');
		}
	};

	await service.waitForStartupTicketsDone();

	assert.equal(createChannelCalls, 0);
});
