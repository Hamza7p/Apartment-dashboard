import { Card, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

// Hook for number animation
const useAnimatedNumber = (targetValue, duration = 2000) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (targetValue === null || targetValue === undefined) {
      // Use setTimeout to avoid synchronous setState
      const timer = setTimeout(() => setCurrentValue(0), 0);
      return () => clearTimeout(timer);
    }

    const startValue = 0;
    const endValue = targetValue;
    const startTime = Date.now();
    let animationFrameId;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const value = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCurrentValue(value);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrentValue(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetValue, duration]);

  return currentValue;
};

const StatCard = ({ title, value, isLoading }) => {
  const animatedValue = useAnimatedNumber(value, 2000);

  return (
    <Card
      sx={{
        padding: '30px',
        display: 'flex',
        minWidth: '350px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 4,
        },
      }}
    >
      {isLoading ? (
        <>
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="text" width="40%" height={60} />
        </>
      ) : (
        <>
          <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h3" component="div" fontWeight="bold" color="primary">
            {animatedValue}
          </Typography>
        </>
      )}
    </Card>
  );
};

export default StatCard;
