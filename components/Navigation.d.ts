interface NavigationProps {
    /** The total number of pages in the carousel. */
    pageCount: number;
  
    /** Function to navigate to a specific page. Takes the page index (zero-based) as an argument. */
    goToPage: (pageIndex: number) => void;
  
    /** The current page index (zero-based). */
    pageIndex: number;
  }
  
  declare function Navigation(props: NavigationProps): JSX.Element;
  
  export default Navigation;
  