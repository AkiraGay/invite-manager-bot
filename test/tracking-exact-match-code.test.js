const assert = require('node:assert/strict');
const test = require('node:test');

const { __test__ } = require('../bin/invites/services/Tracking.js');

test('isJoinExactMatchCodeTooLongError matches expected MySQL exactMatchCode error', () => {
	assert.equal(
		__test__.isJoinExactMatchCodeTooLongError({
			code: 'ER_DATA_TOO_LONG',
			errno: 1406,
			sqlMessage: "Data too long for column 'exactMatchCode' at row 1"
		}),
		true
	);
});

test('isJoinExactMatchCodeTooLongError ignores unrelated database errors', () => {
	assert.equal(
		__test__.isJoinExactMatchCodeTooLongError({
			code: 'ER_DATA_TOO_LONG',
			errno: 1406,
			sqlMessage: "Data too long for column 'name' at row 1"
		}),
		false
	);
	assert.equal(
		__test__.isJoinExactMatchCodeTooLongError({
			code: 'ER_LOCK_WAIT_TIMEOUT',
			errno: 1205,
			sqlMessage: 'Lock wait timeout exceeded'
		}),
		false
	);
});
