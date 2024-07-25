import { createAsyncThunk } from "@reduxjs/toolkit";
export const TotalMentees = createAsyncThunk<number>(
  "dashboard/TotalMentees",
  async () => {
    try {
      const getData = await fetch("/backend/api/get/mentees/totalMentees");
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
