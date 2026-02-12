import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AppHeader from "../components/common/AppHeader";

export default function InstructionsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const startAssessment = async () => {
    setLoading(true);

    try {
      // Fullscreen must be triggered by user action
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request denied:", err);
    }

    navigate("/assessment");
  };

  return (
    <>
      {/* Top Navigation */}
      <AppHeader />

      {/* Main Content */}

      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Card elevation={6} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 5 }}>
            {/* Title */}
            <Stack mb={3}>
              <Typography variant="h4" fontWeight={600}>
                Assessment Instructions
              </Typography>
            </Stack>

            {/* Info Alert */}
            <Alert severity="info" sx={{ mb: 3 }}>
              This assessment is monitored to ensure fairness and integrity.
              Your activity will be logged for employer review.
            </Alert>

            {/* Rules */}
            <Typography variant="h6" gutterBottom>
              Rules & Guidelines
            </Typography>

            <List>
              {[
                "Do not switch tabs or applications during the test.",
                "Do not exit fullscreen mode.",
                "Copy / paste actions are restricted.",
                "The assessment is strictly time-bound.",
                "Network changes will be detected and logged.",
              ].map((rule, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <WarningAmberIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText primary={rule} />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 3 }} />

            {/* Start Button */}
            <Box textAlign="right">
              <Button
                variant="contained"
                size="large"
                onClick={startAssessment}
                disabled={loading}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                }}
              >
                {loading ? "Starting..." : "Start Assessment"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
