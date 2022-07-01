import { useEffect, useState } from "react"

type Props = {
    whoToGreet: string
}

export default function useGreetings({ whoToGreet }: Props) {
    const [state, setState] = useState(whoToGreet)
    return `Hello ${whoToGreet}, how can I help you today?`
}