import { Box, Typography } from '@mui/material'
import React from 'react'

const AnimatedServerError = ({ message }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 3,
      }}
    >
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 200 200"
        sx={{
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              opacity: 1,
              transform: 'scale(1)',
            },
            '50%': {
              opacity: 0.7,
              transform: 'scale(1.05)',
            },
          },
        }}
      >
        <circle cx="100" cy="100" r="80" fill="#ff6b6b" opacity="0.2" />
        <circle cx="100" cy="100" r="60" fill="#ff6b6b" opacity="0.3" />
        <circle cx="100" cy="100" r="40" fill="#ff6b6b" opacity="0.4" />
        <g transform="translate(100, 100)">
          <path
            d="M -30 -10 L 30 -10 L 30 10 L -30 10 Z"
            fill="#ff6b6b"
            transform="rotate(45)"
          />
          <path
            d="M -30 -10 L 30 -10 L 30 10 L -30 10 Z"
            fill="#ff6b6b"
            transform="rotate(-45)"
          />
        </g>
        <circle cx="100" cy="100" r="15" fill="#fff" />
        <text
          x="100"
          y="110"
          textAnchor="middle"
          fill="#ff6b6b"
          fontSize="40"
          fontWeight="bold"
        >
          !
        </text>
      </Box>

      <Typography variant="h5" color="error">
        {message}
      </Typography>
    </Box>
  )
}

export default AnimatedServerError
