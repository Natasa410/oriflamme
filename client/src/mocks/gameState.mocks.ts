import { GameState } from '../types/index';

type GameStateMocks = {
  [key: string]: GameState
}

export const gameStateMocks: GameStateMocks = {
	placeholder: {
		abilityInterrupted: false,
		activePlayerId: '',
		numPlayers: 0,
		phase: '',
		planningPhasePlayed: 0,
		players: {},
		queue: [],
		queueResolutionIndex: 0,
		roomId: null,
		round: 0,
		targetsNoneValid: false,
		targetsSelf: false,
		targettedIndex: null,
		turnOrder: [ '' ],
		turnOrderIndex: 0
	}
};
