import React, { useMemo } from 'react'
import {
  CircularProgress,
  Box,
  Typography,
  Stack,
  Grid,
  Card,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { motion } from "framer-motion";

function ProgressChartSection({ progress, totalTasks, completedTasks, taskHistoryData }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Responsive sizes
  const progressSize = isMobile ? 90 : 150;
  const progressFont = isMobile ? 18 : 24;
  const cardPadding = isMobile ? 2 : 4;
  const chartHeight = isMobile ? 180 : 300;
  const statFont = isMobile ? 16 : 22;
  const statLabelFont = isMobile ? 12 : 16;

  // Prepare chart data from props (taskHistoryData)
  const chartData = useMemo(() => {
    // Fallback to empty array if not provided
    const history = Array.isArray(taskHistoryData) ? taskHistoryData : [];
    return {
      assigned: history.map((t) => t.assigned),
      done: history.map((t) => t.done),
      dates: history.map((t) => t.date),
    };
  }, [taskHistoryData]);

  return (
    <Grid
      container
      spacing={isMobile ? 2 : 4}
      mb={isMobile ? 2 : 4}
      alignItems="stretch"
      direction={isMobile ? "column" : "row"}
    >
      {/* Progress */}
      <Grid item xs={12} md={6} width={isMobile ? "100%" : "45%"}>
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            p: cardPadding,
            background: "#fff",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: isMobile ? 2 : 4,
          }}
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            fontWeight={700}
            gutterBottom
            fontSize={isMobile ? 16 : undefined}
          >
            Project Progress
          </Typography>
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={isMobile ? 2 : 6}
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            width="100%"
          >
            <Box position="relative" display="inline-flex">
              <CircularProgress
                variant="determinate"
                value={progress}
                size={progressSize}
                thickness={5}
                sx={{
                  color: "#2563eb",
                  background: "#f1f5f9",
                  borderRadius: "50%",
                }}
              />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={progressSize}
                height={progressSize}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="primary"
                  fontSize={progressFont}
                >
                  {progress}%
                </Typography>
              </Box>
            </Box>
            <Stack
              direction="row"
              paddingTop={isMobile ? 2 : 5}
              paddingRight={isMobile ? 0 : 4}
              spacing={isMobile ? 2 : 4}
              alignItems="center"
              width={isMobile ? "100%" : "auto"}
              justifyContent={isMobile ? "space-around" : "center"}
            >
              <Box textAlign="center" minWidth={isMobile ? 60 : 100}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontSize={statLabelFont}
                >
                  Total <br />Tasks
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  fontSize={statFont}
                >
                  {totalTasks}
                </Typography>
              </Box>
              <Box textAlign="center" minWidth={isMobile ? 60 : 100}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontSize={statLabelFont}
                >
                  Completed Tasks
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  fontSize={statFont}
                >
                  {completedTasks}
                </Typography>
              </Box>
              <Box textAlign="center" minWidth={isMobile ? 60 : 100}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontSize={statLabelFont}
                >
                  Remaining Tasks
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  fontSize={statFont}
                >
                  {totalTasks - completedTasks}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Card>
      </Grid>

      {/* MUI X Chart */}
      <Grid item xs={12} md={6} width={isMobile ? "100%" : "50%"}>
        <Card
          elevation={2}
          sx={{
            borderRadius: 4,
            p: cardPadding,
            background: "#fff",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            fontWeight={600}
            gutterBottom
            fontSize={isMobile ? 16 : undefined}
          >
            Task Progress Over Time
          </Typography>
          <Box height={chartHeight}>
            <LineChart
              height={chartHeight}
              series={[
                {
                  data: chartData.assigned,
                  label: "Assigned Tasks",
                  color: "#2563eb",
                },
                {
                  data: chartData.done,
                  label: "Completed Tasks",
                  color: "#16a34a",
                },
              ]}
              xAxis={[
                { scaleType: "point", data: chartData.dates },
              ]}
              sx={{ mt: 2 }}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ProgressChartSection