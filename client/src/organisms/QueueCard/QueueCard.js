import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import './QueueCard.css';

import { SocketContext } from '../../context/socket.context';
import { UserContext } from '../../context/user.context';
import { QUEUE_CARD } from '../../config/ui.constants';

export default function QueueCard(props) {

  const { card, isResolving, qri } = props;

  const [hovered, setHovered] = useState(false);
  const socket = useContext(SocketContext);
  const [user] = useContext(UserContext);


  // "METHODS"

  const handleMouseEnter = (e) => setHovered(true);

  const handleMouseLeave = (e) => setHovered(false);

  const handleNoReveal = () => {
    socket.queueNoReveal(qri);
  }

  const handleReveal = () => {
    socket.queueReveal(qri);
  }

  // DYNAMIC STYLES

  const width = QUEUE_CARD.WIDTH;
  const height = width * QUEUE_CARD.HEIGHT_SCALE;

  const notRevealedStyles = {
    backgroundColor: card.ownerColor,
  };

  const revealedStyles = {
    backgroundColor: card.ownerColor,
  };

  const noHoverStyles = {
    width: `${width}px`,
    maxWidth: QUEUE_CARD.MAX_WIDTH,
    height: `${height}px`,
  };

  const hoverStyles = {
    width: `${width * QUEUE_CARD.HOVER_SCALE}px`,
    // maxWidth: QUEUE_CARD.MAX_WIDTH,
    height: `${height * QUEUE_CARD.HOVER_SCALE}px`,
    backgroundColor: card.ownerColor,
  };

  const resolvingStyles = {
    boxShadow: '0 0 1rem 1rem var(--color-white)',
  };

  const rStyle = card.revealed ? revealedStyles : notRevealedStyles;
  const hStyle = hovered ? hoverStyles : noHoverStyles;
  const sStyle = isResolving ? resolvingStyles : {};
  const combinedStyle = { ...rStyle, ...hStyle, ...sStyle };

  const isOwned = card.ownerId === user.id;

  return (
    <div className="queue-card">
      <div
        className="queue-card__card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={combinedStyle}
      >
        {
          !hovered && !card.revealed ?
            <div className="queue-card__back">O</div> :
            null
        }
        {
          hovered && (card.revealed || isOwned) ?
            <div className="queue-card__name">{card.name}</div> :
            null
        }
        {
          hovered && (card.revealed || isOwned) ?
            <div className="queue-card__text">{card.text}</div> :
            null
        }
        {
          card.influence ?
            <span className="queue-card__influence">{card.influence}</span> :
            null
        }
      </div>
      {
        isResolving && isOwned ?
          <div className="queue-card__prompt">
            Reveal?
            <div className="queue-card__buttons">
              <button
                autoComplete="off"
                className="queue-card__button"
                onClick={handleReveal}
                type="button"
              >
                <span className="queue-card__button-icon icon-check" />
              </button>
              <button
                autoComplete="off"
                className="queue-card__button"
                onClick={handleNoReveal}
                type="button"
              >
                <span className="queue-card__button-icon icon-cross" />
              </button>
            </div>
          </div> :
          null
      }
    </div>
  );
}

//----------------------------------------------------------------
// PROPS
//----------------------------------------------------------------

const { bool, object } = PropTypes;

QueueCard.propTypes = {
  card: object.isRequired,
  isResolving: bool,
};

QueueCard.defaultProps = {
  isResolving: false,
};