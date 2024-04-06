interface CounterProps {
    /**
     * - Element 1 (string, optional): Custom prefix string to display before the page numbers.
     */
    counter?: [boolean?, string?];
    /**
     * The current page index (zero-based).
     */
    pageIndex: number;
    /**
     * The total number of pages.
     */
    pageCount: number;
  }
  
  declare function Counter(props: CounterProps): JSX.Element;
  
  export default Counter;
  