import { createAsyncThunk } from "@reduxjs/toolkit";

export const TotalMentors = createAsyncThunk<number>(
  "dashboard/TotalMentors",
  async () => {
    try {
      const getData = await fetch("/backend/api/get/mentors/totalMentors");
      if (!getData.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await getData.json();
      return jsonData;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);
