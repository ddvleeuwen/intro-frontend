export type Challenge = {
  id: number;
  title: string;
  challenge: string;
  points: number;
  state: "PENDING" | "APPROVED" | "DENIED";
  submittedAt: string;
}

