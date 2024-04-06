declare interface PaginateFunction {
    (direction: number): void;
  }
  
  declare interface ControlsProps {
    /**
     * A callback function that takes a direction (number) as an argument and triggers pagination behavior.
     * - Positive values (e.g., 1) indicate moving forward (next).
     * - Negative values (e.g., -1) indicate moving backward (previous).
     */
    paginate: PaginateFunction;
  }
  
  declare function Controls(props: ControlsProps): JSX.Element;
  
  export default Controls;
  