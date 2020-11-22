/* eslint-disable max-lines */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Draggable } from './Draggable';

describe('Draggable', () => {
  it('should render a Draggable item', () => {
    const { getByTestId } = render(<Draggable position={{ x: 24, y: 56 }} />);
    const draggable = getByTestId('Draggable');

    expect(draggable).toBeInTheDocument();
  });

  it('should have an absolute position', () => {
    const { getByTestId } = render(<Draggable position={{ x: 24, y: 56 }} />);
    const draggable = getByTestId('Draggable');

    expect(draggable).toHaveStyle('position: absolute');
  });

  it('should combine class names if one is given in props', () => {
    const { getByTestId } = render(<Draggable position={{ x: 24, y: 56 }} className="my-awesome-class" />);
    const draggable = getByTestId('Draggable');

    expect(draggable).toHaveClass('my-awesome-class');
  });

  it("should set the Draggable item's position to the position given in props", () => {
    const { getByTestId } = render(<Draggable position={{ x: 24, y: 56 }} />);
    const draggable = getByTestId('Draggable');

    expect(draggable).toHaveStyle('transform: translate(24px, 56px)');
  });

  it('should update the item position after it has been dragged', () => {
    const { getByTestId } = render(<Draggable position={{ x: 10, y: 15 }} />);
    const draggable = getByTestId('Draggable');

    expect(draggable).toHaveStyle('transform: translate(10px, 15px)');

    fireEvent.mouseDown(draggable, { clientX: 34, clientY: 55 });
    fireEvent.mouseMove(draggable, { clientX: 54, clientY: 66 });
    fireEvent.mouseUp(draggable);

    expect(draggable).toHaveStyle('transform: translate(30px, 26px)');
  });

  it('should call onDragged with the new position of the item', () => {
    const onDraggedSpy = jest.fn();

    const { getByTestId } = render(<Draggable onDragged={onDraggedSpy} position={{ x: 10, y: 15 }} />);
    const draggable = getByTestId('Draggable');

    fireEvent.mouseDown(draggable, { clientX: 34, clientY: 55 });
    fireEvent.mouseMove(draggable, { clientX: 54, clientY: 66 });
    fireEvent.mouseUp(draggable);

    expect(onDraggedSpy).toHaveBeenCalledWith({ x: 30, y: 26 });
  });

  it('should not call onDragged if the position of the item has not changed', () => {
    const onDraggedSpy = jest.fn();

    const { getByTestId } = render(<Draggable onDragged={onDraggedSpy} position={{ x: 10, y: 15 }} />);
    const draggable = getByTestId('Draggable');

    fireEvent.mouseDown(draggable, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(draggable, { clientX: 0, clientY: 0 });
    fireEvent.mouseUp(draggable);

    expect(onDraggedSpy).not.toHaveBeenCalled();
  });

  it('should not drag item if it is disabled', () => {
    const onDraggedSpy = jest.fn();

    const { getByTestId } = render(<Draggable onDragged={onDraggedSpy} position={{ x: 10, y: 15 }} disabled />);
    const draggable = getByTestId('Draggable');

    fireEvent.mouseDown(draggable, { clientX: 34, clientY: 55 });
    fireEvent.mouseMove(draggable, { clientX: 54, clientY: 66 });
    fireEvent.mouseUp(draggable);

    expect(onDraggedSpy).not.toHaveBeenCalled();
    expect(draggable).toHaveStyle('transform: translate(10px, 15px)');
  });

  it('should have a "grab" cursor by default', () => {
    const onDraggedSpy = jest.fn();

    const { getByTestId } = render(<Draggable onDragged={onDraggedSpy} position={{ x: 10, y: 15 }} />);
    const draggable = getByTestId('Draggable');

    fireEvent.mouseOver(draggable);

    expect(draggable).toHaveStyle('cursor: grab');
  });

  it('should have a "grabbing" cursor when mouse is dragging the item', () => {
    const onDraggedSpy = jest.fn();

    const { getByTestId } = render(<Draggable onDragged={onDraggedSpy} position={{ x: 10, y: 15 }} />);
    const draggable = getByTestId('Draggable');

    fireEvent.mouseDown(draggable, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(draggable, { clientX: 10, clientY: 10 });

    expect(draggable).toHaveStyle('cursor: grabbing');
  });

  it('should call onClick when clicking on the item', () => {
    const onClickSpy = jest.fn();

    const { getByTestId } = render(<Draggable onClick={onClickSpy} position={{ x: 10, y: 15 }} />);
    const draggable = getByTestId('Draggable');

    fireEvent.click(draggable);

    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should call onClick when pressing space bar on the item', () => {
    const onClickSpy = jest.fn();

    const { getByTestId } = render(<Draggable onClick={onClickSpy} position={{ x: 10, y: 15 }} />);
    const draggable = getByTestId('Draggable');

    fireEvent.keyDown(draggable, { key: ' ', code: 'Space', keyCode: 32, charCode: 32 });

    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should not call onClick if item is disabled', () => {
    const onClickSpy = jest.fn();

    const { getByTestId } = render(<Draggable onClick={onClickSpy} disabled position={{ x: 10, y: 15 }} />);
    const draggable = getByTestId('Draggable');

    fireEvent.click(draggable);

    expect(onClickSpy).not.toHaveBeenCalled();
  });

  it('should not trigger onClick after item was dragged', () => {
    const onClickSpy = jest.fn();

    const { getByTestId } = render(<Draggable onClick={onClickSpy} position={{ x: 10, y: 15 }} />);
    const draggable = getByTestId('Draggable');

    fireEvent.mouseDown(draggable, { clientX: 34, clientY: 55 });
    fireEvent.mouseMove(draggable, { clientX: 54, clientY: 66 });
    fireEvent.mouseUp(draggable);

    fireEvent.click(draggable);

    expect(onClickSpy).not.toHaveBeenCalled();
  });
});
