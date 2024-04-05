// variants.d.ts

export declare const variants: {
    enter: (direction: number) => {
        x: number;
        opacity: number;
    };
    center: {
        zIndex: number;
        x: number;
        opacity: number;
    };
    exit: (direction: number) => {
        zIndex: number;
        x: number;
        opacity: number;
    };
};

