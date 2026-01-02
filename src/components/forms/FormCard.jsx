import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

/**
 * FormCard Component - Modern card wrapper for auth forms
 */
export default function FormCard({ title, subtitle, children, maxWidth = 450 }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth,
        width: "100%",
        boxShadow: theme.shadows[8],
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        {title && (
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
        )}
        
        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              mb: 4,
              color: theme.palette.text.secondary,
            }}
          >
            {subtitle}
          </Typography>
        )}

        <Box component="form" sx={{ width: "100%" }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}


