import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useCreateUser } from "@/hooks/api/useUsers";
import { createUserSchema } from "@/validations/userValidation";
import { RoleName } from "@/enums/RoleName";

const CreateUserDialog = ({ open, onClose }) => {
  const { t } = useTranslation();
  const createUser = useCreateUser({
    onSuccess: () => {
      formik.resetForm();
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
      role: "user",
      first_name: "",
      last_name: "",
      date_of_birth: "",
    },
    validationSchema: createUserSchema,
    onSubmit: (values) => {
      createUser.mutate(values);
    },
  });

  const handleClose = () => {
    if (!createUser.isPending) {
      formik.resetForm();
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{t("users.createUser")}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              fullWidth
              label={t("users.first_name")}
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={
                formik.touched.first_name && formik.errors.first_name
                  ? t(formik.errors.first_name)
                  : ""
              }
              disabled={createUser.isPending}
            />

            <TextField
              fullWidth
              label={t("users.last_name")}
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.last_name && Boolean(formik.errors.last_name)}
              helperText={
                formik.touched.last_name && formik.errors.last_name
                  ? t(formik.errors.last_name)
                  : ""
              }
              disabled={createUser.isPending}
            />

            <TextField
              fullWidth
              label={t("users.phone")}
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={
                formik.touched.phone && formik.errors.phone
                  ? t(formik.errors.phone)
                  : t("users.phoneHint")
              }
              disabled={createUser.isPending}
              inputProps={{ maxLength: 12 }}
            />

            <TextField
              fullWidth
              label={t("users.password")}
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                formik.touched.password && formik.errors.password
                  ? t(formik.errors.password)
                  : t("users.passwordHint")
              }
              disabled={createUser.isPending}
            />

            <FormControl fullWidth>
              <InputLabel>{t("users.role")}</InputLabel>
              <Select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label={t("users.role")}
                disabled={createUser.isPending}
              >
                <MenuItem value={RoleName.user}>{t("users.user")}</MenuItem>
                <MenuItem value={RoleName.admin}>{t("users.admin")}</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label={t("users.date_of_birth")}
              name="date_of_birth"
              type="date"
              value={formik.values.date_of_birth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.date_of_birth &&
                Boolean(formik.errors.date_of_birth)
              }
              helperText={
                formik.touched.date_of_birth && formik.errors.date_of_birth
                  ? t(formik.errors.date_of_birth)
                  : ""
              }
              disabled={createUser.isPending}
              InputLabelProps={{ shrink: true }}
            />

            {createUser.isError && (
              <Alert severity="error">
                {createUser.error?.response?.data?.message ||
                  createUser.error?.message ||
                  t("users.errorCreatingUser")}
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleClose}
            disabled={createUser.isPending}
            color="inherit"
          >
            {t("common.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={createUser.isPending}
          >
            {createUser.isPending ? (
              <>
                <CircularProgress size={16} sx={{ mr: 1 }} />
                {t("common.creating")}
              </>
            ) : (
              t("common.create")
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateUserDialog;

