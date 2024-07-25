"use client";
import CircularWithValueLabel from "../circularprogress/CircularProgressWithLabel";
import { TotalMentees } from "@/app/frontend/redux/dashboard/actions/totalMentees";
import { TotalMentors } from "@/app/frontend/redux/dashboard/actions/totalMentors";
import { WithMentees } from "@/app/frontend/redux/dashboard/actions/withMentees";
import { WithMentors } from "@/app/frontend/redux/dashboard/actions/withMentors";
import { WithNoMentees } from "@/app/frontend/redux/dashboard/actions/withNoMentees";
import { WithNoMentors } from "@/app/frontend/redux/dashboard/actions/withNoMentors";
import { useAppDispatch, useAppSelector } from "@/app/frontend/redux/hook";
import { Box } from "@mui/material";
import { useEffect } from "react";

const ProgressComponent = () => {
  const totalMentors = useAppSelector((state) => state.dashboard.totalMentors);
  const withMentees = useAppSelector((state) => state.dashboard.withMentees);
  const withNoMentees = useAppSelector(
    (state) => state.dashboard.withNoMentees
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTotalMenteesData = async () => {
      try {
        await Promise.all([
          dispatch(TotalMentees()),
          dispatch(TotalMentors()),
          dispatch(WithMentees()),
          dispatch(WithMentors()),
          dispatch(WithNoMentees()),
          dispatch(WithNoMentors()),
        ]);
      } catch (error) {
        console.error("Error fetching total mentees:", error);
      }
    };

    fetchTotalMenteesData();
  }, [dispatch]);

  return (
    <Box display="flex" justifyContent="center" gap={10}>
      <Box display="flex" alignItems="center">
        <CircularWithValueLabel
          total={totalMentors}
          withValue={withMentees}
          withNoValue={withNoMentees}
          displayTotalAs={"Mentors"}
          displayWithAs={"Mentees"}
        />
      </Box>
    </Box>
  );
};

export default ProgressComponent;
