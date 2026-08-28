import type { Metadata } from "next";
import AssessmentClient from "./AssessmentClient";

export const metadata: Metadata = {
  title: "NaK Precision Mineral Assessment — SafeSalt™",
  description: "Discover your sodium-to-potassium profile with the NaK Precision Mineral Assessment. Self-reported, educational, and personalized to your patterns.",
};

export default function AssessmentPage() {
  return <AssessmentClient />;
}
