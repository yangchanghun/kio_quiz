// src/routes/miryangspecial/MiryangRoutes.tsx
import { Route } from "react-router-dom";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

import MemoryWordGame from "@/miryangspecial/memoryquiz/MemoryWordGame";
import Alzheimer from "@/miryangspecial/alzheimer/Alzheimer";
import AlzheimerResult from "@/miryangspecial/alzheimer/AlzheimerResult";
import CognitiveSurvey from "@/miryangspecial/cognitiveSurvey/CognitiveSurvey";
import CognitiveResult from "@/miryangspecial/cognitiveSurvey/CognitiveResult";
import DepressionSurvey from "./depression/DepressionSurvey";
import DepressionResult from "./depression/DepressionResult";
import StressSurvey from "./stress/StressSurvey";
import StressResult from "./stress/StressResult";
import SleepSurvey from "./sleep/SleepSurvey";
import SleepResult from "./sleep/SleepResult";
import OlderGuide from "./guide/OlderGuide";

export default function MiryangRoutes() {
  return (
    <>
      <Route
        path="/miryang/memorytest"
        element={
          <ProtectedRoute>
            <MemoryWordGame />
          </ProtectedRoute>
        }
      />

      <Route
        path="/miryang/alzhemier"
        element={
          <ProtectedRoute>
            <Alzheimer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/miryang/alzhemier/result"
        element={
          <ProtectedRoute>
            <AlzheimerResult />
          </ProtectedRoute>
        }
      />

      <Route
        path="/miryang/cognitive"
        element={
          <ProtectedRoute>
            <CognitiveSurvey />
          </ProtectedRoute>
        }
      />
      <Route
        path="/miryang/cognitive/result"
        element={
          <ProtectedRoute>
            <CognitiveResult />
          </ProtectedRoute>
        }
      />

      <Route
        path="/miryang/depression"
        element={
          <ProtectedRoute>
            <DepressionSurvey />
          </ProtectedRoute>
        }
      />
      <Route
        path="/miryang/depression/result"
        element={
          <ProtectedRoute>
            <DepressionResult />
          </ProtectedRoute>
        }
      />

      <Route
        path="/miryang/stress"
        element={
          <ProtectedRoute>
            <StressSurvey />
          </ProtectedRoute>
        }
      />
      <Route
        path="/miryang/stress/result"
        element={
          <ProtectedRoute>
            <StressResult />
          </ProtectedRoute>
        }
      />

      <Route
        path="/miryang/sleep"
        element={
          <ProtectedRoute>
            <SleepSurvey />
          </ProtectedRoute>
        }
      />
      <Route
        path="/miryang/sleep/result"
        element={
          <ProtectedRoute>
            <SleepResult />
          </ProtectedRoute>
        }
      />

      <Route
        path="/miryang/older/guide"
        element={
          <ProtectedRoute>
            <OlderGuide />
          </ProtectedRoute>
        }
      />
    </>
  );
}
