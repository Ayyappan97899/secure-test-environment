import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

export default function CompletionPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Top Navigation */}
      <AppHeader />

      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Card elevation={4}>
          <CardContent sx={{ textAlign: "center", py: 6 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 70, mb: 2 }} />

            <Typography variant="h4" gutterBottom>
              Assessment Submitted
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Thank you for completing the assessment. Your responses and
              activity logs have been securely recorded.
            </Typography>

            <Button variant="outlined" onClick={() => navigate("/")}>
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
