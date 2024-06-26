import moment from 'moment';

import { Cache } from '../../framework/cache/Cache';
import { BotType } from '../../types';
import { LeaderboardEntry } from '../services/Invites';

export class LeaderboardCache extends Cache<LeaderboardEntry[]> {
	public async init() {
		this.maxCacheDuration =
			this.client.type === BotType.custom
				? moment.duration(3, 'minute')
				: this.client.type === BotType.pro
				? // ? moment.duration(1, 'hour')
				  moment.duration(3, 'minute')
				: // : moment.duration(24, 'hour');
				  moment.duration(5, 'minute');
	}

	protected async _get(guildId: string): Promise<LeaderboardEntry[]> {
		return await this.client.invs.generateLeaderboard(guildId);
	}
}
