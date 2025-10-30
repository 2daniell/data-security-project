import clsx from "clsx";

interface SwitcherProps<T extends readonly string[]> {
    options: T;
    value: T[number];
    onChange: (value: T[number]) => void;
    className?: string;
}

export function Switcher<T extends readonly string[]>({ options, onChange, value, className }: SwitcherProps<T>) {
    return (
        <div className={clsx("inline-flex rounded-md border", className )}>
            {options.map((option) => {
                
                const isSelected: boolean = option === value;

                return (<button key={option} onClick={() => onChange(option)}
                    className={clsx(
                        "flex-1 px-4 py-2 text-sm font-medium transition-colors duration-300",
                        {
                            "bg-white rounded-md": isSelected,
                            "": !isSelected
                        }
                    )}>
                    {option}
                </button>)
            })}
        </div>
    )
}