import { MatchRow } from "./MatchRow";

export interface ResultsProps {
  data: MatchRow[] | null;
  dataOf?: string | null | undefined;
  participatingAs?: string | null;
}
