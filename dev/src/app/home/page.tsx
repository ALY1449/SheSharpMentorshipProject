"use client";
import LabTabs from "../frontend/components/tabs/tabs";
import app from "@/app/backend/firestore/appFirestore";
import database from "@/app/backend/firestore/firestore";
import auth from "@/app/backend/firestore/authFirestore";
import { AuthSignIn } from "../frontend/redux/dashboard/actions/authSignIn";
import { FetchMenteeCollections } from "../frontend/redux/dashboard/actions/fetchMenteeCollection";
import { FetchMentorCollections } from "../frontend/redux/dashboard/actions/fetchMentorCollections";
import { TotalMentees } from "../frontend/redux/dashboard/actions/totalMentees";
import { TotalMentors } from "../frontend/redux/dashboard/actions/totalMentors";
import { WithMentees } from "../frontend/redux/dashboard/actions/withMentees";
import { WithMentors } from "../frontend/redux/dashboard/actions/withMentors";
import { WithNoMentees } from "../frontend/redux/dashboard/actions/withNoMentees";
import { WithNoMentors } from "../frontend/redux/dashboard/actions/withNoMentors";
import {
  APIStatus,
  restartStatus,
} from "../frontend/redux/dashboard/dashboardSlice";
import { useAppDispatch, useAppSelector } from "../frontend/redux/hook";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Box } from "@mui/material";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const firstLog = useRef(true);
  const mentorRows = useAppSelector((state) => state.dashboard.mentorRows);
  const menteeRows = useAppSelector((state) => state.dashboard.menteeRows);
  const totalMentees = useAppSelector((state) => state.dashboard.totalMentees);
  const totalMentors = useAppSelector((state) => state.dashboard.totalMentors);
  const withMentees = useAppSelector((state) => state.dashboard.withMentees);
  const withMentors = useAppSelector((state) => state.dashboard.withMentors);
  const withNoMentees = useAppSelector(
    (state) => state.dashboard.withNoMentees
  );
  const withNoMentors = useAppSelector(
    (state) => state.dashboard.withNoMentors
  );
  const userData = useAppSelector((state) => state.dashboard.user);

  const menteesData = [totalMentees, withMentors, withNoMentors];
  const mentorsData = [totalMentors, withMentees, withNoMentees];
  const { user, isLoading } = useUser();

  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     window.location.href = "/backend/api/auth/login";
  //   }
  // }, [isLoading, user]);

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

  useEffect(() => {
    console.log("userData ", userData);
  }, [userData]);

  return (
    userData && (
      <Box>
        <a href="/api/auth/logout">Logout</a>
        <LabTabs
          mentorRows={mentorRows}
          menteeRows={menteeRows}
          mentorsData={mentorsData}
          menteesData={menteesData}
        />
      </Box>
    )
  );
}
