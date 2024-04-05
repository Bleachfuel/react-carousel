// variants.d.ts

export interface variants {
    enter: (direction: number) => {
        x?: number;
        y?: number; // For verticalVariants
        opacity: number;
    };
    center: {
        zIndex: number;
        x?: number;
        y?: number; // For verticalVariants
        opacity: number;
    };
    exit: (direction: number) => {
        zIndex: number;
        x?: number;
        y?: number; // For verticalVariants
        opacity: number;
    };
}

export declare const variants: variants;

// Declare verticalVariants if needed
export declare const verticalVariants: varients;
