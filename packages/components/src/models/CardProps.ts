import { Position } from '@models/Position';
import { Dimensions } from '@models/Dimensions';

/** Common card props */
export interface CardProps {
  /** Indicates if the card is face up or face down */
  faceUp?: boolean;
  /** Defines the card height */
  height?: number;
  /** Defines the card width */
  width?: number;
  /** Disables the events. Use this if you want to control the card soley via props */
  disableNativeEvents?: boolean;
  /** Function called when card position changes with the new position of the card */
  onPositionChanged?: (position: Position) => void;
  /** Function called when card flips with a boolean representing whether face is up or not */
  onFlipped?: (isFaceUp: boolean) => void;
  /** Indicates the position of the card */
  position?: Position;
  /** Indicates the boundaries for the card position  */
  boundaries?: Dimensions;
}
