"use client";

import { Box, Paper } from "@mui/material";
import PairingComplete from "./pairingComplete";
import { useSearchParams } from "next/navigation";
import PairingCompleteSkeleton from "./pairingCompleteSkeleton";
import { ResultsProps } from "../../interface/ResultsProps";

const ResultsComponent: React.FC<ResultsProps> = ({
  data,
  dataOf,
  participatingAs,
}) => {
  const searchParams = useSearchParams();
  const chosenValue = searchParams.get("q");

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper elevation={3}>
        {chosenValue != undefined ? (
          <PairingComplete
            chosen={dataOf!}
            participatingAs={participatingAs!}
          />
        ) : (
          <PairingCompleteSkeleton />
        )}
      </Paper>
    </Box>
  );
};

export default ResultsComponent;
