import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Divider,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";

import useAttempt from "../hooks/useAttempt";
import useEventLogger from "../hooks/useEventLogger";
import { submitAttempt } from "../api/attempt.api";
import { EVENT_TYPES } from "../utils/eventTypes";

// Security Components
import ClipboardBlocker from "../components/enforcement/ClipboardBlocker";
import FocusTracker from "../components/enforcement/FocusTracker";
import FullscreenEnforcer from "../components/enforcement/FullscreenEnforcer";
import useIpMonitor from "../hooks/useIpMonitor";
import AppLoader from "../components/common/AppLoader";

const STORAGE_KEY = "secure_test_end_time";

export default function AssessmentPage() {
  const { attemptId, duration, loading } = useAttempt();
  const { logEvent, eventSends } = useEventLogger(attemptId);

  const [timeLeft, setTimeLeft] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [suspiciousCount, setSuspiciousCount] = useState(0);

  const navigate = useNavigate();

  //  Submit Handler

  const handleSubmit = useCallback(async () => {
    if (!attemptId || submitting) return;

    setSubmitting(true);
    logEvent(EVENT_TYPES.ASSESSMENT_SUBMITTED);

    await eventSends();
    await submitAttempt({ attemptId, answer });

    localStorage.removeItem(STORAGE_KEY); // clear timer
    navigate("/complete");
  }, [attemptId, submitting, answer, logEvent, eventSends, navigate]);

  //  Timer Logic (Refresh Safe)

  useEffect(() => {
    if (!duration || !attemptId) return;

    // Check if endTime exists in localStorage
    let endTime = localStorage.getItem(STORAGE_KEY);
    if (!endTime) {
      endTime = Date.now() + duration * 1000; // duration in ms
      localStorage.setItem(STORAGE_KEY, endTime);
      logEvent(EVENT_TYPES.TIMER_STARTED);
    } else {
      endTime = parseInt(endTime, 10);
    }

    // Initial remaining time
    const remaining = Math.floor((endTime - Date.now()) / 1000);
    setTimeLeft(remaining > 0 ? remaining : 0);

    // Interval to update every second
    const interval = setInterval(() => {
      const newRemaining = Math.floor((endTime - Date.now()) / 1000);

      if (newRemaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        logEvent(EVENT_TYPES.TIMER_EXPIRED);
        handleSubmit();
      } else {
        setTimeLeft(newRemaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, attemptId, logEvent, handleSubmit]);

  // Run IP monitoring

  const handleNetworkChange = useCallback(
    (res) => {
      if (res.classification === "POTENTIALLY_SUSPICIOUS") {
        setSuspiciousCount(res.suspiciousCount);
        setOpen(true);
      }

      if (res.status === "SUBMITTED") {
        navigate("/complete");
      }
    },
    [navigate],
  );

  useIpMonitor(attemptId, handleNetworkChange, 15000);

  if (loading) return <AppLoader />;

  const progress = duration ? (timeLeft / duration) * 100 : 0;
  const isLowTime = timeLeft < 60;

  return (
    <>
      {/* Security Enforcement */}
      <ClipboardBlocker attemptId={attemptId} />
      <FocusTracker attemptId={attemptId} />
      <FullscreenEnforcer attemptId={attemptId} />

      {/* Top Navigation */}
      <AppHeader />

      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Card elevation={4}>
          <CardContent>
            {/* Header + Timer */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h5">Assessment</Typography>
              <Chip
                icon={<TimerIcon />}
                label={`${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
                  .toString()
                  .padStart(2, "0")}`}
                color={isLowTime ? "error" : "primary"}
              />
            </Box>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 8, borderRadius: 5, mb: 3 }}
              color={isLowTime ? "error" : "primary"}
            />

            <Divider sx={{ mb: 3 }} />

            {/* Question */}
            <Typography variant="h6" gutterBottom>
              Question 1
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              Explain the Virtual DOM in React and how it improves performance.
            </Typography>

            <TextField
              multiline
              rows={6}
              fullWidth
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
            />

            <Box textAlign="right" mt={4}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Assessment"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
      {/*  Network Change Detected Dialog*/}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>⚠ Network Change Detected</DialogTitle>
        <DialogContent>
          <Typography>Suspicious network activity detected.</Typography>
          <Typography>Warning Count: {suspiciousCount}/2</Typography>
          <Typography variant="body2" color="error">
            After 2 suspicious changes, your assessment will auto-submit.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Continue</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
