import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function ResultModal({ open, onClose, title, result }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="div">
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          Total Score: {result}
        </Typography>
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
}

export default ResultModal;
