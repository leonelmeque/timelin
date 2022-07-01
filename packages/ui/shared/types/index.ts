export interface CommonButtonProps<V = {}, S = {}> {
    label: string
    variant: keyof V
    size: keyof S
    fluid?: boolean
}



