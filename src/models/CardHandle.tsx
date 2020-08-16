/** Describes the handle of a common card */
export interface CardHandle {
  /**
   * Flips the card
   * @param faceUp forces the face up to this prop
   */
  flip: (faceUp?: boolean) => void;
}
