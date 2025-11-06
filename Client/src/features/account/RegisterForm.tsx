import { zodResolver } from "@hookform/resolvers/zod";
import { LockOpen } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";
import { registerSchema, type RegisterSchema } from "../../lib/schemas/registerSchema";
import TextInput from "../../shared/components/TextInput";

export default function RegisterForm() {
  const { registerUser } = useAccount();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser.mutateAsync(data, {
      onError: (error) => {
        if (Array.isArray(error)) {
          error.forEach((err) => {
            if (err.includes("Email")) setError("email", { message: err });
            else if (err.includes("Password")) setError("password", { message: err });
          });
        }
      },
    });
  };
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 3,
        maxWidth: "md",
        mx: "auto",
        borderRadius: "3",
      }}
      autoComplete="off"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
        color="secondary.main"
      >
        <LockOpen fontSize="large" />
        <Typography variant="h4">Register</Typography>
      </Box>
      <TextInput label="Email" control={control} name="email" autoComplete="new-email" />
      <TextInput label="Display name" control={control} name="displayName" />
      <TextInput
        label="Password"
        control={control}
        name="password"
        type="Password"
        autoComplete="new-password"
      />
      <Button type="submit" disabled={!isValid || isSubmitting} variant="contained" size="large">
        Register
      </Button>
      <Typography sx={{ textAlign: "center" }}>
        Already have an account?
        <Typography component={Link} to="/login" color="primary" sx={{ ml: 2 }}>
          Sign in
        </Typography>
      </Typography>
    </Paper>
  );
}
