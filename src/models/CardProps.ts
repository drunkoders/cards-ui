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
}
