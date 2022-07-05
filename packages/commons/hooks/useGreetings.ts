type Props = {
  whoToGreet: string;
};

export default function useGreetings({ whoToGreet }: Props) {
  return `Hello ${whoToGreet}, how can I help you today?`;
}
