const { CARD_EFFECTS } = require('../config/game.constants');

const archer = {
  id: 'archer',
  name: 'Archer',
  text: 'Eliminate the first or last card from the Queue.',
  getInfluenceGainOnReveal: (resolvingCard) => {
    // usually influence stored on card, but cater for exceptions here e.g. Conspiracy / Ambush
    return resolvingCard.influence;
  },
  getTargetsForAbility: (queue, qri) => {
    // return an empty array if no targets at all
    // return array with index of self if it's a "self-target" e.g. inf gain such as Heir, Lord
    // this enables card highlighting in UI etc
    const queueStartIdx = 0;
    const queueEndIdx = queue.length - 1;
    const targets = [queueStartIdx];
    queueEndIdx !== queueStartIdx && targets.push(queueEndIdx);
    return targets;
  },
  getActionForAbility: (queue, qri) => {
    // cards like Heir and Lord will need the queue to determine influence gain
    // return influenceGain prop if this occurs
    return {
      type: CARD_EFFECTS.ELIMINATE,
      influenceGain: 1
    }
  },
  getDiscardAfterAbility: (queue, qri) => false,
  getActionOnElimination: () => null,
};

module.exports = archer;