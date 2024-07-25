"use client";

import { TotalMentees } from "@/app/frontend/redux/dashboard/actions/totalMentees";
import { useAppDispatch, useAppSelector } from "@/app/frontend/redux/hook";
import { useEffect } from "react";
import { AuthSignIn } from "../../redux/dashboard/actions/authSignIn";
import { FetchMenteeCollections } from "../../redux/dashboard/actions/fetchMenteeCollection";
import { FetchMentorCollections } from "../../redux/dashboard/actions/fetchMentorCollections";
import { TotalMentors } from "../../redux/dashboard/actions/totalMentors";
import { WithMentees } from "../../redux/dashboard/actions/withMentees";
import { WithMentors } from "../../redux/dashboard/actions/withMentors";
import { WithNoMentees } from "../../redux/dashboard/actions/withNoMentees";
import { WithNoMentors } from "../../redux/dashboard/actions/withNoMentors";
import { restartStatus, APIStatus } from "../../redux/dashboard/dashboardSlice";

const Match = () => {
  const dispatch = useAppDispatch();
  const totalMentees = useAppSelector((state) => state.dashboard.totalMentees);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(AuthSignIn());
      try {
        await Promise.all([
          dispatch(FetchMenteeCollections()),
          dispatch(FetchMentorCollections()),
          dispatch(TotalMentees()),
          dispatch(TotalMentors()),
          dispatch(WithMentees()),
          dispatch(WithMentors()),
          dispatch(WithNoMentees()),
          dispatch(WithNoMentors()),
          dispatch(restartStatus(APIStatus.idle)),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return <div>Match page: {totalMentees}</div>;
};
export default Match;
