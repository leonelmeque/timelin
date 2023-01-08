type Props = {
  whoToGreet: string;
};

export function useGreetings({ whoToGreet }: Props) {
  return `Hello ${whoToGreet}, how can I help you today? MR UX Engineer`;
}
