const assert = require('node:assert/strict');
const test = require('node:test');

const trackingModule = require('../bin/invites/services/Tracking.js');

test('audit no-match snapshot hash is stable for identical invite snapshots', () => {
	const oldInvs = {
		abc: { uses: 1, maxUses: 0 }
	};
	const newInvs = {
		abc: { uses: 1, maxUses: 0 }
	};

	assert.equal(
		trackingModule.__test__.buildAuditNoMatchSnapshotHash(oldInvs, newInvs),
		trackingModule.__test__.buildAuditNoMatchSnapshotHash(oldInvs, newInvs)
	);
});

test('audit no-match suppression only applies to the same snapshot hash before expiry', () => {
	const snapshotHash = 'hash-a';
	const now = 1000;

	assert.equal(
		trackingModule.__test__.shouldSuppressAuditNoMatch(
			{ snapshotHash, suppressUntil: now + 30000, lastSuppressedLogAt: 0 },
			snapshotHash,
			now
		),
		true
	);
	assert.equal(
		trackingModule.__test__.shouldSuppressAuditNoMatch(
			{ snapshotHash, suppressUntil: now - 1, lastSuppressedLogAt: 0 },
			snapshotHash,
			now
		),
		false
	);
	assert.equal(
		trackingModule.__test__.shouldSuppressAuditNoMatch(
			{ snapshotHash: 'hash-b', suppressUntil: now + 30000, lastSuppressedLogAt: 0 },
			snapshotHash,
			now
		),
		false
	);
});
