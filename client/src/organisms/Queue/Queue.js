import React, { useState, useContext } from 'react';

import './Queue.css';
import QueueCard from '../QueueCard/QueueCard';
import EmptyQueue from '../../atoms/EmptyQueue/EmptyQueue';

import { SocketContext } from '../../context/socket.context';
import { UserContext } from '../../context/user.context';
import { PHASES } from '../../config/game.constants';

export default function Queue(props) {

  const handleCardPlayed = (position) => {
    setSelectedPlayerCard(null);
    let color = playerColor;
    if (!playerColor) {
      const player = players[user.id];
      color = player.color;
      setPlayerColor(player.color);
    }
    // card data held client-side already has id,  name, text
    const card = {
      ...selectedPlayerCard,
      influence: 0,
      ownerColor: color,
      ownerId: user.id,
      revealed: false,
    };
    socket.playCard(card, position);
  }

  // STATE, CONTEXT etc

  const { gameState, selectedPlayerCard, setSelectedPlayerCard } = props;
  const {
    activePlayerId,
    phase,
    players,
    queue,
    queueResolutionIndex: qri,
    targets,
    targetsNoneValid,
  } = gameState;

  const [playerColor, setPlayerColor] = useState(null);
  const socket = useContext(SocketContext);
  const [user] = useContext(UserContext);

  const isPlayerTurn = activePlayerId === user.id;

  return (
    <div className="queue">
      <div className="queue__endzone queue__endzone--left">
        {
          selectedPlayerCard ?
            <span
              className="queue__arrow icon-arrow-left"
              onClick={() => handleCardPlayed(0)}
            /> :
            null
        }
      </div>
      <div className="queue__centrezone">
        {
          queue.length ?
            <div className="queue__cards">
              {
                queue.map((stack, idx) => {
                  const topCard = stack[stack.length - 1];
                  const isResolving = phase === PHASES.RESOLUTION &&
                    qri === idx;
                    const isTarget = targets.includes(idx);
                  return (
                    <QueueCard
                      card={topCard}
                      indexInQueue={idx}
                      isPlayerTurn={isPlayerTurn}
                      isResolving={isResolving}
                      isTarget={isTarget}
                      qri={qri}
                      targetsNoneValid={targetsNoneValid}
                      key={`queue-card-${idx}`}
                    />
                  )
                })
              }
            </div> :
            <EmptyQueue />
        }
      </div>
      <div className="queue__endzone queue__endzone--right">
        {
          selectedPlayerCard ?
            <span
              className="queue__arrow icon-arrow-right"
              onClick={() => handleCardPlayed(queue.length)}
            /> :
            null
        }
      </div>
    </div>
  );
}